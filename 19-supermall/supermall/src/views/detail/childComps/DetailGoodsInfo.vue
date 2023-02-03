<!--商品详情信息-->
<template>
<div class="detailGoodsInfo" v-if="Object.keys(detailInfo).length !== 0">
  <div class="infoDesc">
    <hr>
    <p>
      {{detailInfo.desc}}
    </p>
    <hr class="right">

      <div class="key">{{detailInfo.detailImage[0].key}}</div>

    <ul>
      <li v-for="item in detailInfo.detailImage[0].list" class="infoItem">
        <img :src="item" @load = 'imageLoad'>
      </li>
    </ul>

  </div>
</div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('imageLoad')
    }
  }
}
</script>

<style scoped>
.infoDesc {
  margin: 10px 0;
  padding: 0 5px;
}
.infoDesc p {
  padding: 20px ;
  font-size: 15px;
}
.infoDesc hr {
  width: 30%;
  border-top: 1px solid #000000;
}
.infoDesc .right {
  float: right;
}
.key {
  border: 0;
  margin: 20px;
}
.infoItem img {
  width: 100%;
}
</style>