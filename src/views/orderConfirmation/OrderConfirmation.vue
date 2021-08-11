<template>
    <div class="wrapper">
        <TopArea />
        <ProductList />
        <Order />
    </div>
</template>

<script>
import TopArea from './TopArea'
import ProductList from '../../components/ProductList.vue'
import Order from './Order.vue'
export default {
  name: 'OrderConfirmation',
  components: {
    TopArea,
    ProductList,
    Order
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    position: absolute;
    top: 0;
    bottom: .49rem;
    left: 0;
    right: 0;
    background-color: #f8f8f8;
    overflow-y: scroll;
}
</style>
