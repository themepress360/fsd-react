import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setOptionData } from '../../redux-store/actions/pdp.actions';
import PdpService from '../../service/pdp.service';
import withApp from '../../higherorder';
let firsttime = false;
const ColorChooser = () =>{
    const dispatch = useDispatch();
    const pdpConfigData = useSelector(state=>state.configurableOption,shallowEqual);
    const selectedConfigData = useSelector(state=>state.selectedConfigData,shallowEqual);
    if(!pdpConfigData.swatch_information) return null;
    const colorData = Object.values(pdpConfigData.swatch_information.attributes).find(attribute=>attribute.code.toLowerCase() === "color")
    if(!colorData) return null; 
    const selectColor = (index) => {
        const pdpService = new PdpService({dispatch});
        const id= Object.keys(pdpConfigData.child_information[colorData.id])[index];
        pdpService.setConfigDataToRedux(colorData.id,id,selectedConfigData,pdpConfigData);
    }
    return (
        <div className="c-color-chooser">
        <div className="c-color-chooser__container">
            <div className="c-color-chooser__title">
             {Object.values(pdpConfigData.child_information[colorData.id]).length} Colors:
             <span>{ selectedConfigData.selectedOption && selectedConfigData.selectedOption[colorData.id] ? pdpConfigData.child_information[colorData.id][selectedConfigData.selectedOption[colorData.id]].label : ''}</span>
            </div>
             <div className="c-color-chooser__items">
                {Object.values(pdpConfigData.child_information[colorData.id]).map((color,index)=>{
                    if(firsttime===false)  {selectColor(index);firsttime=true;}
                    return <div onClick={()=>selectColor(index)} key={index+"-"+color} className={`c-color-chooser__item ${ selectedConfigData.selectedOption && selectedConfigData.selectedOption[colorData.id] === Object.keys(pdpConfigData.child_information[colorData.id])[index]   ? "c-color-chooser__item--active" : ""}`}>
                        
                        <div style={{backgroundColor:color.value}} className="c-color-chooser__item-inner-circle"></div>
                    </div>
})}
                 
                 {/* <div className="c-color-chooser__item  c-color-chooser__item--orange">
                     <div className="c-color-chooser__item-inner-circle"></div>
                 </div>
                 <div className="c-color-chooser__item  c-color-chooser__item--manufacturer-lipton">
                     <div className="c-color-chooser__item-inner-circle"></div>
                 </div>
                 <div className="c-color-chooser__item c-color-chooser__item--purple  c-color-chooser__item--active">
                     <div className="c-color-chooser__item-inner-circle"></div>
                 </div> */}
             </div>
         </div>
     </div>
    )
}
export default withApp(ColorChooser);