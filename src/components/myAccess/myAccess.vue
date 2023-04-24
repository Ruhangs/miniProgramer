<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script lang="js">
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex'
export default Vue.extend({
  name: "myAccess",
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['redirectInfo'])
  },
  methods: {
    ...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
    // 获取用户的基本信息
    async getUserProfile() {
      const res = await uni.getUserProfile({
        desc: "登录",
      })
      if (res.userInfo) {
        this.updateUserInfo(res.userInfo)
        this.getToken(res)
      } else {
        return uni.$showMsg("您取消了授权")
      }
      // console.log(res)
      // if (res[0]) return uni.$showMsg("您取消了授权")
      // console.log(res[1])

    },
    async getToken(info) {
      // 获取code
      const res = await uni.login({
        provider: 'weixin', //使用微信登录
      })
      if(res.errMsg === 'login:ok') {
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // if (loginResult.message === null) return uni.$showMsg('登录失败！')
        if (loginResult.meta.status == 200) return uni.$showMsg('登录失败！')
        uni.$showMsg('登陆成功！')
        // this.updateToken(loginResult.message.token)
        this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.')
        this.navigateBack()
      }else{
        return uni.$showMsg('登录失败！')
      }
    },
    navigateBack() {
      if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
        uni.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            this.updateRedirectInfo(null)
          }
        })
      }
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() { },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() { },
  // 组件周期函数--监听组件数据更新之后
  updated() { },
  // 组件周期函数--监听组件激活(显示)
  activated() { },
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() { },
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() { },
}) 
</script>

<style lang="scss" scoped>
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>