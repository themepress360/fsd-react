import React, { useEffect, useState } from 'react';
import Rating from '../../container/rating';
import { useSelector, shallowEqual } from 'react-redux';
import NumberStepper from '../../container/number.stepper';
import AddToCartButton from '../../container/add-to-cart';
import withApp from '../../higherorder';
import ReactDOM from 'react-dom';
const StickyBar = ({method}) =>{
    
    const pdpData = useSelector(state=>state.pdpData,shallowEqual);
    //const 
    const priceData = useSelector(state=>state.pdpPrice,shallowEqual);
    const {formatPrice} = method;   
    const [showSticky,setShowSticky] = useState(false);
    const {product_review,name,sku,final_price,special_price,price,sold_as} = pdpData; 
    const {finalPrice} = priceData;

    useEffect(()=>{
              /* develblock:start */
              setShowSticky(true);
              /* develblock:end */
        if(window.FsdApp){
            setShowSticky(window.FsdApp.getController('layout').header.isShrink);
            window.FsdApp.getController('layout').header.addEventListener('shrink',()=>{
                setShowSticky(window.FsdApp.getController('layout').header.isShrink);
            });
        }
    },[])
    if (!showSticky) return null;
    return ReactDOM.createPortal(
        <div className="p-product-detail__sticky">
        <div className="c-product-shop-sticky-bar">
    <div style={{padding:'16px 16px'}} className="c-product-shop-sticky-bar__container container">
        <div className="c-product-shop-sticky-bar__caption">
            <div className="c-product-shop-sticky-bar__caption-title">{name}</div>
            <div className="c-product-shop-sticky-bar__caption-other">
                <div className="c-product-shop-sticky-bar__caption-stars">
                {product_review.rating_avg && <Rating rating={product_review.rating_avg}/> || null} 
                </div>
                <div className="c-product-shop-sticky-bar__caption-actions">
                    {product_review.rating_avg && <a href="#rating">{product_review.review_count} Review</a> || null}
                    {/* <a href="#">16 Answered Questions</a>
                    <a href="#">Compare</a> */}
                </div>
            </div>
        </div>
        <div className="c-product-shop-sticky-bar__cart">
            <div className="c-product-shop-sticky-bar__cart-price">
                <div className="c-product-shop-sticky-bar__cart-price-bar">
                    <span className="c-product-shop-sticky-bar__cart-price-current">{formatPrice(finalPrice.amount)}</span>
                    {special_price ? <span className="c-product-shop-sticky-bar__cart-price-nominal">{formatPrice(price)}</span> : ''}
                    <span className="c-product-shop-sticky-bar__cart-price-current-amount text-lowercase">/{sold_as}</span>
                </div>
            </div>
            <div json-product="" className="c-product-shop-sticky-bar__cart-shop">
                <div className="c-product-shop-sticky-bar__cart-quantity">
                    <NumberStepper />
                </div>
                <div className="c-product-shop-sticky-bar__cart-action">
                    <AddToCartButton />
                </div>
            </div>
        </div>
    </div>
</div></div>,document.body);
}
export default withApp(StickyBar);