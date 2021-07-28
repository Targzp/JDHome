<template>
   <div class="position">
      <span class="iconfont position__pos">&#xe651;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe604;</span>
    </div>
    <div class="search">
      <span class="iconfont">&#xe605;</span>
      <input class="search__text" placeholder="山姆会员商店优惠商品">
    </div>
    <div class="banner">
      <img class="banner__img" src="../../assets/banner.jpg">
    </div>
    <div class="icons">
      <div class="icons__item" v-for="item in iconList" :key="item.id">
        <img class="icons__item__img" :src="item.imgUrl">
        <p class="icons__item__desc">{{item.desc}}</p>
      </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { imgUrl: require('../../assets/超市.png'), desc: '超市便利' },
      { imgUrl: require('../../assets/菜市场.png'), desc: '菜市场' },
      { imgUrl: require('../../assets/水果店.png'), desc: '水果店' },
      { imgUrl: require('../../assets/鲜花.png'), desc: '鲜花绿植' },
      { imgUrl: require('../../assets/医药健康.png'), desc: '医药健康' },
      { imgUrl: require('../../assets/家居.png'), desc: '家居时尚' },
      { imgUrl: require('../../assets/蛋糕.png'), desc: '烘焙蛋糕' },
      { imgUrl: require('../../assets/签到.png'), desc: '签到' },
      { imgUrl: require('../../assets/大牌免运.png'), desc: '大牌免运' },
      { imgUrl: require('../../assets/红包.png'), desc: '红包套餐' }
    ]
    return {
      iconList
    }
  }
}
</script>

<style lang="scss">
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.wrapper{
  /* 超出区域滚动 */
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .2rem .18rem;
}

.position{
  position: relative;
  padding: .16rem .24rem .16rem 0;
  font-size: .16rem;
  line-height: .22rem;
  color: $content-font-color;
  @include ellipsis;
  .position__pos{
    position: relative;
    top: .01rem;
    font-size: .2rem;
  }
  .position__notice{
    position: absolute;
    top: .17rem;
    right: 0;
    font-size: .2rem;
  }
}

.search{
  height: .32rem;
  position: relative;
  font-size: 0.14rem;
  color: #B7B7B7;
  margin-bottom: .12rem;
  .iconfont{
    display: inline-block;
    padding: 0 .08rem 0 .16rem;
    position: absolute;
    top: .04rem;
    left: 0;
    font-size: .2rem;
  }
  &__text{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: .46rem;
    border: 0px;
    border-radius: 16px;
    background: #F5F5F5;
    &:focus{
      outline: none;
    }
  }
}

.banner{
  /* 使用技巧给正在加载的图片腾出空间，避免页面抖动 */
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;/* 图片高宽比，求出图片预计的高度（所占空间） */
  &__img{
    width: 100%;
  }
}

.icons{
  display: flex;
  flex-flow: row wrap;
  margin-top: .16rem;
  &__item{
    width: 20%;
    &__img{
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &__desc{
      color: $content-font-color;
      margin: .06rem 0 .16rem 0;
      text-align: center;
    }
  }
}

.gap{
  height: .1rem;
  background: $content-bgColor;
  margin: 0 -0.18rem;
}
</style>
