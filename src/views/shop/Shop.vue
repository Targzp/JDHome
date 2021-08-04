<template>
    <div class="wrapper">
        <div class="search">
          <div class="search__back iconfont" @click="handleBackClick">&#xe606;</div>
          <div class="search__content">
            <span class="search__content__icon iconfont">&#xe605;</span>
            <input class="search__content__input" placeholder="请输入商品名称搜索">
          </div>
        </div>
        <div class="load" v-if="show">正在加载...</div>
        <ShopInfo v-else :item="item" :hideBorder="true"/>
        <Content />
        <Cart />
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

// 根据 id 获取商店详情
const useShopInfoEffect = () => {
  const route = useRoute()// route 表示当前路由信息的实例
  const show = ref(true)// 未得到数据之前显示 ‘正在加载’ 提示
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`api/shop/${route.params.id}`)// await 暂停函数执行，此时 item 对象没有值，当期约解决，则继续执行
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
      show.value = false
    }
  }
  const { item } = toRefs(data)
  return {
    item,
    show,
    getItemData
  }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return {
    handleBackClick
  }
}

export default {
  name: 'Shop',
  components: {
    ShopInfo,
    Content,
    Cart
  },
  setup () {
    const { item, show, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()

    getItemData()

    return {
      item,
      show,
      handleBackClick
    }
  }
}
</script>

<style lang="scss">
@import '../../style/virables.scss';
.wrapper{
  padding: 0 .18rem;
}

.search{
  margin: .14rem 0 .04rem 0;
  display: flex;
  line-height: .32rem;
  &__back{
    width: .3rem;
    line-height: .32rem;
    font-size: .21rem;
    color: #B7B6B6;
  }
  &__content{
    flex: 1;
    display: flex;
    background: $search-bgColor;
    border-radius: .16rem;
    &__icon{
      width: .44rem;
      text-align: center;
      font-size: .19rem;
      color: $search-font-color;
    }
    &__input{
      flex: 1;
      font-size: .14rem;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      &::placeholder{
        color: $content-font-color;
      }
    }
  }
}

.load{
  width: max-content;
  font-size: .14rem;
  line-height: .32rem;
  margin: auto;
}
</style>
