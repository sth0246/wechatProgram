//app.js
App({
  onLaunch: function () {
     wx.showShareMenu({
      showShareItems: ['wx', 'qzone', 'wechatFriends', 'wechatMoment']
    })
    wx.cloud.init({
      // env:'sex-wx-1gla3c2p6b26d264'
      //env:'sex-0glappmfb779ea47'
      env :'mail-list-9gl8aqie19d28ecc'
    })
   
  },
  
  globalData: {
    userInfo: null,
    items:[],
    total:[],
    over:[],
    bannerId : null,
    arrWord : null,
    arrText : null
  }
})
