const db = wx.cloud.database()
const app = getApp()
// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data : [] ,
    index1 : 0,
    obj : {}
  },
  new : function(){
    console.log(this.data)
    console.log(this.data.index1)
    console.log(this.data.obj)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("demo").get().then(res=>
      {
        this.setData({
         data : res.data ,
         index1 :app.globalData.index,
        })
      })
      console.log(this.data.index1)
      console.log(this.data.obj.name)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  this.setData({
    obj : this.data.data[this.data.index1]
  })
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