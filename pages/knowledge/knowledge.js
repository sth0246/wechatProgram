const app = getApp()
var last = 0 //储存上一个tab
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],  // 左侧tab,索引每个元素是一个字典，[{name:'词汇',id:1,table:'word'},{...},{}]
    items: [],  // 二维储存
    total: [],  // 每个表对应的总的数据量的个数。
    over: [],  // 储存个大类是否还有数据
    reqing: false, //是否正在发生网络请求
  },

  onLoad() {
    wx.showShareMenu({
      showShareItems: ['wx', 'qzone', 'wechatFriends', 'wechatMoment']
    })
    this.getList();
  },
  onShow() {
    this.setData({
      items: app.globalData.items,
      over: app.globalData.over
    })
  },

  getList() { //获取List 同时写入app.globaldata里  list为选项卡选项
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    const db = wx.cloud.database();
    var that = this;
    db.collection("list").where({
      show:true //选项卡是否展示 数据库手动设置
    }).orderBy('id', 'asc')
      .get()
      .then((res) => {  // 初始化变量
        var items = []
        var over = []
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          items[i] = [];
          over[i] = false;
        }
        that.setData({
          list: res.data,
          listCur: res.data[0],
          items: items,
          over: over
        })
        app.globalData.list = res.data;
        console.log(res.data);

        this.getTotal(); //同时获取第一次数据
        wx.hideLoading()
      });
  },


  getTotal() { //只写入app.globaldata,同时获得第一次数据
    console.log("gettodal")
    const db = wx.cloud.database();
    var num = this.data.list.length
    console.log(num);
    var list = this.data.list
    var total = [];
    var that = this
    for (var i = 0; i < num - 1; i++) {
      (function (i) {
        // 获取total
        db.collection(list[i].table).count().then(res => {
          total[i] = res.total
        })
        app.globalData.total = total
        // 获取第一次数据
        var field = {}
        if (0 == i) {
          field = {
            icon:true,
            cover: true,
            _updateTime:true,
            keyword: true,
            reference: true,
            content: true,
            view:true
          }
        } else {
          field = {
            cover: true,
            title: true,
            text: true,
            category: true
          }
        }
        db.collection(list[i].table).field(field).limit(14-i)
          .get()
          .then((res) => {
            console.log(res)
            var items = that.data.items
            items[i] = items[i].concat(res.data)
            that.setData({
              reqing: false,
              items: items
            })
            wx.hideLoading()
          });
      }(i))
    }
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id) * 50
    })
    var i = this.data.TabCur
    if (!this.data.over[i] && i != this.data.list.length - 1) {
      this.getData()
    }
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    var i = this.data.TabCur
    if (this.data.over[i]) { //如果本大块已经结束
      i = i + 1
    }
    var table = this.data.list[i].table
    var num = this.data.items[i].length
    var lim = 15
    const db = wx.cloud.database();
    var that = this;
    var field = {}
    if (0 == i) {
      field = {
        icon:true,
            cover: true,
            _updateTime:true,
            keyword: true,
            reference: true,
            content: true,
            view:true
      }
    } else {
      field = {
        cover: true,
        title: true,
        text: true,
        category: true
      }
    }
    console.log("num:"+num);
    db.collection(table).field(field).skip(num).limit(lim)
      .get()
      .then((res) => {
        //如果本次请求是最后一次请求
        if (res.data.length < lim) {
          var over = that.data.over
          over[i] = true
          that.setData({
            over: over

          })
        }
        //保存数据
        var items = that.data.items
        console.log(that.data)
        items[i] = items[i].concat(res.data)
        that.setData({
          reqing: false,
          items: items
        })
        wx.hideLoading()
      });
  },



  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    for (let i = 0; i < list.length-1; i++) {
      let view = wx.createSelectorQuery().select("#main-" + list[i].id);
      view.fields({
        size: true
      },
      //  data => {
      //   list[i].top = tabHeight;
      //   tabHeight = tabHeight + data.height;
      //   console.log("tabHeight"+tabHeight)
      //   console.log(data.height)
      //   console.log(data);
      //   list[i].bottom = tabHeight;
      // }
      function(res){
        list[i].top = tabHeight;
        tabHeight = tabHeight+res.height;
        list[i].bottom = tabHeight;
      }
      ).exec();
    }
    that.setData({
      list: list
    })
    let scrollTop = e.detail.scrollTop + 20; //修改过，原来是20
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        var change = that.getchange(i) //i是否发生变化
        if (0 != change && 1 == change && !that.data.over[i - 1] && !that.data.reqing) { //刚刚进入下一个板块，并且上一个板块还有数据
          that.setData({ //标记为正在请求数据
            reqing: true
          })
          that.getData()
        } else {
          that.setData({
            VerticalNavTop: (list[i].id) * 50,
            TabCur: list[i].id
          })
          return false
        }
      }
    }
  },
  getchange(i) { //滑动屏幕是，返回大块的变化量
    var temp = last
    last = i;
    return i - temp
  },
  onHide: function () {
    console.log("tabbar2_onhide")
    // 页面从前台变为后台时执行
    app.globalData.over = this.data.over
    app.globalData.list = this.data.list
    app.globalData.items = this.data.items
    // 不变
    app.globalData.TabCur = this.data.TabCur
  },
})