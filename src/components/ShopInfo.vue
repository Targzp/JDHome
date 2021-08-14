<template>
    <div class="shop">
        <img class="shop__img" :src="item.imgUrl">
        <div :class="{'shop__content':true, 'shop__content--bordered': hideBorder ? false : true}">
          <div class="shop__content__title">{{item.name}}</div>
          <div class="shop__content__tags">
            <span class="shop__content__tag">{{`月售 ${item.sales}`}}</span>
            <span class="shop__content__tag">{{`起送￥${item.expressLimit}`}}</span>
            <span class="shop__content__tag">{{`基础运费￥${item.expressPrice}`}}</span>
          </div>
          <p class="shop__content__highlight">{{item.slogan}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss">
@import '../style/virables.scss';
.shop{
  display: flex;
  padding-top: .12rem;
  &__img{
    width: .56rem;
    height: .56rem;
    margin-right: .16rem;
    }
  &__content{
    flex: 1;
    padding-bottom: .12rem;
    &--bordered{
      border-bottom: .01rem solid $content-bgColor;
    }
    &__title{
      color: $content-font-color;
      font-size: .16rem;
      line-height: .22rem;
    }
    &__tags{
      color: $content-font-color;
      font-size: .13rem;
      line-height: .18rem;
      margin-top: .08rem;
    }
    &__tag{
      margin-right: .16rem;
    }
    &__highlight{
      color: $hightlight-font-color;
      font-size: .13rem;
      line-height: .18rem;
      margin: .08rem 0 0 0;
    }
  }
}
</style>
