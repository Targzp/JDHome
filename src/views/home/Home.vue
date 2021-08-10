<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0"/>
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from '../../components/Docker.vue'
export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker
  }
}
</script>

<style lang="scss" scoped>
/* scoped 表示该组件样式只影响所在组件的 DOM 结构 */
.wrapper{
  /* 超出区域滚动 */
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .49rem;
  right: 0;
  padding: 0 .18rem 0 .18rem;
}
</style>
