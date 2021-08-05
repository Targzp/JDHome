import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {}
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + num
      if (num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const productItem = state.cartList[shopId][productId]
      productItem.check = !productItem.check
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = {}
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
