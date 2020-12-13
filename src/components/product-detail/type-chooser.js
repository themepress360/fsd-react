import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import withApp from '../../higherorder';
import PdpService from '../../service/pdp.service';
let firsttime =false;
const TypeChooser = () => {
    const dispatch = useDispatch();
    const pdpConfigData = useSelector(state => state.configurableOption, shallowEqual);
    const selectedConfigData = useSelector(state => state.selectedConfigData, shallowEqual);

    if (!pdpConfigData.swatch_information) return null;
    const flavour = Object.values(pdpConfigData.swatch_information.attributes).find(attribute => attribute.code.toLowerCase() === "flavors");
    console.log(flavour, 'flavour');
    const selectFlavour = (index) => {
        const pdpService = new PdpService({ dispatch });
        const id = Object.keys(pdpConfigData.child_information[flavour.id])[index];
        console.log(id,flavour.id);
        pdpService.setConfigDataToRedux(flavour.id, id, selectedConfigData, pdpConfigData);
    }
    if (!flavour) return null;
    return (
        <div className="c-type-chooser">
            <div className="c-type-chooser__container">
                <div className="c-type-chooser__title">
                    {Object.values(pdpConfigData.child_information[flavour.id]).length} Flavors
        </div>
                <div className="c-type-chooser__items">
                    {Object.values(pdpConfigData.child_information[flavour.id]).map((flavourObj, index) => {
                        if(firsttime===false)  {selectFlavour(index);firsttime=true;}
                        return <div onClick={()=>selectFlavour(index)}  className={`c-type-chooser__item ${selectedConfigData.selectedOption && selectedConfigData.selectedOption[flavour.id] === Object.keys(pdpConfigData.child_information[flavour.id])[index] ? 'c-type-chooser__item--active' : ''} `}>
                            <div className="c-type-chooser__item-text" >
                                {flavourObj.label}
                            </div>
                        </div>
                        })}
                </div>
            </div>
        </div>
    )
}
export default withApp(TypeChooser);