<template>
  <div class="docker">
    <!-- BEM: block__element--modifier -->
    <div
      v-for="(item, index) in dockerList"
      :key="index"
      :class="{'docker__item':true,'docker__item--active':index===currentIndex}"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe601;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe602;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe600;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe603;', text: '我的', to: { name: 'Home' } }
    ]
    return {
      dockerList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/virables.scss";
.docker {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 0.18rem;
  box-sizing: border-box;
  width: 100%;
  height: .49rem;
  background: $bgColor;
  box-shadow: 0 -0.01rem 0.01rem 0 $content-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $content-font-color;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.1rem;
    transform-origin: center top;
  }
}
</style>
