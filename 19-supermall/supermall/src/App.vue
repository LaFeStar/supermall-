<template>
  <div id="app">
    <keep-alive exclude="Detail">  <!--这里要排除Detail，不然点击商品进入详情页
    ，keep-alive会保存第一次点击进去的页面数据，不会刷新数据，当你再返回点击其他图片，依然是第一次保存的数据-->
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

export default {
  components: {
    MainTabBar
  }
}

</script>
<style>
@import "assets/css/base.css";

</style>
