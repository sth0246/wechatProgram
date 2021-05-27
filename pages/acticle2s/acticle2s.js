// pages/acticle2s/acticle2s.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var index = app.globalData.searchIndex
    this.setData({
      item : app.globalData.arrText[index]

    })



    var item = this.data.item
    item.content = item.content.split('<img ').join('<img style="max-width:100%;height:auto;display:block;margin:10px auto;"')
    item.updateTime = new Date(item._updateTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item._updateTime).toTimeString().substr(0, 8);
    this.setData({
        item: item
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