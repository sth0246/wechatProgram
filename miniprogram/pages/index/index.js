
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data : [] ,
    index1 : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //获取详细界面
  getDetails : function(res){
    app.globalData.index = res.target.id
    console.log(res)
    console.log(res.target.id)
    this.setData({
      index1 : res.target.id
    })
    console.log(app.globalData.index)
  },

  //获取数据库数据
  getData : function (){
    db.collection("demo").get().then(res=>
      {
        this.setData({
         data : res.data 
        })
        console.log(res.data[0]._id)
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