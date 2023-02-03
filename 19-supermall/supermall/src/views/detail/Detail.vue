<template>
<div class="detail">
  <detail-nav-bar class="d-navBar" @titleClick="titleClick" ref="nav"/>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods" ></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <DetailGoodsInfo :detailInfo="detailInfo" ref="goods"></DetailGoodsInfo>
    <detail-params-info :paramsInfo="paramsInfo" ></detail-params-info>
    <detail-comment-info :commonInfo="commonInfo" ref="comments"></detail-comment-info>
    <goods-list :goods = 'recommends' class="recommendList" ref="recommends"/>
  </scroll>
  <detail-bottom-bar @addToClick = 'addToCart'/>
  <back-top @click.native = "backClick"
            :class="{'show':isShow}"
  />
</div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamsInfo from "@/views/detail/childComps/DetailParamsInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backTop/BackTop";

import Scroll from "@/components/common/scroll/Scroll";

//请求网络数据
import {getDetail,getRecommend, Goods, Goodsparams, Shop} from "@/network/detail";

import DetailSwiper from "@/views/detail/childComps/DetailSwiper";

//因为推荐商品的布局和 goods封装的组件布局类似，可以直接复用
import GoodsList from "@/components/content/goods/GoodsList";
import {debounce} from "@/common/utils";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commonInfo: {},
      recommends: [],
      //设置一个新数组，用来存放各个参数所对应的页面高度
      pageTopY: [],
      getPageTopY: null,
      currentIndex: 0,
      isShow: false, /* 控制上拉图标是否显示 */

    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop

  },
  created() {
    //保存 传入的 iid
    this.iid = this.$route.params.iid;
    // 根据 iid 获取相应的数据
    getDetail(this.iid).then(res => {
      console.log(res)
      // {_id: '5bacc8d551aef27fecf48b7c', status: {…}, result: {…}, iid: '1m745k0'}
      // 每次传递都要写 res.result，最好将其封装起来
      const data = res.result;
      this.topImages = data.itemInfo.topImages;//根据获取到的实例，获取对应的图片a

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //创建店铺商品信息类
      this.shop = new Shop(data.shopInfo);

      //获取商品详细信息
      this.detailInfo = data.detailInfo;

      //商品尺码信息
      this.paramsInfo = new Goodsparams(data.itemParams.info, data.itemParams.rule);

      //获取用户评论信息
      if (data.rate.cRate !== 0) {
        this.commonInfo = data.rate.list[0];
      }


    });
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list;
    })


      this.getPageTopY = debounce(() => {
        console.log('---------')
            if(this.$refs.goods && this.$refs.comments && this.$refs.recommends) {
              this.pageTopY = [];
              this.pageTopY.push(0)
              this.pageTopY.push(this.$refs.goods.$el.offsetTop);
              this.pageTopY.push(this.$refs.comments.$el.offsetTop);
              this.pageTopY.push(this.$refs.recommends.$el.offsetTop);
              this.pageTopY.push(Number.MAX_VALUE);
              console.log(this.pageTopY);
            }
      })


  },
  mounted() {
    //解决图片加载慢，导致滚动距离不是所有图片加载完后的高度，导致滚动一半就无法滚动了
    const detailRefarch = debounce(this.$refs.scroll.refresh, 200); //防止调用过于频繁
    this.$bus.$on('imageLoad', () => {
      detailRefarch();

      // 这里不用回调函数，直接调用会多次多次调用影响性能，最好用 debounce函数做个疯转
      /* this.pageTopY = [];
      this.pageTopY.push(0)
      this.pageTopY.push(this.$refs.goods.$el.offsetTop);
      this.pageTopY.push(this.$refs.params.$el.offsetTop);
      this.pageTopY.push(this.$refs.recommends.$el.offsetTop);*/

      this.getPageTopY();

    })
  },
  methods: {
    titleClick(index) {
      //console.log(index);
      /*调用scrollTo方法，设置一个数组保存对应页面的高度，每个页面标题，有对应的index，只要在这个数组
      在保存高度的数组，放对应的高度，就可以了，
      难点就是如何获取
      首先给每个页面绑定，唯一的ref，这样就能准确获取到元素，通过 querySelecter ，如果有重复名，不太准确
      高度的获取，一定要在所有图片加载完毕，所以在 created 中获取不太准取
      在监听 图片加载完成，并刷新数据的里面就比较合适
      */

      this.$refs.scroll.scrollTo(0, -this.pageTopY[index], 300)
    },
    //监听页面滚动，滚动到对应位置，页面的标题栏切换到对应的 标题
    contentScroll(position) {
      //获取传过来的y值,由于传过来的值为负数，最好取反，更容易进行接下来的比较
      let positionY = -position.y;
      let length = this.pageTopY.length;
      for (let i = 0; i < length - 1; i++) {
        // console.log(this.pageTopY[i]);
        if (this.currentIndex !== i && (positionY >= this.pageTopY[i] && positionY < this.pageTopY[i+1])) {
          console.log(i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;

          //
          this.isShow = (positionY >= 800);
        }

      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0);
    },
    //控制上拉图标显示隐藏

      // console.log(position);

    //点击加入购物车
    addToCart() {
      console.log('加入购物车');
      //将数据封装，穿给购物车页面
      const product = {};
      product.desc = this.goods.desc;
      product.image = this.topImages[0];
      product.iid = this.iid;
      product.price = this.goods.newPrice;
      product.title = this.goods.title;

      // console.log(this.goods);

      //将数据穿给vuex
      // this.$store.commit('addCart',product);
      this.$store.dispatch('addCart',product);
    }
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 40;
  background-color: #fff;
  height: 100vh;
}
.content {  /*scroll的类*/
  height: calc(100vh - 44px);
}
.d-navBar {
  z-index: 50;
  position: relative;
  background-color: white;
}
.recommendList {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 10px solid #eee;
}
.show {
  display: block;
}

</style>