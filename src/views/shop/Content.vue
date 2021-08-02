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
                    <h4 class="product__item__title">番茄250g/份</h4>
                    <p class="product__item__sales">月售10件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;33.6</span>
                        <span class="product__item__origin">&yen;33.6</span>
                    </p>
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
            background: #FFF;
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
        }
        &__title{
            font-size: .14rem;
            line-height: .2rem;
            color: $content-font-color;
            margin: 0;
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
            color: #E93B3B;
            padding-right: .06rem;
            &::first-letter{
                font-size: .1rem;
            }
        }
        &__origin{
            font-size: .1rem;
            color: #999;
            text-decoration: line-through;
        }
    }
}
</style>
