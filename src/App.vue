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
    <div class="icons">
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/超市.png">
        <p class="icons__item__desc">超市便利</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/菜市场.png">
        <p class="icons__item__desc">菜市场</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/水果店.png">
        <p class="icons__item__desc">水果店</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/鲜花.png">
        <p class="icons__item__desc">鲜花绿植</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/医药健康.png">
        <p class="icons__item__desc">医药健康</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/家居.png">
        <p class="icons__item__desc">家居时尚</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/蛋糕.png">
        <p class="icons__item__desc">烘焙蛋糕</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/签到.png">
        <p class="icons__item__desc">签到</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/大牌免运.png">
        <p class="icons__item__desc">大牌免运</p>
      </div>
      <div class="icons__item">
        <img class="icons__item__img" src="./assets/红包.png">
        <p class="icons__item__desc">红包套餐</p>
      </div>
    </div>
    <div class="gap"></div>
    <div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <div class="nearby__item">
        <img class="nearby__item__img" src="./assets/near.png">
        <div class="nearby__content">
          <div class="nearby__content__title">沃尔玛</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">>起送¥0</span>
            <span class="nearby__content__tag">>基础运费¥5</span>
          </div>
          <p class="nearby__content__highlight">VIP尊享满89元减4元运费券（每月3张)</p>
        </div>
      </div>
      <div class="nearby__item">
        <img class="nearby__item__img" src="./assets/near.png">
        <div class="nearby__content">
          <div class="nearby__content__title">山姆会员超市</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售2000</span>
            <span class="nearby__content__tag">>起送¥0</span>
            <span class="nearby__content__tag">>基础运费¥5</span>
          </div>
          <p class="nearby__content__highlight">联合利华洗护满10减5</p>
        </div>
      </div>
      <div class="nearby__item">
        <img class="nearby__item__img" src="./assets/near.png">
        <div class="nearby__content">
          <div class="nearby__content__title">家乐福</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售5000</span>
            <span class="nearby__content__tag">>起送¥0</span>
            <span class="nearby__content__tag">>基础运费¥5</span>
          </div>
          <p class="nearby__content__highlight">绿箭口香糖满100减50</p>
        </div>
      </div>
      <div class="nearby__item">
        <img class="nearby__item__img" src="./assets/near.png">
        <div class="nearby__content">
          <div class="nearby__content__title">华润一家</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售1万+</span>
            <span class="nearby__content__tag">>起送¥10</span>
            <span class="nearby__content__tag">>基础运费¥0</span>
          </div>
          <p class="nearby__content__highlight">VIP尊享满100减10元代金券</p>
        </div>
      </div>
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
  box-shadow: 0 -0.01rem 0.01rem 0 $content-bgColor;
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
