<template>
    <div class="wrapper">
        <div class="search">
          <div class="search__back iconfont" @click="handleBackClick">&#xe606;</div>
          <div class="search__content">
            <span class="search__content__icon iconfont">&#xe605;</span>
            <input class="search__content__input" placeholder="请输入商品名称搜索">
          </div>
        </div>
        <ShopInfo :item="item" :hideBorder="true"/>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import ShopInfo from '../../components/ShopInfo.vue'

export default {
  name: 'Shop',
  components: {
    ShopInfo
  },
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return {
      item: {
        _id: '1',
        name: '沃尔玛',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
        sales: 10000,
        expressLimit: 0,
        expressPrice: 5,
        slogan: 'VIP尊享满89元减4元运费券'
      },
      handleBackClick
    }
  }
}
</script>

<style lang="scss">
.wrapper{
  padding: 0 .18rem;
}

.search{
  margin: .2rem 0 .04rem 0;
  display: flex;
  line-height: .32rem;
  &__back{
    width: .3rem;
    line-height: .32rem;
    font-size: .21rem;
    color: #B6B6B6;
  }
  &__content{
    flex: 1;
    display: flex;
    background: #F5F5F5;
    border-radius: .16rem;
    &__icon{
      width: .44rem;
      text-align: center;
      font-size: .19rem;
      color: #B7B7B7;
    }
    &__input{
      flex: 1;
      font-size: .14rem;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      &::placeholder{
        color: #333333;
      }
    }
  }
}
</style>
