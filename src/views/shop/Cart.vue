<template>
    <div class="cart">
        <div class="check">
            <div class="check__icon">
                <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png">
                <div class="check__icon__tag">{{total}}</div>
            </div>
            <div class="check__info">
                总计：<span class="check__info__price">&yen;{{price}}</span>
            </div>
            <div class="check__btn">去结算</div>
        </div>
    </div>
</template>

<script>
import { toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const useCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const { cartList } = toRefs(store.state)

  const total = computed(() => {
    const productList = cartList.value[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })

  const price = computed(() => {
    const productList = cartList.value[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += (product.price * product.count)
      }
    }
    return count.toFixed(1)
  })

  return {
    total,
    price
  }
}

export default {
  name: 'Cart',
  setup () {
    const { total, price } = useCartEffect()
    return {
      total,
      price
    }
  }
}
</script>

<style lang="scss">
@import '../../style/virables.scss';
.cart {
    height: .5rem;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    border-top: .01rem solid $content-bgColor;
}

.check {
    display: flex;
    &__icon{
        position: relative;
        width: .84rem;
        &__img{
            display: block;
            margin: .12rem auto;
            width: .28rem;
            height: .26rem;
        }
        &__tag{
            position: absolute;
            left: .46rem;
            top: .04rem;
            min-width: .2rem;
            height: .2rem;
            line-height: .2rem;
            font-size: .12rem;
            color: $bgColor;
            border-radius: .1rem;
            background: $hightlight-font-color;
            text-align: center;
            transform: scale(0.5);
            transform-origin: left center;
        }
    }
    &__info{
        flex: 1;
        font-size: .12rem;
        line-height: .5rem;
        color: $content-font-color;
        &__price{
            font-size: .18rem;
            color: $hightlight-font-color;
            vertical-align: bottom;
        }
    }
    &__btn{
        flex: .5;
        text-align: center;
        font-size: .14rem;
        line-height: .5rem;
        color: $bgColor;
        background: #4FB0F9;
    }
}
</style>
