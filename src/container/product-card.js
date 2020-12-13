
import React, { useContext, useState, useEffect } from 'react';
import withApp from '../higherorder';
import { CartContext } from '../context/cartcontext';
const ProductCard = ({ product, method }) => {
    const { name, final_price, ships_in_label, url ,image,sku } = product;
    const { formatPrice } = method;
    const [loader,setloader] = useState(false);
    console.log('sadasdsa');
    const items = useContext(CartContext);
    console.log(items,'sdasdsads');
    const cartItem = items.find(item => item.sku === sku);
    const isAdded = cartItem ? true : false; 
    useEffect(()=>{
        if(loader) setloader(false)
    },[items]);
    const addRemoveCart = ()=>{

        if(window.FsdApp){
                setloader(true);
                if(isAdded){
                    window.FsdApp.cartService.removeFromCart(cartItem.item_id).then(()=>{
                        //setloader(false);
                    }).catch(err=>setloader(false));
                }else{
                    window.FsdApp.cartService.addToCart(product,1).then(()=>{
                        //setloader(false);
                    }).catch(err=>setloader(false));
                }
                
        }
    }
    return (
        <div data-load="true" className={`c-product-card ${isAdded ? 'c-product-card--added-to-cart' : ''}`}>
            <div className="c-product-card__container">
                <div className="c-product-card__preview">
                    <div href={url} className="c-product-card__preview-slider">
                        <div className="c-preview-image-slider">
                            <div className="c-preview-image-slider__container swiper-container">
                                <div className="c-preview-image-slider__content swiper-wrapper">
                                    <div className="c-preview-image-slider__slide swiper-slide">
                                        <img src={image} alt={name
                                        } /></div>
                                </div>

                                <div className="c-preview-image-slider__pagination swiper-pagination">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="c-product-card__content">
                    <div className="c-product-card__title">
                        <a href={url}>{name}</a>
                    </div>
                    <div className="c-product-card__ship-info">
                        <span className="   ">{ships_in_label}</span>
                        {/* <span className="c-product-card__ship-info-no-shipping-badge">NO SHIPPING</span> */}
                    </div>
                    <div className="c-product-card__footer">
                        <div className="c-product-card__footer-left">
                            <div className="c-product-card__price">
                                <span className="c-product-card__price-current">{formatPrice(final_price)}</span>
                                {/* <span className="c-product-card__price-old">{'@@price'}</span> */}
                            </div>
                            {/* @@if(typeof tierInfo !== 'undefined') {
                        <div className="c-product-card__tier-info">
                            <p>Buy more save more</p>
                        </div>
                    } */}
                        </div>
                        <div className="c-product-card__footer-right">
                            <button onClick={()=>addRemoveCart()} className={`c-product-card__add-button c-button c-button--icon ${loader ? 'c-button--processing' : ''}`}></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withApp(ProductCard);