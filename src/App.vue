<template>
  <div class="wrapper">
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
      <img class="banner__img" src="./assets/banner.jpg">
    </div>
  </div>
  <div class="docker">
    <!-- BEM: block__element--modifier -->
    <div class="docker__item docker__item--active">
      <div class="iconfont">&#xe601;</div>
      <div class="docker__title">首页</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe602;</div>
      <div class="docker__title">购物车</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe600;</div>
      <div class="docker__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe603;</div>
      <div class="docker__title">我的</div>
    </div>
  </div>
</template>

<style lang="scss">
@import './style/virables.scss';
@import './style/mixins.scss';
.wrapper{
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem;
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
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img{
    width: 100%;
  }
}

.docker{
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 0.18rem;
  box-sizing: border-box;
  width: 100%;
  height: 0.49rem;
  background: #FFFFFF;
  box-shadow: 0 -0.01rem 0.01rem 0 #F1F1F1;
  &__item{
    flex: 1;
    text-align: center;
    .iconfont{
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }
    &--active{
      color: #1FA4FC;
    }
  }
  &__title{
    color: $content-font-color;
    font-size: 0.2rem;
    transform: scale(0.5,0.5);
    transform-origin: center top;
  }
}
</style>
