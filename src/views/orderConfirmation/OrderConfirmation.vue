<template>
    <div class="wrapper">
        <div class="top">
            <div class="top__header">
                <div class="iconfont top__header__back">&#xe606;</div>
                确认订单
            </div>
            <div class="top__receiver">
                <div class="top__receiver__title">收货地址</div>
                <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
                <div class="top__receiver__info">
                    <span class="top__receiver__info__name">瑶妹(先生)</span>
                    <span class="top__receiver__info__tel">18911024266</span>
                </div>
                <div class="iconfont top__receiver__enter">&#xe653;</div>
            </div>
        </div>
        <div class="product">
            <div class="product__title">{{shopName}}</div>
            <div class="product__list">
                <div class="product__item" v-for="item in productList" :key="item._id">
                    <img class="product__item__img" :src="item.imgUrl">
                    <div class="product__item__info">
                        <h4 class="product__item__title">{{item.name}}</h4>
                        <p class="product__item__price">
                            <span class="product__item__singleprice">&yen;{{item.price}} × {{item.count}}</span>
                            <span class="product__item__totalprice">&yen;{{(item.price * item.count).toFixed(1)}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'OrderConfirmation',
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
.wrapper{
    position: absolute;
    top: 0;
    bottom: .49rem;
    left: 0;
    right: 0;
    background-color: rgb(248,248,248);
}
.top {
    height: 1.96rem;
    position: relative;
    background-repeat: no-repeat;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    &__header {
        position: relative;
        padding-top: .26rem;
        font-size: .16rem;
        line-height: .24rem;
        color: $bgColor;
        text-align: center;
        &__back {
            position: absolute;
            left: .18rem;
            font-size: .22rem;
        }
    }
    &__receiver{
        height: 1.22rem;
        position: absolute;
        left: .18rem;
        right: .18rem;
        bottom: 0;
        background: $bgColor;
        border-radius: .04rem;
        &__title{
            font-size: .16rem;
            line-height: .22rem;
            font-weight: bold;
            margin: .16rem 0 .18rem .16rem;
        }
        &__address{
            font-size: .15rem;
            line-height: .2rem;
            margin: 0 1.04rem .12rem .16rem;
            @include ellipsis;
        }
        &__info{
            color: $medium-font-color;
            margin: 0 0 .16rem .16rem;
            &__name{
                margin-right: .06rem;
            }
        }
        &__enter{
            position: absolute;
            top: 50%;
            right: .16rem;
            transform: translateY(-50%);
            font-size: .20rem;
            color: $medium-font-color;
        }
    }
}

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
