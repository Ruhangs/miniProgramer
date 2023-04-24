<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <myAddress></myAddress>
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- <uni-swipe-action> -->
    <block v-for="(goods, i) in cart" :key="i">
      <!-- <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)"> -->
      <myGoods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler"
        @num-change="numberChangeHandler"></myGoods>
      <!-- </uni-swipe-action-item> -->
    </block>
    <!-- </uni-swipe-action> -->
    <mySettle></mySettle>
  </view>
  <view class="empty-cart" v-else>
    <image src="/static/cart_border@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import badgeMix from '../../mixins/tabbarBadge'
import MyAddress from '../../components/myAddress/myAddress.vue'

export default {
  components: { MyAddress },
  data() {
    return {
      options: [{
        text: '删除', // 显示的文本内容
        style: {
          backgroundColor: '#C00000' // 按钮的背景颜色
        }
      }]
    }
  },
  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['total'])
  },
  methods: {
    // 点击了滑动操作按钮
    swipeActionClickHandler(goods) {
      this.removeGoodsById(goods.goods_id)
    },
    setBadge() {
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index: 2, // 索引
        text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
      })
    },
    // 商品的勾选状态发生了变化
    radioChangeHandler(e) {
      // console.log(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
      this.updateGoodsState(e)
    },
    numberChangeHandler(e) {
      this.updateGoodsCount(e)
    },
    ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
  },
  watch: {},
  mixins: [badgeMix],

  // 页面周期函数--监听页面加载
  onLoad() { },
  // 页面周期函数--监听页面初次渲染完成
  onReady() { },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.setBadge()
  },
  // 页面周期函数--监听页面隐藏
  onHide() { },
  // 页面周期函数--监听页面卸载
  onUnload() { },
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
} 
</script>

<style lang="scss" scoped>
.cart-container {
  padding-bottom: 50px;
}

.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;

  .cart-title-text {
    margin-left: 10px;
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>