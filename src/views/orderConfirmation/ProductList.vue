<template>
    <div class="product">
        <div class="product__title">{{shopName}}</div>
        <div class="product__list">
            <template v-for="item in productList" :key="item._id">
                <div class="product__item" v-if="item.count > 0">
                    <img class="product__item__img" :src="item.imgUrl">
                    <div class="product__item__info">
                        <h4 class="product__item__title">{{item.name}}</h4>
                        <p class="product__item__price">
                            <span class="product__item__singleprice">&yen;{{item.price}} × {{item.count}}</span>
                            <span class="product__item__totalprice">&yen;{{(item.price * item.count).toFixed(1)}}</span>
                        </p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)

    return {
      productList,
      shopName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.product {
    margin: .16rem .18rem 0 .18rem;
    background-color: $bgColor;
    border-radius: .04rem;
    &__title{
        font-size: .16rem;
        line-height: .22rem;
        font-weight: bold;
        padding: .16rem 0 .16rem .16rem;
    }
    &__item {
        display: flex;
        padding: 0 .16rem .16rem .16rem;
        &__img {
            width: .46rem;
            height: .46rem;
            padding-right: .16rem;
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
            display: flex;
            justify-content: space-between;
            line-height: .2rem;
            margin: 0;
        }
        &__singleprice{
            font-size: .14rem;
            color: $hightlight-font-color;
            &::first-letter{
                font-size: .1rem;
            }
        }
        &__totalprice{
            font-size: .14rem;
            &::first-letter{
                font-size: .1rem;
            }
        }
    }
}
</style>
