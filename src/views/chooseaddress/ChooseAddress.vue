<template>
    <div class="wrapper">
        <div class="header">
            <span
            class="header__back iconfont"
            @click="handleBackClick">&#xe606;</span>
            <span class="header__info">收货地址</span>
        </div>
        <Address :shopId="shopId"/>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import Address from '../../components/Address.vue'
import { useBackRouterEffect } from '../../effects/backEffects'

export default {
  name: 'ChooseAddress',
  components: {
    Address
  },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { handleBackClick } = useBackRouterEffect()
    return {
      shopId,
      handleBackClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgb(248,248,248);
}

.header {
    display: flex;
    line-height: .44rem;
    background: $bgColor;
    padding: 0 .18rem;
    &__back {
        font-size: .16rem;
        color: #B6B6B6;
    }
    &__info {
        font-size: .16rem;
        color: $content-font-color;
        flex: 1;
        text-align: center;
    }
}
</style>
