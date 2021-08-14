<template>
    <div class="header">
            <div class="iconfont header__back" @click="handleBackClick">&#xe606;</div>
            确认订单
        </div>
        <div class="top">
            <div
            class="top__receiver"
            @click="handleChooseAddress">
                <div class="top__receiver__title">收货地址</div>
                <div class="top__receiver__address">
                    {{address?.city}}{{address?.department}}{{address?.houseNumber}}
                </div>
                <div class="top__receiver__info">
                    <span class="top__receiver__info__name">{{address?.name}}</span>
                    <span class="top__receiver__info__tel">{{address?.phone}}</span>
                </div>
                <div class="iconfont top__receiver__enter">&#xe653;</div>
            </div>
        </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useBackRouterEffect } from '../../effects/backEffects'
import { useAddressListEffect } from '../../components/Address.vue'

// 跳转选择地址页面相关逻辑
const useChooseAddressEffect = (shopId) => {
  const router = useRouter()
  const handleChooseAddress = () => {
    router.push(`/chooseAddress/${shopId}`)
  }
  return {
    handleChooseAddress
  }
}

export default {
  name: 'TopArea',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const addressId = route.params.a_id
    const { handleBackClick } = useBackRouterEffect()
    const { address } = useAddressListEffect(addressId)
    const { handleChooseAddress } = useChooseAddressEffect(shopId)
    return {
      address,
      handleBackClick,
      handleChooseAddress
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: $buttonColor;
    padding: .15rem 0 .15rem 0;
    font-size: .16rem;
    line-height: .24rem;
    color: $bgColor;
    text-align: center;
    &__back {
        position: absolute;
        left: .18rem;
        font-size: .22rem;
    }
}

.top {
    height: 1.96rem;
    position: relative;
    background-repeat: no-repeat;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, $buttonColor 50%);
    &__receiver{
        height: 1.22rem;
        position: absolute;
        left: .18rem;
        right: .18rem;
        bottom: 0;
        background: $bgColor;
        border-radius: .04rem;
        &__title{
            font-size: .16rem;
            line-height: .22rem;
            font-weight: bold;
            margin: .16rem 0 .18rem .16rem;
        }
        &__address{
            font-size: .15rem;
            line-height: .2rem;
            margin: 0 1.04rem .12rem .16rem;
            @include ellipsis;
        }
        &__info{
            color: $medium-font-color;
            margin: 0 0 .16rem .16rem;
            &__name{
                margin-right: .06rem;
            }
        }
        &__enter{
            position: absolute;
            top: 50%;
            right: .16rem;
            transform: translateY(-50%);
            font-size: .20rem;
            color: $medium-font-color;
        }
    }
}
</style>
