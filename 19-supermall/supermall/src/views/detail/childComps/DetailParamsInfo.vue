<template>
<div class="paramsInfo" v-if="Object.keys(paramsInfo).length !== 0">
<table class="size">
  <tr v-for="row in paramsInfo.tables[0]">
    <td v-for="item in row">{{item}}</td>
  </tr>
 <p>{{paramsInfo.disclaimer}}</p>
</table>

  <table class="set">
    <tr v-for="item in paramsInfo.set">
      <td class="set_key">{{item.key}}:</td>
      <td class="set_value">{{item.value}}</td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style scoped>
.size {
  width: 100%; /*继承div的高度*/
  margin-bottom: 30px;
  text-align: center;
}

tr {
  display: flex;
  justify-content: space-evenly;
  width: 100%; /*继承table .size 的高度,要设置成百分比的模式，这样可以兼容多个界面 */
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #999;
}


 .size td {
  flex: 1;
  width: 100%;
}
.size p {
  text-align: left;
  font-size: 10px;
  margin: 10px 20px;
}
.set {
  width: 100%;
  padding-bottom: 50px;
}
.set tr{
  justify-content: left;
  border-bottom: none;
  font-size: 13px;
  padding-left: 20px;
}
.set_key {
  font-size: 14px;
  width: 50px;
}
.set_value {
 overflow: hidden;
  text-overflow: ellipsis;
}
</style>