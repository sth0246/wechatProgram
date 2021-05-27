Page({
    onLoad() {
        wx.showShareMenu({
            showShareItems: ['wx', 'qzone', 'wechatFriends', 'wechatMoment']
        })
    }
});
