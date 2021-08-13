<template>
    <div class="wrapper">
        <div class="header">
            <span
            class="header__back iconfont"
            @click="handleBackClick">&#xe606;</span>
            <span class="header__info">{{addressId?'编辑':'新建'}}收货地址</span>
            <span
            class="header__new"
            @click="handleSendAddressInfo()">保存</span>
        </div>
        <div class="addressinfo">
            <div class="addressinfo__item">
                <span class="addressinfo__item__desc">所在城市:</span>
                <input class="addressinfo__item__input" placeholder="如北京市" v-model="city"/>
            </div>
            <div class="addressinfo__item">
                <span class="addressinfo__item__desc">小区/大厦/学校:</span>
                <input class="addressinfo__item__input" placeholder="如xx小区" v-model="department"/>
            </div>
            <div class="addressinfo__item">
                <span class="addressinfo__item__desc">楼号-门牌号:</span>
                <input class="addressinfo__item__input" placeholder="填写详细地址，例A号楼B层" v-model="houseNumber"/>
            </div>
            <div class="addressinfo__item">
                <span class="addressinfo__item__desc">收货人:</span>
                <input class="addressinfo__item__input" placeholder="请填写收货人的姓名" v-model="name"/>
            </div>
            <div class="addressinfo__item">
                <span class="addressinfo__item__desc">联系电话:</span>
                <input class="addressinfo__item__input" placeholder="请填写收获手机号" v-model="phone"/>
            </div>
        </div>
        <Toast v-if="showToast" :message="toastMessage"/>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { get, post, patch } from '../../utils/request'
import { useBackRouterEffect } from '../../effects/backEffects'
import Toast, { useToastEffect } from '../../components/Toast'

// 新建和更新地址相关逻辑
const useUpsertAddressEffect = (addressId, changeToast) => {
  const addressData = reactive({
    city: '',
    department: '',
    houseNumber: '',
    name: '',
    phone: ''
  })

  const getAddresInfo = async () => {
    const result = await get(`/api/user/address/${addressId}`)
    if (result?.errno === 0 && result?.data) {
      const { city, department, houseNumber, name, phone } = result.data
      addressData.city = city
      addressData.department = department
      addressData.houseNumber = houseNumber
      addressData.name = name
      addressData.phone = phone
    }
  }

  const handleSendAddressInfo = async () => {
    if (addressId) {
      try {
        const result = await patch(`api/user/address/${addressId}`, addressData)
        if (result?.errno === 0 && result?.data) {
          changeToast('更新成功')
        }
      } catch (e) {
        changeToast('网络连接失败')
      }
    } else {
      try {
        const result = await post('/api/user/address', addressData)
        if (result?.errno === 0 && result?.data) {
          changeToast('新建成功')
        }
      } catch (e) {
        changeToast('网络连接失败')
      }
    }
  }

  if (addressId) {
    getAddresInfo(addressId)
  }

  const { city, department, houseNumber, name, phone } = toRefs(addressData)

  return {
    city,
    department,
    houseNumber,
    name,
    phone,
    handleSendAddressInfo
  }
}

export default {
  name: 'UpsertAddress',
  components: {
    Toast
  },
  setup () {
    const route = useRoute()
    const addressId = route.params.id
    const { handleBackClick } = useBackRouterEffect()
    const { showToast, toastMessage, changeToast } = useToastEffect()
    const { city, department, houseNumber, name, phone, handleSendAddressInfo } = useUpsertAddressEffect(addressId, changeToast)

    return {
      addressId,
      city,
      department,
      houseNumber,
      name,
      phone,
      showToast,
      toastMessage,
      handleBackClick,
      handleSendAddressInfo
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

.addressinfo {
    margin-top: .12rem;
    padding: 0 .18rem;
    background: $bgColor;
    &__item {
        display: flex;
        line-height: .44rem;
        border-bottom: .01rem solid $content-bgColor;
        &:last-child{
            border-bottom: none;
        }
        &__desc {
            font-size: .14rem;
            color: $medium-font-color;
        }
        &__input {
            flex: 1;
            outline: none;
            border: none;
            background: none;
            font-size: .14rem;
            margin-left: .05rem;
            &::placeholder {
                color: $search-font-color;
            }
        }
    }
}
</style>
