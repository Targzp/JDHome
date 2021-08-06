<template>
      <transition>
        <div class="product" v-if="showCart">
          <div class="product__header">
            <div class="product__header__all">
              <span
              class="product__header__icon iconfont"
              v-html="allChecked?'&#xe618;':'&#xe619;'"
              @click="() => setCartItemsChecked(shopId)"
              ></span>
              全选
            </div>
            <div
              class="product__header__clear"
              @click="() => cleanCartProducts(shopId)"
            >清空购物车</div>
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
    </transition>
    <div class="mask" v-if="showCart"
        @click="handleCartShowChange" />
    <div class="cart">
      <div class="check">
          <div class="check__icon">
              <img
              class="check__icon__img"
              src="http://www.dell-lee.com/imgs/vue3/basket.png"
              @click="handleCartShowChange">
              <div class="check__icon__tag">{{total}}</div>
          </div>
          <div class="check__info">
              总计：<span class="check__info__price">&yen;{{price}}</span>
          </div>
          <div class="check__btn">
            <router-link :to="{name: 'Home'}">去结算</router-link>
          </div>
      </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect'

// 购物车相关逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  // 计算进入购物车的所有商品的总数
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

  // 计算进入购物车的所有商品的总价，且只计算选中状态的商品
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

  // 根据购物车内所有商品的选中状态，判断是否为全选。默认为全选状态
  const allChecked = computed(() => {
    const productList = cartList[shopId]
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (!product.check) {
          result = false
        }
      }
    }
    return result
  })

  // 获取对应商铺内的进入购物车的所有商品
  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })

  // 改变购物车中某商品的选中状态。shopId 为商店 ID，productId 为商品 ID
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', {
      shopId,
      productId
    })
  }

  // 将添加进购物车中的商品删除。shopId 为商店 ID
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', {
      shopId
    })
  }

  // 将购物车中的所有商品切换为选中状态。shopId 为商店 ID
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', {
      shopId
    })
  }

  return {
    total,
    price,
    productList,
    allChecked,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }

  return {
    showCart,
    handleCartShowChange
  }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { total, price, productList, allChecked, changeCartItemChecked, cleanCartProducts, setCartItemsChecked } = useCartEffect(shopId)
    const { changeCartItemInfo } = useCommonCartEffect()
    const { showCart, handleCartShowChange } = toggleCartEffect()

    return {
      total,
      price,
      shopId,
      productList,
      allChecked,
      showCart,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      handleCartShowChange
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
    background: $bgColor;
    z-index: 3;
}

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
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
        background: #4FB0F9;
        > a{
          text-decoration: none;
          color: $bgColor;
        }
    }
}

.product {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: .49rem;
    background: $bgColor;
    overflow-y: scroll;
    z-index: 2;
    &__header{
      display: flex;
      justify-content: space-between;
      line-height: .52rem;
      border-bottom: .01rem solid $content-bgColor;
      &__icon{
        font-size: .2rem;
        color: $buttonColor;
        margin: 0 .084rem 0 .18rem;
        vertical-align: bottom;
      }
      &__all{
        font-size: .14rem;
        color: $content-font-color;
      }
      &__clear{
        font-size: .14rem;
        color: $content-font-color;
        margin-right: .18rem;
      }
    }
    &__item {
        display: flex;
        padding: .12rem 0;
        &__checked{
          align-self: center;
          color: $buttonColor;
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
        align-self: center;
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

.v-enter-from,.v-leave-to{
  transform: translateY(100%);
  transform-origin: top center;
}

.v-enter-active,.v-leave-active{
  transition: transform 150ms linear;
}
</style>
