<template>
<div class="backTop">
  <img src="@/assets/img/common/top.png" alt="">
</div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    /*backClick() {
      // document.body.scrollTop = document.documentElement.scrollTop = 0;
      // 因为页面信息包含在scroll组件内，这个按钮没包含在scroll组件内，直接写这样返回到顶底是当前视图的顶点，
      // 要向让页面回到原始顶点，就要想办法将控制scroll里面信息回到顶点


    }*/
  }
}
</script>

<style scoped>
.backTop {
  position: fixed;
  bottom: 55px;
  right: 12px;
  z-index: 10;
  opacity: .9;
  display:none;
}
.backTop img {
  width: 43px;
}
</style>