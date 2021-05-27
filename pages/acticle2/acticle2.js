//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        index: 1, // 第几列
        tab_index: 0, // 第几行
        items: [],  // 仅保存一个大块的
        nextP: 0,
        prevP: 0,
        total: 0,  // 这一个大块的total
        table: '',
        over: false
    },
    onLoad(opt) {
        wx.showShareMenu({
            showShareItems: ['wx', 'qzone', 'wechatFriends', 'wechatMoment']
        })
        console.log(opt)
        this.setData({
            table: app.globalData.list[opt.tab_index].table,
            index: opt.index - 0,  // index为第几页
            tab_index: opt.tab_index,
            items: app.globalData.items[opt.tab_index],
            total: app.globalData.total[opt.tab_index]
        })
        wx.setNavigationBarTitle({ // 动态设置navbartext
            title: app.globalData.list[opt.tab_index].name
        })
        this.getDataFirst();
    },
    getDataFirst() { //首次进入使获取数据，前几，后几
        wx.showLoading({
            title: '加载中',
        })
        var lim = 7; //总请求数
        const db = wx.cloud.database();
        var that = this;
        var skip = Math.max(this.data.index - 2, 0) //包括前面2个（未看）
        db.collection(that.data.table).skip(skip).limit(lim)
            .get()
            .then((res) => {
                var len = res.data.length
                if (len < lim) {
                    that.setData({
                        over: true
                    })
                }
                var items = that.data.items.slice(0, skip).concat(res.data).concat(that.data.items.slice(skip + len))
                that.setData({
                    nextP: skip + len, //下一个未加载的位置
                    prevP: skip, //第一个已加载的位置
                    items: items
                })
                wx.hideLoading()
                that.flashData()
            });
    },
    getDataNext() {
        wx.showLoading({
            title: '加载中',
        })
        var lim = 7; //总请求数
        const db = wx.cloud.database();
        var that = this;
        var nextP = this.data.nextP;
        db.collection(that.data.table).skip(that.data.nextP).limit(lim)
            .get()
            .then((res) => {
                len = res.data.length
                if (len < lim) {
                    that.setData({
                        over: true
                    })
                }
                items = that.data.items.slice(0, nextP).concat(res.data).concat(that.data.items.slice(nextP + len))
                that.setData({
                    items: items,
                    nextP: nextP + len
                })
                wx.hideLoading()
            });
    },
    getDataPrev() {
        wx.showLoading({
            title: '加载中',
        })
        var lim = 7; //总请求数
        const db = wx.cloud.database();
        var that = this;
        var prevP = this.data.prevP;
        var skip = Math.max(prevP - lim, 0)
        db.collection(that.data.table).skip(skip).limit(lim)
            .get()
            .then((res) => {
                len = res.data.length
                if (len < lim) {
                    that.setData({
                        over: true
                    })
                }
                items = that.data.items.slice(0, skip).concat(res.data).concat(that.data.items.slice(skip + len)) //有可能前面未处理的数据少于lim,
                that.setData({
                    items: items,
                    prevP: prevP - len
                })
                wx.hideLoading()
            });
    },
    goTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        })
    },
    handleChange({ detail }) {
        const type = detail.type;
        if (type === 'next') {
            if (this.data.nextP - this.data.index < 3) {  // 当前数据剩余1个的时候去请求新的数据
                this.getDataNext();
                console.log("getnextdata")
            }
            this.setData({
                index: this.data.index + 1
            });
        } else if (type === 'prev') {
            if (this.data.index - this.data.prevP < 3) {  // 当前数据剩余1个的时候去请求新的数据
                this.getDataPrev();
                console.log("getprevdata")
            }
            this.setData({
                index: this.data.index - 1
            });
        }
        this.flashData()
        this.goTop()
    },
    onUnload() {
        console.log("acticle_onunload")
        var tab_index = this.data.tab_index
        app.globalData.items[tab_index] = this.data.items
        app.globalData.over[tab_index] = this.data.over
    },
    flashData() { //每次都会执行，但是效果不影响
        var item = this.data.items[this.data.index]
        item.content = item.content.split('<img ').join('<img style="max-width:100%;height:auto;display:block;margin:10px auto;"')
        item.updateTime = new Date(item._updateTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item._updateTime).toTimeString().substr(0, 8);
        this.setData({
            item: item
        })

        var table = this.data.table
        var id = item._id
        console.log(table, id)
        wx.cloud
            .callFunction({
                // 云函数名称
                name: "plusView",
                // 传给云函数的参数
                data: {
                    table: table,
                    _id: id
                }
            })
            .then((res) => {
                console.log(res); // 3
            })
            .catch(console.error);
    }
});