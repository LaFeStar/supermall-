<template>
  <div class="shopInfo">
    <div class="shopImg">
      <img :src="shop.logo" alt="">
      <p>{{shop.name}}</p>
    </div>

    <div class="s-Info">
      <ul class="info-left">
          <li>
            <h3>{{shop.sells | sellCountFilter}}</h3>
            <span>总销量</span>
          </li>
          <li>
            <h3>{{shop.goodsCount}}</h3>
            <span>全部宝贝</span>
          </li>
      </ul>
      <ul class="info-right">
          <tr v-for="item in shop.score">
            <td>{{item.name}} </td>
            <td class="lowColor" :class="{heightColor: item.isBetter}">{{item.score}}</td>
            <td class="infoText" :class="{heightBColor: item.isBetter}">{{item.isBetter ? '高':'低'}}</td>
          </tr>
      </ul>
    </div>

    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isBetter: true
    }
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>
.shopInfo {
  border-bottom: 10px solid #eee;
  padding:10px 0 76px 0;
}
  .shopImg {
    position: relative;
    margin-left: 20px;
    font-size: 14px;
    color: black;
  }
  .shopImg img{
    width: 50px;
    height: 50px;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  .shopImg p {
    position: absolute;
    top: 20px;
    left: 55px;

  }

  .s-Info {
    display: flex;
    margin-top:10px ;
  }
  .s-Info ul {
    flex: 1;
    width: 100%;
    padding:0 30px;
  }

  .info-left {
    border-right: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }
  .info-left li {
   padding-top: 8px;
    text-align: center;
  }
  .info-left li h3 {
    margin: 8px 0;
  }
  .info-left li span {
    font-size: 13px;
  }

  tr {
    display: block;
    width: 100%;
    position: relative;
    margin-bottom: 3px;
  }
  tr td {
    padding-right:10px;
  }


  .infoText {
    position: absolute;
    color: white;
    top: 0;
    right: -8px;
    padding: 0;
    background-color: #42b983;
  }

  .lowColor {
    color: #42b983;
  }
  .heightColor{
    color: #e80000;
  }
  .heightBColor {
    background-color: #e80000;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 35px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>