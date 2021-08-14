<template>
    <div class="order">
        <div class="order__price">
            实付金额 &yen;<span class="order__price__number">{{calculations.price}}</span>
        </div>
        <div class="order__btn" @click="handleSubmitClick">提交订单</div>
    </div>
    <div class="mask"
         v-show="showConfirm"
         @click.self="handleSubmitClick">
        <div class="mask__toast">
            <h3 class="mask__toast__title">
                确认要离开收银台吗？
            </h3>
            <p class="mask__toast__desc">请尽快完成支付，否则将被取消</p>
            <div class="mask__toast__btns">
                <div
                    class="mask__toast__btn"
                    @click="() => handleConfirmOrder(true)">取消订单</div>
                <div
                    class="mask__toast__btn"
                    @click="() => handleConfirmOrder(false)">确认支付</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { post } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'

//  下单相关逻辑
const useMakeOrderEffect = () => {
  const router = useRouter()
  const route = useRoute()
  let shopId = route.params.id
  const { shopName, calculations, productList, cleanCartProducts } = useCommonCartEffect(shopId)
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    shopId = parseInt(shopId, 10)
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({
        id: parseInt(product._id, 10),
        num: product.count
      })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        cleanCartProducts(shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      // 提示下单失败，使用 toast 组件
    }
  }

  return {
    calculations,
    handleConfirmOrder
  }
}

// 确认支付/取消订单弹窗展示相关的逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = () => {
    showConfirm.value = !showConfirm.value
  }

  return {
    showConfirm,
    handleSubmitClick
  }
}

export default {
  name: 'Order',
  setup () {
    const { showConfirm, handleSubmitClick } = useShowMaskEffect()
    const { calculations, handleConfirmOrder } = useMakeOrderEffect()

    return {
      showConfirm,
      calculations,
      handleSubmitClick,
      handleConfirmOrder
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.order {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: .14rem;
    line-height: .49rem;
    display: flex;
    background-color: $bgColor;
    &__price {
        flex: 1;
        padding: 0 .02rem 0 .24rem;
        &__number{
            font-size: .16rem;
            font-weight: bold;
        }
    }
    &__btn{
        flex: 0 1 .98rem;
        text-align: center;
        color: $bgColor;
        background-color: #4FB0F9;
    }
}

.mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: rgba(0,0,0,0.50);
    &__toast {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 3.01rem;
        height: 1.57rem;
        background: $bgColor;
        border-radius: .04rem;
        &__title {
            font-size: .18rem;
            line-height: .25rem;
            color: $content-font-color;
            text-align: center;
            margin: .24rem 0 .08rem 0;
        }
        &__desc {
            font-size: .14rem;
            line-height: .2rem;
            color: $medium-font-color;
            text-align: center;
            margin-bottom: .24rem;
        }
        &__btns {
            display: flex;
            justify-content: center;
        }
        &__btn{
            border-radius: .16rem;
            border: .01rem solid #4FB0F9;
            font-size: .14rem;
            line-height: .2rem;
            padding: .06rem .12rem;
            &:nth-child(1){
                color: $buttonColor;
                margin-right: .12rem;
            }
            &:nth-child(2){
                color: $bgColor;
                margin-left: .12rem;
                background: #4FB0F9;
            }
        }
    }
}
</style>
