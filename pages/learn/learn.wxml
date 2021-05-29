<block>
  <view class="content-body">
    <view class="title">了解常见性知识</view>
    <view style="padding:0 30rpx;">

      <view style="border-top:1rpx solid #ddd;line-height:80rpx; padding:10rpx ;font-size:30rpx;" bindtap="showItem" id="0" wx:for="{{learn}}" wx:key="{{item._id}}" id="{{item._id}}">
        {{item.q}}
        <text style="float:right;font-size:34rpx;" class="cuIcon-{{showItem=='0'?'fold':'unfold'}}"></text>
        <view style="border-top:1rpx solid #ddd;line-height:50rpx;padding:10rpx 0;color:#999;" qq:if="{{showItem==item._id}}"
          >{{item.a}}
        </view>
      </view>

    </view>
  </view>
</block>
