<template>
    <div class="cart">
      <div class="product">
        <div class="product__header">

        </div>
        <template v-for="item in productList" :key="item._id">
          <div v-if="item.count > 0" class="product__item">
            <div
              class="product__item__checked iconfont"
              v-html="item.check?'&#xe618;':'&#xe619;'"
              @click="() => changeCartItemChecked(shopId, item._id)"
            >
            </div>
            <img class="product__item__img" :src="item.imgUrl">
            <div class="product__item__info">
                <h4 class="product__item__title">{{item.name}}</h4>
                <p class="product__item__price">
                    <span class="product__item__yen">&yen;{{item.price}}</span>
                    <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                </p>
            </div>
            <div class="product__number">
                <span class="product__number__minus"
                @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">−</span>
                {{item?.count || 0}}
                <span class="product__number__plus"
                @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span>
            </div>
          </div>
        </template>
      </div>
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect'

const useCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  const total = computed(() => {
    const productList = cartList[shopId]
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
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) {
          count += (product.price * product.count)
        }
      }
    }
    return count.toFixed(1)
  })

  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', {
      shopId,
      productId
    })
  }

  return {
    total,
    price,
    productList,
    changeCartItemChecked
  }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { total, price, productList, changeCartItemChecked } = useCartEffect(shopId)
    const { changeCartItemInfo } = useCommonCartEffect()
    return {
      total,
      price,
      shopId,
      productList,
      changeCartItemInfo,
      changeCartItemChecked
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
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

.product {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: .49rem;
    background: $bgColor;
    overflow-y: scroll;
    &__header{
      height: .52rem;
      border-bottom: .01rem solid $content-bgColor;
    }
    &__item {
        display: flex;
        padding: .12rem 0;
        &__checked{
          align-self: center;
          color: #0091FF;
          font-size: .2rem;
          padding-left: .18rem;
        }
        &__img {
            object-fit: contain;
            width: .46rem;
            height: .46rem;
            padding: 0 .16rem;
        }
        &__info{
            flex: 1;
            overflow: hidden;
        }
        &__title{
            font-size: .14rem;
            line-height: .2rem;
            color: $content-font-color;
            margin: 0;
            @include ellipsis;
        }
        &__price{
            line-height: .2rem;
            margin: .06rem 0 0 0;
        }
        &__yen{
            display: inline-block;
            font-size: .14rem;
            font-weight: bold;
            color: $hightlight-font-color;
            padding-right: .06rem;
            &::first-letter{
                font-size: .1rem;
            }
        }
        &__origin{
            font-size: .1rem;
            color: $light-font-color;
            text-decoration: line-through;
        }
    }
    &__number{
        flex: .5;
        align-self: flex-end;
        font-size: .14rem;
        &__minus, &__plus{
            display: inline-block;
            width: .15rem;
            line-height: .15rem;
            border-radius: 50%;
            font-size: .15rem;
            text-align: center;
            transform: scale(1.3);
        }
        &__minus{
            color: $medium-font-color;
            border: .01rem solid $medium-font-color;
            margin-right: .1rem;
        }
        &__plus{
            color: $bgColor;
            background: $buttonColor;
            border: .01rem solid $buttonColor;
            margin-left: .1rem;
        }
    }
}
</style>
