<template>
  <view class="my-container">
    <!-- 用户未登录时，显示登录组件 -->
    <MyAccess v-if="!token"></MyAccess>
    <!-- 用户登录后，显示用户信息组件 -->
    <MyUser v-else></MyUser>
  </view>
</template>

<script>
import MyAccess from '../../components/myAccess/myAccess.vue'
import MyUser from '../../components/myUser/myUser.vue'
import badgeMix from '../../mixins/tabbarBadge'
// 1. 从 vuex 中按需导入 mapState 辅助函数
import { mapState } from 'vuex'
export default {
  components: { MyAccess, MyUser },
  data() {
    return {}
  },
  computed: {
     // 2. 从 m_user 模块中导入需要的 token 字符串
     ...mapState('user', ['token']),
  },
  methods: {},
  watch: {},
  mixins: [badgeMix],

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
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
page,
.my-container {
  height: 100%;
}
</style>