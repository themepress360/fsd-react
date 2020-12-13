import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setOptionData } from '../../redux-store/actions/pdp.actions';
import PdpService from '../../service/pdp.service';
import withApp from '../../higherorder';
let firsttime = false;
const ProductSize = () =>{
    const dispatch= useDispatch();
    const pdpConfigData = useSelector(state=>state.configurableOption,shallowEqual);
    const selectedConfigData = useSelector(state=>state.selectedConfigData,shallowEqual);
    if(!pdpConfigData.swatch_information) return null;
    const sizeData = Object.values(pdpConfigData.swatch_information.attributes).find(attribute=>attribute.code.toLowerCase() === "sizes");
    if (!sizeData) return null;
    console.log(selectedConfigData);  
    const selectSize=(index)=>{
        const pdpService = new PdpService({dispatch});
        const id= Object.keys(pdpConfigData.child_information[sizeData.id])[index];
        pdpService.setConfigDataToRedux(sizeData.id,id,selectedConfigData,pdpConfigData)
    }
    return (
        <div className="c-product-shop-box__product-size">
        <div className="c-product-shop-box__product-size-title">3 Sizes</div>
        <div className="c-product-shop-box__product-size-select">
            <div className="c-selectbox">
                <select onChange={(e)=>selectSize(e.target.value)}>
                    {Object.values(pdpConfigData.child_information[sizeData.id]).map((size,index)=>{
                        if(firsttime===false)  {selectSize(index);firsttime=true;}
                            return <option value={index} key={index+"-"+size}>{size.label}</option>
                        })}
                </select>
            </div>
        </div>
        {/* <div className="c-product-shop-box__product-size-info">$18.69 ($2.21 / Fl Oz)</div> */}
    </div> 
    )
}
export default withApp(ProductSize);