<template>
    <div class="order">
        <div class="order__price">
            实付金额 &yen;<span class="order__price__number">{{calculations.price}}</span>
        </div>
        <div class="order__btn">提交订单</div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { calculations } = useCommonCartEffect(shopId)

    return {
      calculations
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
</style>
