import { axiosfsd } from "./axios";
import { setProductDetailData, setBreadcrumbs, setPDPConfigurable, setPDPPrice, setOptionData, setPDPImage } from "../redux-store/actions/pdp.actions";
import { IS_LOADING } from "../redux-store/constants";
import UnbxdService from "./unbxd.service";
const jsonData = document.getElementById('pdp-v2');
const sku = jsonData.getAttribute('data-sku');
export default class PdpService{
    static sku = sku;
    constructor(props){
        this.dispatch = props.dispatch;
        const jsonData = document.getElementById('pdp-v2');
        this.sku = jsonData.getAttribute('data-sku');
    }
    getBreadcrumbs(){
        axiosfsd.get(`/fsd/product-breadcrumb/${this.sku}`)
            .then(res=>{
                console.log(res.data[0]);
                this.dispatch(setBreadcrumbs(res.data[0]));
            }).catch(err=>{

        });
    }
    getPdpData(){
        this.dispatch({
            type: IS_LOADING,
        });
        this.getBreadcrumbs();
        // const unbxd=new UnbxdService();
        // unbxd.getRecommendations();
        axiosfsd.get(`/fsd/product/${this.sku}`)
            .then(res=>{
                console.log(res.data[0]);
                console.trace("---------+++++++++++++++");
                this.sendDataToRedux(res.data[0]);
                
            }).catch(err=>{
        });
    }
    configurableData(){
        axiosfsd.get(`fsd/product-configurable/${this.sku}`).then(res=>{
            this.dispatch(setPDPConfigurable(res.data[0]));
        }).catch(err=>{

        })
    }
    sendDataToRedux(product){
        if(product.product_type === "configurable"){
            this.configurableData();
        }
        
        const {final_price,special_price,tier_prices,gallery_image} = {...product};
        const price = {
            finalPrice : {
                amount:final_price
            },
            tierPrices:tier_prices
        } 
        this.dispatch(setPDPPrice(price));
        this.dispatch(setPDPImage(gallery_image));
        this.dispatch(setProductDetailData(product));   
    }
    notifyApi(email){
        return new Promise((resolve,reject)=>{
            axiosfsd.post(`/product/stocknotify`,{
                data:{sku:this.sku,email}
            }).then(res=>{
                resolve(res.data[0]);
            }).catch(err=>{
                reject(err);
            })
        })      
    }
    getProductinformation(){
        axiosfsd.get(`/fsd/product-information/${this.sku}`)
            .then(res=>{
                this.dispatch(setProductDetailData(res.data[0]));                   
            }).catch(err=>{
        });
    }
    setConfigDataToRedux(attribute_id,value,selectedConfigData,pdpConfigData){
        let selectData = {}; 
        selectData.selectedOption = {...selectedConfigData.selectedOption,[attribute_id]:value}  
        const attributes = {...pdpConfigData.swatch_information.attributes};
        const index = {...pdpConfigData.swatch_information.index};

        const getSku = Object.keys(attributes).every(key => Object.keys(selectData.selectedOption).includes(key));
        if(getSku){
            const selectedIndex = Object.values(index).findIndex((value)=>{
               return Object.values(value).every(value=>Object.values(selectData.selectedOption).includes(value));    
            })
            const sku = Object.keys(index)[selectedIndex];
            selectData.sku = sku ;
            this.dispatch(setPDPPrice(pdpConfigData.swatch_information.optionPrices[sku]));
            if(pdpConfigData.swatch_information.images[sku])
                this.dispatch(setPDPImage({data:pdpConfigData.swatch_information.images[sku][0],id:sku}));
        }
        if(selectData.selectedOption){
            let configurable_item_options = [];
            Object.keys(selectData.selectedOption).map(option_id=>{
                let item = {option_id,option_value:selectData.selectedOption[option_id]}
                configurable_item_options.push(item);
            })
            window.productItem.item.product_option = {
                "extension_attributes": {
                    configurable_item_options
                }
            }
        }
        console.log(selectData.selectedOption,'testttttttt');

        this.dispatch(setOptionData(selectData));
    }
    similarProducts(){
        return new Promise((resolve,reject)=>{
        axiosfsd.get(`/fsd/product-similarproducts/${this.sku}`)
            .then(res=>{
                if(res.data[0] && res.data[0].products){
                    resolve(res.data[0].products);
                }
                //this.dispatch(setProductDetailData(res.data[0]));                   
            }).catch(err=>{
        });
        });
    }
}