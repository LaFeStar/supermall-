<!--底部导航栏-->
<template>
<div class="bottomBar">
  <ul class="item-left">
    <li class="service">
      <span></span>
      <p>客服</p>
    </li>
    <li class="store">
      <span></span>
      <p>店铺</p>
    </li>
    <li class="collect">
      <span></span>
      <p>收藏</p>
    </li>
  </ul>
  <ul class="item-right">
    <li class="shoppingCart" @click="addToCart">
      <span >加入购物车</span>
    </li>
    <li class="buy">
      <span>购买</span>
    </li>
  </ul>

</div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addToClick')
    }
  }
}
</script>

<style scoped>
.bottomBar {
  height: 49px;
  line-height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  box-shadow: 0 1px 2px 1px #eee ;
}
ul {
  flex: 1;
  display: flex;
}
li {
  flex: 1;
  text-align: center;
}
.item-left {
  padding-top: 2px;
  line-height: 16px;
}
.item-left span {
  display: inline-block;
  width: 22px;
  height: 22px;
  background: url(../../../assets/img/detail/detail_bottom.png) no-repeat;
  background-size: 100%;
}
.item-left p {
  height: 15px;
}
.service span {
  background-position: 0 -52px;
}
.store span {
  background-position: 0 -98px;
}
.collect span {

}
.item-right .shoppingCart {
  background-color: #f7e010;
}
.item-right .buy {
  background-color: #ef748e;
  color: white;
}
</style>