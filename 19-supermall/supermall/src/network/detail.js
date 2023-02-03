import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

//获取商品推荐信息
export  function getRecommend (){
  return request({
    url:'/recommend'
  })
}


//创建 Goods类用来封装 商品详情信息，DetailBaseInfo中的数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice

  }
}

//封装店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

//封装商品参数信息
export class Goodsparams {
  constructor(info,rule) {
    this.set = info.set;
    this.tables = rule.tables;
    this.disclaimer = rule.disclaimer;
  }
}