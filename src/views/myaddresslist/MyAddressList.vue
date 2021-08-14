<template>
    <div class="wrapper">
        <div class="header">
            <span
            class="header__back iconfont"
            @click="handleBackClick">&#xe606;</span>
            <span class="header__info">管理收货地址</span>
            <span
            class="header__new"
            @click="handleNewAddress">新建</span>
        </div>
        <Address />
    </div>
</template>

<script>
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useBackRouterEffect } from '../../effects/backEffects'
import Address from '../../components/Address.vue'

// 获取地址列表相关逻辑
const useAddressListEffect = () => {
  const store = useStore()
  const { addressList } = toRefs(store.state)
  const getAddressList = async () => {
    const result = await get('/api/user/address')
    if (result?.errno === 0 && result?.data?.length) {
      store.commit('changeAddressList', result)
    }
  }

  getAddressList()

  return {
    addressList
  }
}

// 跳转新增地址页面相关逻辑
const useNewAddressEffect = () => {
  const router = useRouter()
  const handleNewAddress = () => {
    router.push('/upsertAddress')
  }
  return {
    handleNewAddress
  }
}

export default {
  name: 'MyAddressList',
  components: {
    Address
  },
  setup () {
    const { addressList } = useAddressListEffect()
    const { handleBackClick } = useBackRouterEffect()
    const { handleNewAddress } = useNewAddressEffect()

    return {
      addressList,
      handleBackClick,
      handleNewAddress
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgb(248,248,248);
}

.header {
    display: flex;
    line-height: .44rem;
    background: $bgColor;
    padding: 0 .18rem;
    &__back {
        font-size: .16rem;
        color: #B6B6B6;
    }
    &__info {
        font-size: .16rem;
        color: $content-font-color;
        flex: 1;
        text-align: center;
    }
    &__new {
        font-size: .14rem;
        color: $content-font-color;
    }
}
</style>
