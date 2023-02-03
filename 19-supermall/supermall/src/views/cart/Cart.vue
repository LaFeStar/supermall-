<template>
  <div id="cart">
    <nav-bar>
      <!--  引入数据过长，而且不能被其他组件调用，最好使用computed属性封装
         <div slot="center" class="cartNav">购物车({{this.$store.state.cartList.length}})</div>-->
      <div slot="center" class="cartNav">购物车({{length}})</div>
    </nav-bar>

<!--    <ul class="goodsList">
      <li v-for="item in list" class="goodsItem">
        <div class="goodsInfoLeft">
          <img :src="item.image" alt="">
        </div>

        <div class="goodsInfoRight">
            <p>{{item.desc}}</p>
            <p>{{item.title}}</p>
            <div>
              <span>{{item.price}}</span>
              <span>{{item.count}}</span>
            </div>
        </div>
      </li>
    </ul>-->
    <cart-list class="cart-list" :cart-list="list"></cart-list>
    <cart-bottom-bar class="cartBottomBar"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"; //导航栏
import CartList from "@/views/cart/childComps/CartList";
import cartBottomBar from "@/views/cart/childComps/cartBottomBar";
import {mapGetters} from "vuex"


  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      cartBottomBar
    },
    computed: {
      // ...mapGetters(["cartList",'cartLength']) //原名的解构

      //自定义键值对解构
      // 自定义名称： "getter中的属性名"
      ...mapGetters({
        length: "cartLength",
        list: "cartList",
     /*   cartList() {
          return this.$store.getters.cartList
        },
        cartCount() {
          return this.$store.getters.cartCount
        }*/
})
    }
  }
</script>

  <style scoped>
  .cartNav {
    width: 100%;
    color: white;
    background-color: #f48a91;
    font-size: 18px;
  }

  #cart {
    /*position: relative;*/
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }

  .cartBottomBar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
  }
  </style>
