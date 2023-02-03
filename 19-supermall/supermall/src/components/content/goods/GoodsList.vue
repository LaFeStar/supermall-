<template>
  <div class="goods">
<!--    这里的item为一大堆数据，将数据传给 子组件 gooodsListItem-->
<goods-list-item v-for="item in goods" :goods-item="item" class="goodsItem"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
 .goods {
   display: flex;
   width: 100%;
   justify-content: space-evenly;
   flex-wrap: wrap;
 }
 .goodsItem {
   width: 45%;
 }

</style>