<template>
    <div class="content">
        <div class="category">
            <div :class="{ 'category__item':true, 'category__item--active': currentTab === item.tab}"
            v-for="item in categories"
            :key="item.tab"
            @click="() => handleTabClick(item.tab)">
            {{item.name}}</div>
        </div>
        <div class="product">
            <div class="product__item" v-for="item in list" :key="item._id">
                <img class="product__item__img" :src="item.imgUrl">
                <div class="product__item__info">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售{{item.sales}}件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;{{item.price}}</span>
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span class="product__number__minus"
                    @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">−</span>
                    {{cartList?.[shopId]?.[item._id]?.count || 0}}
                    <span class="product__number__plus"
                    @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// 和 Tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return {
    currentTab,
    handleTabClick
  }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })

  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }

  // getContentData函数内部数据变化重新执行函数
  watchEffect(() => {
    getContentData()
  })

  const { list } = toRefs(content)

  return {
    list,
    shopId
  }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)

  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num
    })
  }

  return {
    cartList,
    changeCartItemInfo
  }
}

export default {
  name: 'Content',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItemInfo } = useCartEffect()

    return {
      categories,
      list,
      currentTab,
      handleTabClick,
      cartList,
      shopId,
      changeCartItemInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}

.category {
    width: .76rem;
    background: $search-bgColor;
    overflow-y: scroll;
    &__item {
        text-align: center;
        font-size: .14rem;
        line-height: .5rem;
        color: $content-font-color;
        &--active {
            background: $bgColor;
        }
    }
}

.product {
    flex: 1;
    overflow-y: scroll;
    padding: 0 .16rem;
    &__item {
        display: flex;
        padding: .12rem 0;
        border-bottom: 1px solid $content-bgColor;
        &__img {
            width: .68rem;
            height: .68rem;
            padding-right: .16rem
        }
        &__info{
            flex: 1;
            overflow: hidden;
        }
        &__title{
            font-size: .14rem;
            line-height: .2rem;
            color: $content-font-color;
            margin: 0;
            @include ellipsis;
        }
        &__sales{
            color: $content-font-color;
            font-size: .12rem;
            line-height: .16rem;
            margin: .06rem 0;
        }
        &__price{
            line-height: .2rem;
            margin: 0;
        }
        &__yen{
            display: inline-block;
            font-size: .14rem;
            font-weight: bold;
            color: $hightlight-font-color;
            padding-right: .06rem;
            &::first-letter{
                font-size: .1rem;
            }
        }
        &__origin{
            font-size: .1rem;
            color: $light-font-color;
            text-decoration: line-through;
        }
    }
    &__number{
        align-self: flex-end;
        font-size: .14rem;
        &__minus, &__plus{
            display: inline-block;
            width: .15rem;
            line-height: .15rem;
            border-radius: 50%;
            font-size: .15rem;
            text-align: center;
            transform: scale(1.3);
        }
        &__minus{
            color: $medium-font-color;
            border: .01rem solid $medium-font-color;
            margin-right: .1rem;
        }
        &__plus{
            color: $bgColor;
            background: $buttonColor;
            border: .01rem solid $buttonColor;
            margin-left: .1rem;
        }
    }
}
</style>
