<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
        <div class="order">
            <div class="order__title">
                沃尔玛
                <span class="order__status">已取消</span>
            </div>
            <div class="order__content">
                <div class="order__content__imgs">
                    <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                    <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                    <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                    <img class="order__content__img" src="http://www.dell-lee.com/imgs/vue3/tomato.png">
                </div>
                <div class="order__content__info">
                    <div class="order__content__price">&yen;33.6</div>
                    <div class="order__content__count">共6件</div>
                </div>
            </div>
        </div>
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>

<script>
import Docker from '../../components/Docker.vue'
export default {
  name: 'OrderList',
  components: {
    Docker
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/virables.scss";
.wrapper{
  /* 超出区域滚动 */
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: .44rem;
  bottom: .49rem;
  right: 0;
  padding: 0 .18rem 0 .18rem;
  background: rgb(248,248,248);
}

.title {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: .44rem;
    font-size: .16rem;
    color: $content-font-color;
    background: $bgColor;
    margin: 0 -.18rem;
}
</style>
