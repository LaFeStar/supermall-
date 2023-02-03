<template>
<div class="control">
  <div v-for="(item,index) in title" class="control-item"
       :class="{active: index === activeIndex}"
       @click="tabClick(index)">
        <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      activeIndex: 0,

    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    tabClick(index) {
      this.activeIndex = index;
      this.$emit('itemClick',index);
    }
  }

}
</script>
<style scoped>
  .control {
    display: flex;
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    position: sticky;
    top: 44px;
    background-color: white;
  }
  .control-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);

  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
    padding: 5px 10px;
  }

</style>