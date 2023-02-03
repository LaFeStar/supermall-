<template>
    <div id="home">

      <nav-bar class="home-nav"><div slot="center">蘑菇街</div></nav-bar>

      <scroll class="content"
              ref="scroll"
              :probe-type = 3
              @scroll = 'contentScroll'
              :pull-up-load = "true"
              @pullingUp = 'upLoad'
      >
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :title="['流行','新款','精选']" @itemClick = "itemClick"></tab-control>
        <goods-list :goods="goods[currentType].list"></goods-list>
      </scroll>

      <back-top @click.native = "backClick"
                :class="{'show':isShow}"
      ></back-top>
    </div>

</template>

<script>
//将不同引用组件用空格隔开加以区分，维护起来，容易区分
import {debounce} from "@/common/utils";

//components/common 中的组件
import Scroll from "@/components/common/scroll/Scroll";


//components/content 中的组件
import navBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import BackTop from "@/components/content/backTop/BackTop";

// home/childComps 中的组件
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import GoodsList from "@/components/content/goods/GoodsList";

//请求网络数据
import {getHomeMultidata,getHomeGoods} from "@/network/home";



export default {
  name: "Home",
  components: {
    Scroll,
    navBar,
    TabControl,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      scroll: null,
      isShow: false, /* 控制上拉图标是否显示 */
      saveY: 0
    }
  },

    activated() { //页面加载时，在将页面滚动到，失活状态时的位置
     this.$refs.scroll.scrollTo(0,this.saveY,0);
     this.$refs.scroll.refresh();
    },
    deactivated() {  //页面失活时，记录当前位置
      this.saveY = this.$refs.scroll.scroll.y;

  },
  created() {
    //钩子函数里面最好只做调用，将函数封装到methods，再来这里调用
    this.getHomeMultidata();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {
    //监听图片加载完成 ，完成后调用 this.$refs.scroll.refresh();方法，就可以更新 scrollHeight，解决
    //betterScrool 无法第一时间获取所有图片高度，此时定义的滚动高度，会过短，导致滚动距离变短，造成卡顿
    const refresh = debounce( this.$refs.scroll.refresh,200)
    this.$bus.$on('itemImageLoad',() => {
      refresh();
    })
  },
  methods: {
    //防抖函数 debounce

    itemClick(index) {
      switch (index) {
        case 0 :
          this.currentType = 'pop'
          break
        case 1 :
         this.currentType = 'new'
          break
        case 2 :
          this.currentType = 'sell'
          break
      }

    },
    backClick() {
       this.$refs.scroll.scrollTo(0,0);
    },
    //控制上拉图标显示隐藏
    contentScroll(position) {
      // console.log(position);
      this.isShow = (-position.y) >= 800;
    },

    //上拉加载更多
    upLoad() {
      this.getHomeGoods(this.currentType);
    },

    /*网络请求的代码*/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
         console.log(res);  //{_id: '5bac3f5651aef21ad4c68e3c', data: {…}, returnCode: 'SUCCESS', success: true}
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    //请求商品数据
    getHomeGoods(type) {  //这里获取页面类型
      //这里最好动态获取页面的页数，因为不同分类有多个页面，如果写死，就无法获取其他页面数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
       // console.log(res);
        this.goods[type].list.push(...res.data.list);
        //获取完一页数据后，要将页码加一
        this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();  //调用scroll中的 finishPullUp方法 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
      });
    }

  },


}
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  height: 100vh; /*100% 视图高度*/
}
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    /*left right top 为0，是为了设置位置，让元素固定在窗口顶端，不设置元素会跟随轮播图一起 */
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

.content {
  height: calc(100vh - 94px); /*视图高度 - 上下标题栏的高度 */
}

.show {
  display: block;
}

</style>
