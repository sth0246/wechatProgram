//index.js
//获取应用实例
const app = getApp()
var search = null;
var arrWord = new Array;
var arrText = new Array;
var n_word = 0;
var n_text = 0;
Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '/img/swiper/1.png'
    }, {
      id: 1,
      type: 'image',
      url: '/img/swiper/2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '/img/swiper/3.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '/img/swiper/4.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '/img/swiper/5.jpg'
    }, {
      id: 5,
      type: 'image',
      url: '/img/swiper/6.png'
    }],
  },


  toQuestionaire :function(){ // 问卷调查跳转

    wx.navigateTo({
      url:"/pages/questionaire/questionaire"
    })

  },


  bannerTap: function (e) { //导航栏点击 记录所点击swiper—item 的 id 并传入app gloabldata中
    app.globalData.bannerId = e.target.id
    wx.navigateTo({
      url: '../banner/banner',
      fail: function (er) {
        console.log(er)
      }
    })
    console.log(e.target.id)
  },
  input: function (e) {
    console.log(e.detail.value)
    search = e.detail.value

  },
  search: function () {
    if(search.length == 0)
    {
      return
    }
    n_word = 0;
    n_text = 0;
    var dbName = ["adult", "communicate", "kid", "learn", "young", "young2"];
    const db = wx.cloud.database();
    var temp = new RegExp(search, "g")
    db.collection('word0').get()
      .then(res => {
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          if (temp.test(res.data[i].keyword)) {
            console.log(res.data[i])
            arrWord[n_word++] = res.data[i];
          }
        }
        app.globalData.arrWord = arrWord;
      })
    for (let i = 0; i < dbName.length; i++) {
      db.collection(dbName[i]).get()
        .then(res => {
          console.log(res)
          for (let i = 0; i < res.data.length; i++) {
            if (temp.test(res.data[i].text) || temp.test(res.data[i].title) || temp.test(res.data[i].content)) {
              console.log(res.data[i])
              arrText[n_text++] = res.data[i];
            }
          }
          app.globalData.arrText = arrText;
        })
    }
    wx.showLoading({
      title: '正在搜索',
      mask : true,
      success: function () {
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/search/search'
          })
          wx.hideLoading({
          })
        }, 1500);
      }
    })

  },
  onLoad() {
    wx.showShareMenu({
      showShareItems: ['wx', 'qzone', 'wechatFriends', 'wechatMoment']
    })
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    wx.cloud.callFunction({
        name: 'dbCompatible',
        data: {
          temp: "adult",
          word: "cover"
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },

  ///////////////////////////////////////////////////选项卡
  clickedAddItem(e) { //已完成
    this.setData({
      clickedAddItem: e.currentTarget.id //点击具体的grid添加
    })
    switch (e.currentTarget.id) {
      case '1':
        wx.navigateTo({
          url: "/pages/timeline/timeline"
        })
        break;
      case '2':
        wx.navigateTo({
          url: "/pages/hand_book/hand_book"
        })
        break;
      case '3':
        wx.navigateTo({
          url: "/pages/learn/learn"
        })
        break;
      case '4':
        wx.navigateTo({
          url: "/pages/one/one"
        })
        break;
    }
  }
})