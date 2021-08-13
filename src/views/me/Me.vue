<template>
  <div class="wrapper">
    <div class="header">
      <div class="header__user">
        <div class="header__user__info">
          <div class="header__user__name">{{username}}</div>
          <div class="header__user__id">ID:{{userId}}</div>
        </div>
        <img class="header__user__img" src="http://www.dell-lee.com/imgs/avatar.jpg">
      </div>
    </div>
    <div class="options">
      <div
      class="options__location"
      @click="handleMyLocation">
        <div class="options__location__icon iconfont">&#xe8d4;</div>
        <span class="options__location__desc">我的地址</span>
        <div class="options__location__enter iconfont">&#xe653;</div>
      </div>
    </div>
    <div
      class="exit"
      @click="handleLoginOut">
      退出登录
    </div>
    <Toast v-if="showToast" :message="toastMessage"/>
  </div>
  <Docker :currentIndex="3"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 获取用户信息的相关逻辑
const useUserInfoEffect = (changeToast) => {
  const userData = reactive({ username: '用户名', userId: '用户id' })
  const getUserData = async () => {
    try {
      const result = await get('/api/user/info')
      if (result?.errno === 0) {
        const { _id, username } = result.data
        userData.username = username
        userData.userId = _id
      }
    } catch (e) {
      changeToast('请检查网络连接')
    }
  }

  getUserData()

  const { username, userId } = toRefs(userData)

  return {
    username,
    userId
  }
}

// 退出登录相关逻辑
const useLoginOutEffect = () => {
  const router = useRouter()
  const handleLoginOut = () => {
    localStorage.removeItem('islogin')
    router.replace({ name: 'Login' }) //  替换掉当前的 history 记录
  }

  return {
    handleLoginOut
  }
}

// 跳转管理地址页面相关逻辑
const useMyLocationEffect = () => {
  const router = useRouter()
  const handleMyLocation = () => {
    router.push({ name: 'MyAddressList' })
  }

  return {
    handleMyLocation
  }
}

export default {
  name: 'Me',
  components: {
    Docker,
    Toast
  },
  setup () {
    const { showToast, toastMessage, changeToast } = useToastEffect()
    const { username, userId } = useUserInfoEffect(changeToast)
    const { handleLoginOut } = useLoginOutEffect()
    const { handleMyLocation } = useMyLocationEffect()
    return {
      username,
      userId,
      showToast,
      toastMessage,
      handleLoginOut,
      handleMyLocation
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/virables.scss";
.wrapper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .49rem;
  background: rgb(248,248,248);
}
.header {
  width: 100%;
  height: 2.33rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
  border-radius: 0 0 30% 30%;
  &__user{
    position: absolute;
    left: .18rem;
    right: .18rem;
    height: 1.26rem;
    background: $bgColor;
    border-radius: .08rem;
    margin-top: 1.1rem;
    &__info{
      padding-top: .59rem;
      text-align: center;
    }
    &__name{
      font-size: .24rem;
      line-height: .36rem;
    }
    &__id{
      font-size: .14rem;
      line-height: .2rem;
      color: #C1C0C9;
    }
    &__img{
      width: .94rem;
      height: .94rem;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 50%;
    }
  }
}

.options{
  margin: .16rem .18rem 0 .18rem;
  padding: .16rem;
  background: $bgColor;
  border-radius: .08rem;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  &__location{
    display: flex;
    &__icon{
      width: .22rem;
      font-size: .12rem;
      line-height: .22rem;
      text-align: center;
      background: #32C5FF;
      color: $bgColor;
      border-radius: .08rem;
    }
    &__desc{
      flex: 1;
      font-size: .14rem;
      line-height: .22rem;
      color: #262626;
      margin-left: .12rem;
    }
    &__enter{
      font-size: .12rem;
      line-height: .22rem;
      color: #C2C4CA;
    }
  }
}

.exit{
  margin: .16rem .18rem 0 .18rem;
  line-height: .32rem;
  background: $buttonColor;
  border-radius: .04rem;
  color: $bgColor;
  text-align: center;
}
</style>
