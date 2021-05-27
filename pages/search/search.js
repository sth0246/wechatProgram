// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrWord:null,
    arrText:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      arrWord : app.globalData.arrWord,
      arrText : app.globalData.arrText
    })
  },
  toacticle : function(e){
    console.log(e.currentTarget.id)
    app.globalData.searchIndex = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/acticles/acticles',
    })
  },
  toacticle2 : function(e){
    app.globalData.searchIndex = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/acticle2s/acticle2s',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})