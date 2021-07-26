<template>
  <div class="docker">
    <!-- BEM: block__element--modifier -->
    <div class="docker__item docker__item--active">
      <div class="iconfont">&#xe601;</div>
      <div class="docker__title">首页</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe602;</div>
      <div class="docker__title">购物车</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe600;</div>
      <div class="docker__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe603;</div>
      <div class="docker__title">我的</div>
    </div>
  </div>
</template>

<style lang="scss">
.docker{
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 0.18rem;
  box-sizing: border-box;
  width: 100%;
  height: 0.49rem;
  background: #FFFFFF;
  box-shadow: 0 -1px 1px 0 #F1F1F1;
  &__item{
    flex: 1;
    text-align: center;
    .iconfont{
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }
    &--active{
      color: #1FA4FC;
    }
  }
  &__title{
    font-size: 20px;
    transform: scale(0.5,0.5);
    transform-origin: center top;
  }
}
</style>
