<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
        <div class="order"
             v-for="(item, index) in list"
             :key="index">
            <div class="order__title">
                {{item.shopName}}
                <span class="order__status">{{item.isCanceled?'已取消':'已下单'}}</span>
            </div>
            <div class="order__content">
                <div class="order__content__imgs">
                  <template
                      v-for="(innerItem, innerIndex) in item.products"
                      :key="innerIndex">
                    <img
                      v-if="index<4"
                      class="order__content__img" :src="innerItem.product.img">
                  </template>
                </div>
                <div class="order__content__info">
                    <div class="order__content__price">&yen;{{item.totalPrice}}</div>
                    <div class="order__content__count">共{{item.totalCount}}件</div>
                </div>
            </div>
        </div>
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0 // 计算总价
        let totalCount = 0 // 计算总数
        products.forEach((productItem) => {
          totalPrice += (productItem?.product?.price * productItem?.orderSales) || 0
          totalCount += (productItem?.orderSales) || 0
        })
        order.totalPrice = totalPrice.toFixed(1)
        order.totalCount = totalCount
      })
      data.list = orderList
    }
  }

  getOrderList()

  const { list } = toRefs(data)

  return {
    list
  }
}

export default {
  name: 'OrderList',
  components: {
    Docker
  },
  setup () {
    const { list } = useOrderListEffect()
    return {
      list
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

.order {
  padding: .16rem;
  margin-top: .16rem;
  background: $bgColor;
  border-radius: .04rem;
  &__title {
    font-size: .16rem;
    line-height: .22rem;
    font-weight: bold;
    color: $content-font-color;
  }
  &__status {
    font-size: .14rem;
    font-weight: normal;
    color: $light-font-color;
    float: right;
  }
  &__content{
    display: flex;
    justify-content: space-between;
    margin-top: .16rem;
    &__img{
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__price{
      text-align: right;
      font-size: .14rem;
      line-height: .2rem;
      color: $hightlight-font-color;
      margin-bottom: .04rem;
    }
    &__count{
      text-align: right;
      font-size: .12rem;
      line-height: .14rem;
    }
  }
}
</style>
