<template>
    <div class="wrapper">
        <img class="wrapper__img" src="../../assets/user.png">
        <div class="wrapper__input">
            <input class="wrapper__input__content" placeholder="请输入手机号">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="请输入密码">
        </div>
        <div class="wrapper__input">
            <input type="password" class="wrapper__input__content" placeholder="确认密码">
        </div>
        <div class="wrapper__register-button">注册</div>
        <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'register',
  setup () {
    const router = useRouter()
    const handleLoginClick = () => {
      router.push({ name: 'login' })
    }
    return {
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
            border: 1px solid rgba(0,0,0,0.10);
            border-radius: 6px;
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
            color: #FFFFFF;
            background: #0091FF;
            box-shadow: 0 4px 8px 0 rgba(0,145,255,0.32);
            border-radius: 4px;
        }
        &__register-link{
            text-align: center;
            font-size: .14rem;
            color: $content-notice-fontcolor;
        }
    }
</style>
