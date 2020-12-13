import React, { useEffect } from 'react';
import { useState } from 'react';

export const CartContext = React.createContext(null);

const CartContextProvider = (props) =>{
    const [items,setItems] = useState([])
    useEffect(()=>{
        if(window.FsdApp){
            if(window.FsdApp.cartService.cart && window.FsdApp.cartService.cart.items){
                getCartDetails();
            }
            
            window.FsdApp.cartService.addEventListener('change',()=>getCartDetails());
        }

        /* develblock:start */
      
        /* develblock:end */
        
    },[]);  
    const getCartDetails = () =>{
            setItems(window.FsdApp.cartService.cart.items);
    }
    return (
        <CartContext.Provider value={items}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;