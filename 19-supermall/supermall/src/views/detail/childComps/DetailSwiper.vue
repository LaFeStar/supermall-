<template>

    <swiper >
      <swiper-item v-for="item in topImages" class="itemImg" >
        <img :src="'http:'+item" class="showImg">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .itemImg {
    height: 200px;
    overflow: hidden;
  }
  .itemImg .showImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>