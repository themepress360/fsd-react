import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import NumberStepper from '../../container/number.stepper';
import { addtocartQty } from '../../redux-store/reducers/pdp.reducer';
import ToolTip from './tooltip'
import AddToCartButton from '../../container/add-to-cart';
import SaveForLater from '../../container/save-for-later';
import withApp from '../../higherorder';
const InStockComponent = () => {
    const pdpData = useSelector(state => state.pdpData, shallowEqual);
    const { 
        ships_in_label, 
        // shipping_type, 
        min_sale_qty 
    } = pdpData;
    const shipping_type = "Never ships Free"
    const shippingComponent = shipping_type === "Ships Free" ?
        <div className="c-cart-box__ship-fee">
            <div className="c-cart-box__ship-fee-icon"></div>
            <span className="c-cart-box__ship-fee-description">FREE Shipping <a href="javascript:void(0)">
                <ToolTip text="Details" toolTipLarge="long"><div className="c-cart-box__ship-fee-icon"></div><div>Good news! This item ships for free on all orders.</div></ToolTip>
            </a></span>
        </div>
        :
        shipping_type === "Never ships Free" ?
            <div className="c-cart-box__ship-fee c-cart-box__ship-fee--never-free">
                <div className="c-cart-box__ship-fee-icon"></div>
                <span className="c-cart-box__ship-fee-description">Item does not qualify for free shipping <a href="javascript:void(0)">
                    <ToolTip text="Details" toolTipLarge="long"><div className="c-cart-box__ship-fee-icon"></div><div>Due to the size and weight of this item, it is exempt from all free shipping offers. </div></ToolTip>
                </a></span>
            </div>
            :
            null;
    const addtocart = () => {

    }
    return (
        <div className="c-cart-box">
            <div className="c-cart-box__container">
                <div className="c-cart-box__ship-info">
                    <div className="c-cart-box__ship-info-stock-status c-cart-box__ship-info-stock-status--in-stock"></div>
                    <div className="c-cart-box__ship-info-description">
                        <span className="c-cart-box__ship-info-description-item-type">
                            Stocked Item</span>
                        <span dangerouslySetInnerHTML={{ __html: ships_in_label }}></span>
                    </div>
                </div>
                {shippingComponent}

                {/* <div className="c-cart-box__ship-delivery-address">
                <span>Deliver to 10001 <a href="#">Change</a></span>
            </div>
            <div className="c-cart-box__ship-delivery-info">
                <p>If you order in the next <i>3 hours and 43 minutes</i> your items will be delivered between <b>Wed. Nov. 27 and Mon. Dec. 23</b></p>
            </div> */}
                <div className="c-cart-box__quantity">
                    <NumberStepper />
                </div>
                <div className="c-cart-box__minimum-order">
                    <div className="c-cart-box__minimum-order-title">
                        Minimum Order
                 </div>
                    <div className="c-cart-box__minimum-order-description">
                        Min order quatity for this product is {min_sale_qty}
                    </div>
                </div>
                <div className="c-cart-box__action">
                    <AddToCartButton />
                    {/* <button onClick={()=>addtocart()} className="c-button c-button--primary c-button--full-width">Add to Cart</button> */}
                    <SaveForLater />
                </div>
            </div>
        </div>
    )
}
export default withApp(InStockComponent);