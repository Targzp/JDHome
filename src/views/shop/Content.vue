<template>
    <div class="content">
        <div class="category">
            <div class="category__item category__item--active">全部商品</div>
            <div class="category__item">秒杀</div>
            <div class="category__item">新鲜水果</div>
            <div class="category__item">休闲食品</div>
            <div class="category__item">时令蔬菜</div>
            <div class="category__item">肉蛋家禽</div>
        </div>
        <div class="product">
            <div class="product__item">
                <img class="product__item__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                <div class="product__item__info">
                    <h4 class="product__item__title">番茄250g/份番茄250g/份番茄250g/份</h4>
                    <p class="product__item__sales">月售10件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;33.6</span>
                        <span class="product__item__origin">&yen;33.6</span>
                    </p>
                </div>
                <div class="product__number">
                    <span class="product__number__minus">−</span>
                    0
                    <span class="product__number__plus">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}

.category {
    width: .76rem;
    background: $search-bgColor;
    overflow-y: scroll;
    &__item {
        text-align: center;
        font-size: .14rem;
        line-height: .5rem;
        color: $content-font-color;
        &--active {
            background: $bgColor;
        }
    }
}

.product {
    flex: 1;
    overflow-y: scroll;
    padding: 0 .16rem;
    &__item {
        display: flex;
        padding: .12rem 0;
        border-bottom: 1px solid $content-bgColor;
        &__img {
            width: .68rem;
            height: .68rem;
            padding-right: .16rem
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
        &__sales{
            color: $content-font-color;
            font-size: .12rem;
            line-height: .16rem;
            margin: .06rem 0;
        }
        &__price{
            line-height: .2rem;
            margin: 0;
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
        align-self: flex-end;
        font-size: .14rem;
        &__minus, &__plus{
            display: inline-block;
            width: .2rem;
            height: .2rem;
            line-height: .17rem;
            border-radius: 50%;
            font-size: .2rem;
            text-align: center;
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
