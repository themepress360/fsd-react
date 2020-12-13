import { axiosfsd, axiosUnbxd } from "./axios";
export default class UnbxdService{
    getRecommendations(page,productId,cartItems){
    //    if(!this.checkIfAvailable()) return;            
       // return new Promise((resolve, reject) => {
            let uid = "uid-1581431061965-42746";
            // let productId = '22996461';
            // let uid = 'uid-1581690840081-31092';
            // let url = `https://recommendations.unbxd.io/v2.0/${this.apiKey}/${this.siteKey}/cart-recommend/${uid}/?cont=unbxd_cart_recommendations&uid=${uid}&format=json`; 
            // ======== new api url static values
            // let url = `https://recommendations.unbxd.io/v2.0/${this.apiKey}/${this.siteKey}/items?pageType=CART&id=22996461&uid=uid-1581690840081-31092`;
            // ======== new api url get pid
            // let url = `https://recommendations.unbxd.io/v2.0/${this.apiKey}/${this.siteKey}/items?pageType=CART&id=${productId}&uid=${uid}`;
            // ======== new api url get uid
            let url = `/66f563656a4afc01b33fa3862bd0f0b2/mcstaging-foodservicedirect-com805741548149202/items?pageType=PRODUCT&uid=${uid}&id=21376280`;
            // if(cartItems){

            //     // cartItems.map(item=>{
            //     //     url =  `${url}&id=${item.sku}`;
            //     // })
            // }else{
            //     url = productId ? `${url}&id=${productId}` : url;
            // }
            axiosUnbxd.get(url).then(res=>{
                console.log(res);
            })
            // jsonp(url, {
            //     param: 'json.wrf'
            // },(err, data) => {
            //     if(err){
            //         this.handleError(err, reject);
            //         return;
            //     }
            //     // data.Recommendations = this.addSpecialPriceAvailableToProduct(data.Recommendations);
            //     // resolve(data);
            //     data.Recommendations = this.addSpecialPriceAvailableToProduct(data.widget1.recommendations);
            //     resolve(data);
            // });
        //})      
    }
}