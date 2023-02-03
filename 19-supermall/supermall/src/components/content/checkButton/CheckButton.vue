<template>
 <div class="checkButton" :class="{'checked':isChecked}">
   <img src="../../../assets/img/cart/tick.svg" alt="">
 </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default( ) {
        return false
      }
    }
  }
}
</script>

<style scoped>
/*.checkButton {
  border-radius: 50%;
}*/
.checkButton {
  border-radius: 50%;
  border: 2px solid #9e9e95;
}
.checked {
  background-color: #c81623;
  border: 2px solid  #c81623;

}
</style>