//index.js
//获取应用实例
const app = getApp()


Page({
    data: {
        over: false, //词汇，是否请求完毕？
        index: 1, //当前第几页
        total: 0, //词汇页，有多少个 //next到头后，跳转到acticle2
        items: [] //这里是一维，一部分来自上tabbar2，部分缺失，具有全部字段。
    },
    onLoad(opt) {
        this.setData({
            index: opt.index - 0, //index为第几页
            items: app.globalData.items[0],
            total: app.globalData.total[0]
        })
        this.flashData()
        wx.showShareMenu({
            showShareItems: ['wx', 'qzone', 'wechatFriends', 'wechatMoment']
        })
    },
    getData() {
        wx.showLoading({
            title: '加载中',
        })
        var lim = 10;
        const db = wx.cloud.database();
        var that = this;
        var num = that.data.items.length
        db.collection("word").skip(num).limit(lim)
            .get()
            .then((res) => {
                if (res.data.length < lim) {
                    that.setData({
                        over: true
                    })
                }
                // console.log(res.data)
                that.setData({
                    items: that.data.items.concat(res.data)
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
            console.log(this.data.index, this.data.items.length - 3)
            if (this.data.items.length - this.data.index < 3) {  // 当前数据剩余2个的时候去请求新的数据
                this.getData();
            }
            this.setData({
                index: this.data.index + 1
            });
        } else if (type === 'prev') {
            this.setData({
                index: this.data.index - 1
            });
        }
        this.flashData()
        this.goTop()
    },
    onUnload() {
        console.log("acticle_onunload")
        app.globalData.items[0] = this.data.items
        app.globalData.over[0] = this.data.over
    },
    flashData() { //每次都会执行，但是效果不影响
        var item = this.data.items[this.data.index]
        item.content = item.content.split('<img ').join('<img style="max-width:100%;height:auto;display:block;margin:10px auto;"')
        item.updateTime = new Date(item._updateTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item._updateTime).toTimeString().substr(0, 8);
        this.setData({
            item: item
        })

        var id = item._id
        console.log(id);
        console.log(app.globalData.list[0].table)
        wx.cloud
            .callFunction({
                // 云函数名称
                name: 'plusView',
                // 传给云函数的参数
                data: {
                    table: app.globalData.list[0].table, //传入数据库的表名
                    _id: id
                }
            })
            .then((res) => {
                console.log(res); // 3
            })
            .catch(console.error);
    }

});