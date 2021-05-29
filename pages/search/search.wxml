<scroll-view scroll-x="true" wx:if="{{arrWord.length != 0}}">
  <view class="box" wx:for="{{arrWord}}" wx:key="*this" id="{{index}}" bindtap="toacticle">
    <image src="{{item.icon}}" class="img1"></image>
    <view class="text1">{{item.keyword}}</view>
  </view>
</scroll-view>
<view class="cu-card article no-card">
  <view class="cu-item shadow mycard" wx:for="{{arrText}}" wx:key="{{item._id}}" bindtap="toacticle2" id="{{index}}">
    <view class="title">
      <view class="text-cut">{{item.title}}</view>
    </view>
    <view class="content">
      <image src="{{item.cover}}" mode="aspectFill"></image>
      <view class="desc">
        <view class="text-content"> {{item.text}}</view>
        <view>
          <view class="cu-tag bg-red light sm round" wx:if="{{item.category[0]}}">{{item.category[0]}}</view>
          <view class="cu-tag bg-green light sm round" wx:if="{{item.category[1]}}">{{item.category[1]}}</view>
        </view>
      </view>
    </view>
  </view>
</view>