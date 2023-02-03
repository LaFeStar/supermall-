<template>
<div class="DetailNavBar">
  <nav-bar>
    <div slot="left" class="back" @click="goBackClick">
      <img src="@/assets/img/common/back.svg" alt="">
    </div>
    <ul slot="center" class="tittle">
      <li v-for = "(item,index) in tittle"
         @click = "itemClick(index)"
          :class = "{active: currentIndex === index}"
      >{{item}}</li>
    </ul>
  </nav-bar>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      tittle: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      //将点击的 index 发送给detail页面
      this.$emit('titleClick',index);
    },
    goBackClick() {
      this.$router.back();
    }
  }

}
</script>

<style scoped>

ul {
  display: flex;
}
li {
  flex: 1;
  list-style: none;
  font-size: 14px;
}
.active {
  color: hotpink;
}
.back {
  display: flex;
  height: 44px;
}
.back img {
  margin: auto;
}
</style>