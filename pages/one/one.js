//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        has:true,
        ones: [],
        current:1,
        total:0
    },
    onLoad() {
        wx.showShareMenu({
      showShareItems: ['wx', 'qzone', 'wechatFriends', 'wechatMoment']
    })
        this.getData();
        this.getTotal();
    },
    handleChange({ detail }) {
        const type = detail.type;
        if (type === 'next') {
            console.log(this.data.current,this.data.ones.length-3)
            if(this.data.current>this.data.ones.length-2){  // 当前数据剩余2个的时候去请求新的数据
                this.getData();
            }
            this.setData({
                current: this.data.current + 1
            });
        } else if (type === 'prev') {
            this.setData({
                current: this.data.current - 1
            });
        }
    },

    getData() {
        
        wx.showLoading({
        title: '加载中',
      })
        var lim = 15;
        const db = wx.cloud.database();
        var that = this;
        var num = that.data.ones.length
        db.collection("one").skip(num).limit(lim)
            .get()
            .then((res) => {
                if (res.data.length < lim) {
                    that.setData({
                        has: false
                    })
                }
                console.log(res.data)
                that.setData({
                    ones: that.data.ones.concat(res.data)
                })
                wx.hideLoading()
            });
    },
    getTotal(){
        const db = wx.cloud.database();
        var that = this;
        db.collection("one").count().then(res=>{
            //console.log(res)
            that.setData({
                total:res.total
            })
        })
    }

});