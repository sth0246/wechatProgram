Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr: [{ title: "测试标题1", text: "测试内容1" },
            { title: "测试标题2", text: "测试内容2" },
            { title: "测试标题3", text: "测试内容3" },
            { title: "测试标题4", text: "测试内容4" },
            { title: "测试标题5", text: "测试内容5" },
            { title: "测试标题6", text: "测试内容6" },
            { title: "测试标题7", text: "测试内容7" },
            { title: "测试标题8", text: "测试内容8" },
            { title: "测试标题9", text: "测试内容9" }
        ],
        current: null,
        style0: "buttonx",
        style1: "button"
    },

    tapLeft: function(e) {
        console.log(e.currentTarget.id)
        this.setData({
            current: e.currentTarget.id
        })
        if (e.currentTarget.id == 0) {
            this.setData({
                style0: "buttonx",
                style1: "button"
            })
        } else {
            this.setData({
                style0: "button",
                style1: "buttonx"
            })
        }
    },


    change: function(e) {
        console.log(e)
        this.setData({
            current: e.detail.current
        })
        console.log(this.data.current)
        if (e.detail.current == 0) {
            this.setData({
                style0: "buttonx",
                style1: "button"
            })
        } else {
            this.setData({
                style0: "button",
                style1: "buttonx"
            })
        }
    },

    questionaire1: function() { //性态度的调查问卷的跳转

        wx.navigateTo({
            url: "/pages/questionaire1/questionaire1"
        })
    },

    questionaire2: function() {

        wx: wx.navigateTo({
            url: "/pages/questionaire2/questionaire2"
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(111)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
});