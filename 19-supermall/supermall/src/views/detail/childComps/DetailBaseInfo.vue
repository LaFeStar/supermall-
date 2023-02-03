<!--轮播图下方商品详情信息的封装-->

<template>
<div class="baseInfo" v-if="Object.keys(goods).length !== 0">
  <!--标题栏-->
  <div>{{goods.title}}</div>

  <!--价格  -->
  <div class="showPrice">
    <span class="n-price">{{goods.newPrice}}</span>
    <span class="o-price">{{goods.oldPrice}}</span>
    <span class="discount">{{goods.discount}}</span>
  </div>

  <!-- 销量等信息 -->
  <ul class="info-service">
    <li class="service-item">{{goods.columns[0]}}</li>
    <li class="service-item">{{goods.columns[1]}}</li>
    <li class="service-item">{{goods.services[goods.services.length-1].name}}</li>
  </ul>

<!--物流信息-->
  <div class="info-logistics">
    <div v-for="index in goods.services.length-1" class="otherItem">
      <img :src="goods.services[index-1].icon" alt="">
      <span>{{goods.services[index-1].name}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.baseInfo {
  padding: 10px 5px;
}
.showPrice {
  margin-top: 10px;
  position: relative;
}
.n-price {
  font-size: 20px;
  color: #f95774;
}
.o-price {
  color: #dadada;
  text-decoration: line-through;
  font-size: 13px;
  margin:0 5px;
}
.discount {
  position: absolute;
  top: -5px;
  background: #f95774;
  color: white;
  border-radius: 10px;
  padding: 3px;
  font-size: 10px;
}
.info-service {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

}
li {
  font-size: 13px;
  list-style: none;
  color:#9e9e95;
}

.info-logistics{
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-top:10px;
}
.otherItem {
  height: 40px;
  line-height: 40px;


}
.otherItem img{
  width: 13px;
}
</style>