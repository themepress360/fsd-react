import React, { useState, useContext, useEffect } from 'react';
import PdpService from '../../service/pdp.service';
import {UserContext} from '../../context/usercontext';
import Loader from 'react-loader-spinner'
import SaveForLater from '../../container/save-for-later';
import withApp from '../../higherorder';
import { useForm } from "react-hook-form"; 
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
const schema = yup.object().shape({
    notifyemail: yup.string().email().required(),
});
const NotifyOutofStock = () =>{
    const { register, handleSubmit,errors } = useForm({
        resolver:yupResolver(schema)
    });
    const [notifyemail,setNotifyEmail] = useState('');
    const [notifyLoader,setNotifyLoader] = useState(false);

    const [message,setMessage] = useState('');
    const userContext = useContext(UserContext);
    useEffect(()=>{
        if(userContext.email && !notifyemail){
            setNotifyEmail(userContext.email);
        }
    },[userContext]);
    const notifyEmail = (data) =>{
        const pdpService = new PdpService({});
        setNotifyLoader(true);
        pdpService.notifyApi(notifyemail).then(res=>{
            setNotifyLoader(false);
            setMessage(res.message);
        }).catch(err=>{
            setNotifyLoader(false);
        })
    }
    const LoaderSpin = <div className="text-center my-1"> <Loader type="TailSpin" color="#546385"   height={30} width={30} /></div>
    const notifyEmailButton = notifyLoader ? LoaderSpin : !message && <button className="c-button c-button--primary c-button--full-width">Notify me when it's back</button>; 
    return (
        <div className="c-cart-box">
        <form onSubmit={handleSubmit(notifyEmail)} className="c-cart-box__container">
            <div className="c-cart-box__out-of-stock">
                <div className="c-cart-box__out-of-stock-icon">
                    <i className="icon__fsd icon__fsd--out-of-stock"></i>
                </div>
                <div className="c-cart-box__out-of-stock-title">Sorry, currently out of stock</div>
                {!message ? <div className="c-cart-box__out-of-stock-input">
                    <><input
                     //defaultValue={userContext.email}
                     value={notifyemail}
                     name="notifyemail"
                     ref={register}
                     onChange={(e)=>setNotifyEmail(e.target.value)} className="c-text-input c-text-input--no-border" type="text" placeholder="E-mail Address" />
                     <div className="text-danger pt-1">{errors.notifyemail && errors.notifyemail.message || null}</div>
                     </>
                </div> : ''}
            </div>
            <div className={`c-cart-box__ship-delivery-info ${message ? "c-cart-box__ship-delivery-info--success"  : ""}`}>
             {!message ? <p>Enter your email address below and we’ll send you a notification when it’s in stock.</p> : <p>Thank you. We will email you as soon as the item is available to order</p>}
            </div> 

            <div className="c-cart-box__action">
                {notifyEmailButton}
                <SaveForLater />
            </div>
         </form>
        </div>
    )
}
export default withApp(NotifyOutofStock);