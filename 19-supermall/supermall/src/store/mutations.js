export default {

    //mutations 最好只有单一方法，这样才有利于数据的监听
    // addCart(state,payload) {
    // state.cartList.push(payload);  直接添加会把商品整个数据添加五次，
    //正确的添加，应给每个 iid对应的商品，只在 cartList保存一次，里面有个属性count，
    // 用来保存添加数量
    /*let oldProduct = null;
    for (let item of state.cartList) {
      if( item.iid === payload.iid ) {
        oldProduct = item;
      }
    }*/
    //判读 同个id的物品是否存在，如果存在就只让属性 count+1，
    // 不存在，就将商品添加进数组，并将count属性赋值为1
    /*let oldProduct = state.cartList.find(item => item.iid === payload.iid);
    if(oldProduct) {
        oldProduct.count = oldProduct.count + 1;
    } else {
      payload.count = 1;
      state.cartList.push(payload);*/
    addCounter(state,payload) {
      payload.count++
    },

    addToCart(state,payload) {
      payload.checked = true;
      state.cartList.push(payload);
    }

  
}
