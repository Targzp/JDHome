import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const cartList = state.cartList
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  return JSON.parse(localStorage.cartList || '{}')
}

export default createStore({
  state: {
    cartList: getLocalCartList(),
    // shopId: {
    //    shopName: '沃尔玛'，
    //    productList: {
    //      productId: {
    //        ...
    //     },
    //      productId: {
    //        ...
    //      },
    //     ...
    //   }
    // }
    addressList: []
  },
  mutations: {
    // 添加商品进入购物车中，数量根据 num 值增减。且一旦增加该商品就为选中状态，最后数量不能小于 0
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + num
      if (num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 切换对应商品的选中状态
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const productItem = state.cartList[shopId].productList[productId]
      productItem.check = !productItem.check
      setLocalCartList(state)
    },
    // 清空对应商店中购物车中所有商品
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 将对应商店中购物车中的所有商品切换为选中状态
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId]
      shopInfo.shopName = shopName
      setLocalCartList(state)
    },
    changeAddressList (state, payload) {
      const { data } = payload
      state.addressList = data
    }
  },
  actions: {
  },
  modules: {
  }
})
