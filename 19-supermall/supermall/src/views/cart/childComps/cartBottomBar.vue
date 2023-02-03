<template>
<div class = "bottomBar">
  <div class="checxed-content">
    <check-button class="checkedButton" :is-checked="checkedAll" @click.native="checkedClick"/>
    <span>全选</span>
  </div>
  <span class="allPrice">合计：￥{{ totalPrice }}</span>
  <div class="toCom">
    去计算({{list.length}})
  </div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex"
export default {
  name: "cartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
    totalPrice() {
      return this.list.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    checkedAll() {
      if(this.list.length === 0) return false;
      //filters
      // return !(this.list.filter(item => !item.checked).length)
      //find遍历
       // return !this.list.find(item => !item.checked)

      //普通循环遍历
      for(let item of this.list){
        if(!item.checked){ //有暗流没被选中，item.checked 才会为 false,取反才为true，执行 return false
          return false;
        }
        return true;
      }
    }
  },
  methods: {
    checkedClick() {
      console.log('------')
      if(this.checkedAll) {
        this.list.forEach(item => item.checked = false)
      } else {
        this.list.forEach(item => item.checked = true)
      }
    }
  },

}
</script>

<style scoped>
.bottomBar {
  height: 49px;
  line-height: 49px;
  background-color: #eee;
  display: flex;
}
.checkedButton {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  line-height: 0;
    margin: 0 8px 0 15px;
}
.allPrice {
  flex: 1;
  margin-left: 20px;
}
.toCom {
  width: 100px;
  text-align: center;
  display: inline-block;
  float: right;
  background-color: palevioletred;
  color: white;
}
</style>