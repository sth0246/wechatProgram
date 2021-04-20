// pages/add/add.js
const db = wx.cloud.database();
var up = false;
var tempFilePaths = null;
var url = "cloud://mail-list-9gl8aqie19d28ecc.6d61-mail-list-9gl8aqie19d28ecc-1305628714/head.png";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src : "cloud://mail-list-9gl8aqie19d28ecc.6d61-mail-list-9gl8aqie19d28ecc-1305628714/head.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  upImage : function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res){
        console.log(res);
        tempFilePaths = res.tempFilePaths; 
        up = true;
        that.setData({
          src : res.tempFilePaths
        })
      }
    })
  },
  addData : function(res){
    console.log(tempFilePaths[0])
    console.log(up)
    if(up){
      wx.cloud.uploadFile({
        cloudPath : "photo/"+Date.now()+".jpg",
        filePath : tempFilePaths[0],
        success(res){
          console.log(res)
          url = res.fileID
        },
        fail(res){
          console.log(res)
        }
      })
      
      console.log("上传成功了")
    }
    console.log(res)
    var {name,addres,tel} = res.detail.value;
    db.collection("demo").add({
      data:{
        name : name,
        addres : addres,
        tel : tel,
        headImage : url
      }
    })
    .then(res=>{
      console.log(res)
      wx.hideLoading()
      
      console.log(res)
      
      wx.navigateBack();
      wx.showToast({
        title: '添加成功'
      })
      setTimeout(function(){wx.hideToast();},4000)
    })
    up = false;
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