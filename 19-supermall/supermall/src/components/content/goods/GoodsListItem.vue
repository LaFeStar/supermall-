<template>
<div class="GoodListItem" @click="itemClick">
  <img :src="showImage" alt="">
  <div class="goodsInfo">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{"¥:"+goodsItem.price}}</span>

    <span class="cfav"> <img src="@/assets/img/common/collect.svg" @load="itemImageLoad">
      {{goodsItem.cfav}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed :{
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    //@load 监听图片加载完成
    itemImageLoad() {
      this.$bus.$emit('itemImageLoad');
    },
    //商品点击跳转 监听事件
    itemClick() {
      this.$router.push('/detail/'+this.goodsItem.iid);
    }
  }
}
</script>

<style scoped>

.GoodListItem {
  width: 100%;
}
.GoodListItem img {
  width: 100%;
}
.GoodListItem p {
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
}

.goodsInfo {
  text-align: center;
  margin-bottom: 5px;
}

.goodsInfo .price {
  margin-right: 10px;
}
.cfav img {
  width: 15px;
}

</style>