<template>
  <div class="docker">
    <!-- BEM: block__element--modifier -->
    <div
      v-for="(item, index) in dockerList"
      :key="index"
      :class="{'docker__item':true,'docker__item--active':index===0}"
    >
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe601;', text: '首页' },
      { icon: '&#xe602;', text: '购物车' },
      { icon: '&#xe600;', text: '订单' },
      { icon: '&#xe603;', text: '我的' }
    ]
    return {
      dockerList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/virables.scss";
.docker {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 0.18rem;
  box-sizing: border-box;
  width: 100%;
  height: 0.49rem;
  background: $bgColor;
  box-shadow: 0 -0.01rem 0.01rem 0 $content-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    color: $content-font-color;
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
