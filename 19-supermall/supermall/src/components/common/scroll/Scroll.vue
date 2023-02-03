<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    //document.querySelector('wrapper') 不推荐使用
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      click: true,  /* 这样设置才能监听div的点击 */
      pullUpLoad: this.pullUpLoad,  //配置是否有上拉加载更多
      // 最好自定义pullUpload的值，因为有的页面并不需要，那个页面需要在传值就可以

    });
        //监听滚动位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position);
        })
      }

      // 监听上拉加载更多  pullingUp和pullingDown事件分别对应上拉加载和下拉刷新动作触发事件，
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp'); //将此属性传递出去
        });
      }

  },

  methods: {
    scrollTo(x,y,time=300) {
     this.scroll && this.scroll.scrollTo(x,y,time)
      //调用方法之前，最好先判断下，this.scroll 这个实例是否存在，不然就无法执行它的下一步方法
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      console.log('refresh被调用了')
      this.scroll && this.scroll.refresh();
    }

  }
}
</script>

<style scoped>

</style>