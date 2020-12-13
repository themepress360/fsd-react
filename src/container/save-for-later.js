import React, { useEffect, useState, useContext } from 'react';
import Loader from 'react-loader-spinner'
import { UserContext } from '../context/usercontext';
import PdpService from '../service/pdp.service';

const SaveForLater = () =>{
    const [loader,setLoader] = useState(false);
    const userContext = useContext(UserContext);

    const saveforLaterClick = () =>{
        if(window.FsdApp){
            setLoader(true);
            window.FsdApp.wishlistService.wishlistApi('post', 'additem', { sku: PdpService.sku, qty: 1}).then(res=>{
                setLoader(false);
            }).catch(err=>{
                setLoader(false);
            });
        }
    } 
    const LoaderSpin = <div className="text-center my-1"> <Loader type="TailSpin" color="#546385"   height={30} width={30} /></div>
    const saveForLater = loader ? LoaderSpin : !userContext.isGuestUser && <a onClick={()=>saveforLaterClick()} href="javascript:void(0)" className="c-cart-box__action-save-later">Save for later</a> ;

    return saveForLater;
    
}
export default SaveForLater;