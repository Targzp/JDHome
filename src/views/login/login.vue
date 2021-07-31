<template>
    <div class="wrapper">
        <img class="wrapper__img" src="../../assets/user.png">
        <div class="wrapper__input">
            <input class="wrapper__input__content" placeholder="请输入用户名" v-model="username"/>
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password"/>
        </div>
        <div class="wrapper__login-button" @click="handleLogin">登录</div>
        <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
        <Toast v-if="showToast" :message="toastMessage"/>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 登录相关逻辑
const useLoginEffect = (changeToast) => {
  const router = useRouter()

  const data = reactive({ username: '', password: '' })

  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        changeToast('输入不能为空')
        return
      }
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.islogin = true
        router.push({ name: 'Home' })
      } else {
        changeToast('登录失败')
      }
    } catch (error) {
      changeToast('网络连接失败')
    }
  }

  const { username, password } = toRefs(data)

  return {
    username,
    password,
    handleLogin
  }
}

// 处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter()

  const handleRegister = () => {
    router.push({ name: 'register' })
  }

  return {
    handleRegister
  }
}

export default {
  name: 'login',
  components: {
    Toast
  },
  // 职责就是告诉你，代码执行的一个流程
  setup () {
    const { showToast, toastMessage, changeToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(changeToast)
    const { handleRegister } = useRegisterEffect()

    return {
      username,
      password,
      showToast,
      toastMessage,
      handleLogin,
      handleRegister
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
    height: min-content;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    &__img{
        display: block;
        width: .66rem;
        height: .66rem;
        margin: 0 auto .4rem auto;
    }
    &__input{
        height: .48rem;
        margin: 0 .4rem .16rem .4rem;
        background: #F9F9F9;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 6px;
        border-radius: 6px;
        &__content{
            /* 与之前 input 框不同的写法 */
            box-sizing: border-box;
            width: 100%;
            font-size: .16rem;
            line-height: .48rem;
            border: none;
            outline: none;
            background: none;
            padding: 0 .16rem;
            &::placeholder{
                color: $content-notice-fontcolor;
            }
        }
    }
    &__login-button{
        margin: .32rem .4rem 0 .4rem;
        font-size: .16rem;
        line-height: .48rem;
        color: #FFFFFF;
        background: #0091FF;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        border-radius: .04rem;
        text-align: center;
    }
    &__login-link{
        margin-top: .16rem;
        font-size: .14rem;
        color: $content-notice-fontcolor;
        text-align: center;
    }
}
</style>
