const app = getApp();
Page({

  data: {
    likeCount: 0,
    rewardsCount: 0,
    viewTotal: 0,
  },
  addText : function(){
    wx.navigateTo({
      url: '../sec/sec',
    })
  },
  onShow() {
    wx.showShareMenu({
      showShareItems: ['wx', 'qzone', 'wechatFriends', 'wechatMoment']
    })
    //console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            likeCount: i,
            rewardsCount: i,
            viewTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        var a1 = Date.parse(new Date("2021/02/21 15:41:06" ));
        var a2 = Date.parse(new Date());
        var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
        that.setData({
          viewTotal: that.coutNum(day * 199 + 2),
          likeCount: that.coutNum(day * 13 + 2),
          rewardsCount: that.coutNum(day * 7 + 1)
        })
      }
    }
    wx.hideLoading()
  },
  coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  // 弹出感谢
  showThanks() {
    this.setData({
      showThanks: !this.data.showThanks,
    })
  },
  // 弹出参考
  showReferences() {
    this.setData({
      showReferences: !this.data.showReferences,
    })
  },
  // 保存到桌面
  saveAppToDesktop() {
    wx.saveAppToDesktop()
  },
  // 长期订阅
  subMsg() {
    var that = this
    wx.subscribeAppMsg({
      subscribe: true,
      success(res) {
        if (!that.dat.hasSub) { //如果第一次订阅订阅
          that.addUser()
          that.setData({
            hasSub: true
          })
        }
        wx.showToast({
          title: '已定阅',
          icon: 'success',
          duration: 1000
        })
      },
      fail(res) {

        wx.showToast({
          title: '请点击右上角•••进入设置，手动开启',
          icon: 'none',
          duration: 1000
        })
      }
    });
  },
  addUser() { //记录openid，有重复
    const db = wx.cloud.database();
    db.collection('myuser').add({
      data: {
      }
    })
      .then((res) => {
        console.log(res)
      })
  }
});
