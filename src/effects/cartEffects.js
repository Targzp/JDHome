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
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  // 获取对应商铺的商铺名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 计算进入购物车的所有商品的总数和总价
  // 根据购物车内所有商品的选中状态，判断是否为全选。默认为全选状态
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += (product.price * product.count)
        }
        if (!product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(1)
    return result
  })

  // 将添加进购物车中的商品删除。shopId 为商店 ID
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', {
      shopId
    })
  }

  return {
    cartList,
    shopName,
    productList,
    calculations,
    changeCartItemInfo,
    cleanCartProducts
  }
}
