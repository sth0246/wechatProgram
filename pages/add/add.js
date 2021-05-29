// pages/add/add.js
var _id = null;
var title = null;
var text = null;
var id = null;
var dbName = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data : null
  },

  getDb:function(e){
    console.log(e.detail.value)
    dbName = e.detail.value;
  },
  clickGet : function(){
    const db = wx.cloud.database();
    db.collection(dbName).get().then(res =>{
      this.setData({
        data : res.data
      })
    })
    
  },
  choosDb : function(e){
    console.log(e)
    
     _id = e.detail.value._id;
     title = e.detail.value.title;
     text = e.detail.value.text;
     id = e.detail.value.id;

  },
  up:function(){
    const db = wx.cloud.database();
    db.collection(dbName).doc(_id).update({
      data:{
        title : title,
        text : text
      }
    }).then(res =>{
      console.log(res)
    })
  },
  add : function(){
    const db = wx.cloud.database();
    db.collection(dbName).add({
      data:{
        title : title,
        text : text,
        id : id
      }
    }).then(res =>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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