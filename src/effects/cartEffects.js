import { computed } from 'vue'
import { useStore } from 'vuex'
// 购物车相关通用逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  // 将对应商铺的商品加入到购物车，需要提供商品 Id，商品信息，及 num 表示增减
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num
    })
  }

  // 获取对应商铺内的进入购物车的所有商品
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })

  // 获取对应商铺的商铺名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  return {
    cartList,
    shopName,
    productList,
    changeCartItemInfo
  }
}
