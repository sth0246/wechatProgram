<view class="page-body">
    <view class="page-section">
        <view class="title">{{item.title}}</view>
        <view>
            <view class="cu-tag bg-red light sm round" wx:if="{{item.category[0]}}">{{item.category[0]}}</view>
            <view class="cu-tag bg-green light sm round" wx:if="{{item.category[1]}}">{{item.category[1]}}</view>
        </view>
        <view wx:if="{{item.reference}}" class="reference">参考来源：{{item.reference}}</view>
        <view class="updateTime">更新日期:{{item.updateTime}}</view>
        <view class="rich-text-wrp">
            <rich-text nodes="{{item.content}}"></rich-text>
        </view>
        <view class="view">阅读 {{item.view}}</view>
    </view>
</view>
