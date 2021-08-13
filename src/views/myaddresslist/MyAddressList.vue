<template>
    <div class="wrapper">
        <div class="header">
            <span
            class="header__back iconfont"
            @click="handleBackClick">&#xe606;</span>
            <span class="header__info">管理收货地址</span>
            <span
            class="header__new"
            @click="() => handleUpsertAddress()">新建</span>
        </div>
        <div class="addresslist">
            <div class="addresslist__desc">我的收货地址</div>
            <div
            class="addresslist__item"
            @click="() => handleUpsertAddress(item._id)"
            v-for="(item, index) in addressList" :key="index">
                <div class="addresslist__item__user">
                    <span class="addresslist__item__name">{{item.name}}</span>
                    <span class="addresslist__item__phone">{{item.phone}}</span>
                </div>
                <div class="addresslist__item__location">
                    {{item.city}}{{item.department}}{{item.houseNumber}}
                </div>
                <div class="addresslist__item__enter iconfont">&#xe653;</div>
            </div>
        </div>
    </div>
</template>

<script>
import { toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'
import { useBackRouterEffect } from '../../effects/backEffects'

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

// 跳转到更新和新建地址的相关逻辑
const useManageAddressEffect = () => {
  const router = useRouter()
  const handleUpsertAddress = (addressId) => {
    if (addressId) {
      router.push(`/upsertAddress/${addressId}`)
    } else {
      router.push('/upsertAddress')
    }
  }

  return {
    handleUpsertAddress
  }
}

export default {
  name: 'MyAddressList',
  setup () {
    const { addressList } = useAddressListEffect()
    const { handleBackClick } = useBackRouterEffect()
    const { handleUpsertAddress } = useManageAddressEffect()

    return {
      addressList,
      handleBackClick,
      handleUpsertAddress
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

.addresslist {
    margin: .16rem .18rem 0 .18rem;
    &__desc {
        font-size: .14rem;
        line-height: .2rem;
        color: $content-font-color;
    }
    &__item {
        position: relative;
        padding: .18rem .16rem;
        margin-top: .12rem;
        background: $bgColor;
        border-radius: .04rem;
        &__user {
            font-size: .14rem;
            line-height: .2rem;
            margin-bottom: .08rem;
            color: $light-font-color;
        }
        &__name {
            margin-right: .66rem;
        }
        &__location {
            font-size: .14rem;
            line-height: .2rem;
            color: $content-font-color;
            margin-right: .63rem;
        }
        &__enter {
            position: absolute;
            right: .16rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: .16rem;
            color: $light-font-color;
        }
    }
}
</style>
