<template>
    <div class="wrapper">
        <img class="wrapper__img" src="../../assets/user.png">
        <div class="wrapper__input">
            <input class="wrapper__input__content" placeholder="请输入用户名" v-model="username">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="请输入密码" v-model="password">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="确认密码" v-model="ensurement">
        </div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
        <Toast v-if="showToast" :message="toastMessage"/>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 注册相关逻辑
const useRegisterEffect = (changeToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })
  const handleRegister = async () => {
    try {
      const { username, password, ensurement } = data
      if (username === '' || password === '' || ensurement === '') {
        changeToast('输入不能为空')
        return
      }
      if (data.password !== data.ensurement) {
        changeToast('确认密码不一致')
        return
      }
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        changeToast('注册失败')
      }
    } catch (e) {
      changeToast('网络连接失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return {
    username,
    password,
    ensurement,
    handleRegister
  }
}

// 处理登录跳转
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return {
    handleLoginClick
  }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup () {
    const { showToast, toastMessage, changeToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(changeToast)
    const { handleLoginClick } = useLoginEffect()

    return {
      username,
      password,
      ensurement,
      handleRegister,
      showToast,
      toastMessage,
      handleLoginClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
    .wrapper{
        width: 100%;
        height: min-content;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
            border: .01rem solid rgba(0,0,0,0.10);
            border-radius: .06rem;
            &__content{
                box-sizing: border-box;
                width: 100%;
                font-size: .16rem;
                line-height: .48rem;
                padding: 0 .16rem 0 .16rem;
                border: none;
                outline: none;
                background: none;
                &::placeholder{
                    color: $content-notice-fontcolor;
                }
            }
        }
        &__register-button{
            font-size: .16rem;
            line-height: .48rem;
            margin: .32rem .4rem .16rem .4rem;
            text-align: center;
            color: $bgColor;
            background: $buttonColor;
            box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
            border-radius: .04rem;
        }
        &__register-link{
            text-align: center;
            font-size: .14rem;
            color: $content-notice-fontcolor;
        }
    }
</style>
