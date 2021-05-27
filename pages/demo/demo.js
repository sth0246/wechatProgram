// pages/demo/demo.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tap : function(e){
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("kid").get().then(
      res=>{
        console.log(res.data)
      }
    )
    var str2 = "cloud://sex-wx-1gla3c2p6b26d264.7365-sex-wx-1gla3c2p6b26d264"
    var str = "cloud://sex-0glappmfb779ea47.7365-sex-0glappmfb779ea47-1257796010/cloudbase-cms/upload/2021-02-24/e0b0zsg2x6ofhkru9lhiqtzq6p8trvyb_.jpg"
    console.log(str.substr(0,3))
    console.log(str2.length)
    console.log(str.substring(54))
    str = str2 + str.substring(54)
    console.log(str)
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