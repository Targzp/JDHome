<template>
  <div class="wrapper">
    <div class="title">我的全部购物车</div>
    <template v-if="haveProducts">
      <ProductList v-for="(id,index) in idList" :key="index" :id="id"/>
    </template>
    <div class="status" v-else>当前购物车为空</div>
  </div>
  <Docker :currentIndex="1"/>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import Docker from '../../components/Docker.vue'
import ProductList from '../../components/ProductList.vue'
import { useCommonCartEffect } from '../../effects/cartEffects.js'

// 获取所有商店购物车的逻辑
const useCartListEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  const allShopId = reactive({ idList: [] })
  const haveProducts = ref(false)
  for (const id in cartList) {
    allShopId.idList.push(id)
  }

  const { idList } = toRefs(allShopId)

  idList.value.forEach(id => {
    const { calculations } = useCommonCartEffect(id)
    if (calculations.value.total > 0) {
      haveProducts.value = true
    }
  })

  return {
    idList,
    haveProducts
  }
}

export default {
  name: 'CartList',
  components: {
    Docker,
    ProductList
  },
  setup () {
    const { idList, haveProducts } = useCartListEffect()
    return {
      idList,
      haveProducts
    }
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

.status {
  font-size: .14rem;
  text-align: center;
  color: $light-font-color;
  margin-top: .16rem;
}
</style>
