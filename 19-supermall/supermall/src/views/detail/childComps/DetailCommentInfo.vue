<!--评论信息-->

<template>
<div class="commonInfo" v-if="Object.keys(commonInfo).length !==0">
  <header>
    <span>用户评价</span>
    <a href="#">更多></a>
  </header>


  <main>
    <div class="userInfo">
      <img :src="commonInfo.user.avatar" alt="">
      <span>{{commonInfo.user.uname}}</span>
    </div>
    <p class="styleInfo">已购商品：&nbsp;{{commonInfo.style}}</p>
    <p> {{commonInfo.content  }}</p>
    <div>
      <img :src="url" alt="" v-for="url in commonInfo.images" class="commonImg">
    </div>
    <span class="buyTime">{{commonInfo.created | showDate }}</span>
  </main>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils";

export default {
  name: "DetailCommoentInfo",
  props: {
    commonInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000);
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>

header {
  height: 44px;
  width: 100%;
  padding: 10px 20px;
  border-top: 10px  solid #eee;
  border-bottom: 1px solid #eee;
}
header a {
  float: right;
}
main {
  padding: 5px 20px;
}
.userInfo {
  height: 40px;
  line-height: 40px;
  color: black;
}
.userInfo span {
  font-weight: 600;
  font-size: 14px;
}
.userInfo img {
  height: 80%;
  border-radius: 50%;
  vertical-align:middle;
  margin-right: 10px;
}
.styleInfo {
  color: #babbc1;
}
.commonImg {
  width: 45%;
  height: 100px;
  overflow:hidden;
  margin-left: 3px;
  margin-bottom: 3px;
}
main p {
  margin: 8px 0;
  font-size: 14px;
}
.buyTime {
  color: #babbc1;
  font-size: 14px;
}

</style>