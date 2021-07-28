<template>
    <div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <div class="nearby__item" v-for="item in nearbyList" :key="item.id">
        <img class="nearby__item__img" :src="item.imgUrl">
        <div class="nearby__content">
          <div class="nearby__content__title">{{item.title}}</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag" v-for="(tag,index) in item.tags" :key="index">{{tag}}</span>
          </div>
          <p class="nearby__content__highlight">{{item.highlight}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Nearby',
  setup () {
    const nearbyList = [
      { id: 1, title: '沃尔玛', imgUrl: require('../../assets/near.png'), tags: ['月售1万+', '起送¥0', '基础运费¥15'], highlight: 'VIP尊享满89元减4元运费券（每月3张)' },
      { id: 2, title: '山姆会员超市', imgUrl: require('../../assets/near.png'), tags: ['月售2000', '起送¥20', '基础运费¥5'], highlight: '联合利华洗护满10减5' },
      { id: 3, title: '家乐福', imgUrl: require('../../assets/near.png'), tags: ['月售1000', '起送¥15', '基础运费¥0'], highlight: '热带风味冰红茶全场满50减10' },
      { id: 4, title: '华润一家', imgUrl: require('../../assets/near.png'), tags: ['月售5000', '起送¥0', '基础运费¥3'], highlight: 'VIP尊享满200送50元代金券' }
    ]
    return {
      nearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.nearby{
  &__title{
    font-size: .18rem;
    font-weight: normal;
    color: $content-font-color;
    margin: .16rem 0 .02rem 0;
  }
  &__item{
    display: flex;
    padding-top: .12rem;
    &__img{
      width: .56rem;
      height: .56rem;
      margin-right: .16rem;
    }
  }
  &__content{
    flex: 1;
    padding-bottom: .12rem;
    border-bottom: 1px solid $content-bgColor;
    &__title{
      color: $content-font-color;
      font-size: .16rem;
      line-height: .22rem;
    }
    &__tags{
      color: $content-font-color;
      font-size: .13rem;
      line-height: .18rem;
      margin-top: .08rem;
    }
    &__tag{
      margin-right: .16rem;
    }
    &__highlight{
      color: red;
      font-size: .13rem;
      line-height: .18rem;
      margin: .08rem 0 0 0;
    }
  }
}
</style>
