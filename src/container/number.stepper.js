import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setAddtoCartQty } from '../redux-store/actions/pdp.actions';
const NumberStepper = () =>{
    const pdpData = useSelector(state=>state.pdpData,shallowEqual);
    const addtocartQty = useSelector(state=>state.addtocartQty,shallowEqual);
    const dispatch = useDispatch();
    const {min_sale_qty,max_sale_qty} = pdpData;
    useEffect(()=>{
        if(min_sale_qty !== 1){
            dispatch(setAddtoCartQty(min_sale_qty));
        }
    
    },[]) 
    const addminusQty = (type,qty) =>{
        let newValue = type ==="input" ? qty : addtocartQty + (type=== "add" ? 1 : -1) ;
        newValue = newValue > min_sale_qty ? newValue : min_sale_qty;
        newValue = newValue < max_sale_qty ? newValue : max_sale_qty;
        dispatch(setAddtoCartQty(newValue));
    }
    return (
        <div className="c-number-stepper">
        <div className="c-number-stepper__container">
            <span className="c-number-stepper__decrease">
                <i onClick={()=>addminusQty('sub')} className="icon__fsd icon__fsd--quantity-minus"></i>
            </span>
            <div className="c-number-stepper__input">
                <input onChange={(e)=>addminusQty('input',e.target.valueAsNumber)} type="number" value={addtocartQty}  min={min_sale_qty} max="999" />
            </div>
            <span className="c-number-stepper__increase">
                <i onClick={()=>addminusQty('add')} className="icon__fsd icon__fsd--quantity-plus"></i>
            </span>
        </div>
        </div>
    )
}
export default NumberStepper;