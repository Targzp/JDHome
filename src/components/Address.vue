<template>
    <div class="addresslist">
        <div class="addresslist__desc">我的收货地址</div>
        <div
        class="addresslist__item"
        v-for="(item, index) in addressList" :key="index"
        @click="() => handleUpsertAddress(item._id,shopId)">
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
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { get } from '../utils/request'

// 获取地址列表相关逻辑
export const useAddressListEffect = (addressId) => {
  const store = useStore()
  const { addressList } = toRefs(store.state)
  const getAddressList = async () => {
    const result = await get('/api/user/address')
    if (result?.errno === 0 && result?.data?.length) {
      store.commit('changeAddressList', result)
    }
  }

  const address = computed(() => {
    return addressList.value.find((item) => item._id === addressId) || addressList.value[0]
  })

  getAddressList()

  return {
    address,
    addressList
  }
}

// 跳转到更新地址的相关逻辑
const useManageAddressEffect = () => {
  const router = useRouter()
  const handleUpsertAddress = (addressId, shopId) => {
    if (shopId) {
      router.push(`/orderconfirmation/${shopId}/${addressId}`)
    } else {
      router.push(`/upsertAddress/${addressId}`)
    }
  }

  return {
    handleUpsertAddress
  }
}

export default {
  name: 'Address',
  props: ['shopId'],
  setup () {
    const { addressList } = useAddressListEffect()
    const { handleUpsertAddress } = useManageAddressEffect()

    return {
      addressList,
      handleUpsertAddress
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/virables.scss';
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
