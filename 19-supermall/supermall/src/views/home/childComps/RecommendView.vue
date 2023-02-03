<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {

  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 14px;
  width: 100%;
  padding: 10px  15px 20px 15px;
  border-bottom: 8px solid #eee;

}

.recommend-item img {
  height: 65px;
  width: 65px;
}
</style>