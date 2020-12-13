import React, { useEffect, useState } from 'react';
import CartService from '../service/cart.service';
import Loader from 'react-loader-spinner'

const AddToCartButton = () =>{
    const [loader,setLoader] = useState(false);
    useEffect(()=>{
        if(window.FsdApp){
            window.FsdApp.cartService.addEventListener('change',()=>{
                setLoader(false);
            });
        }
        document.addEventListener('add-to-cart',()=>{
             setLoader(true);
        });
    },[])
    const addToCart = () =>{
        const cartService = new CartService();
        cartService.addToCart();
    }
    const LoaderSpin = <div className="text-center my-1"> <Loader type="TailSpin" color="#546385"   height={30} width={30} /></div>

    return loader ?
        LoaderSpin :
        <button onClick={()=>addToCart()} className="c-button c-button--primary">Add to Cart</button>
    
}
export default AddToCartButton;