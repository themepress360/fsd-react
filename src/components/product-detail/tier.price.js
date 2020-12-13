import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import formatPrice from '../../utils/priceformater';
import withApp from '../../higherorder';
const TierPrice = () => {
    let tierfrom = 0 ;
    const pdpData = useSelector(state => state.pdpData, shallowEqual);
    const priceData= useSelector(state=>state.pdpPrice,shallowEqual);


    const { sold_as } = pdpData;
    const { tierPrices:tier_prices } = priceData;

    if (!tier_prices || !Object.keys(tier_prices).length) return null;
    return (
        <ul className="c-product-shop-box__item-amount-price-table-items">

            {Object.values(tier_prices).map((tier,i) => {
                let price = tier.website_price || tier.price;
                let qty = tier.price_qty || tier.qty; 
                let percentage_value = tier.percentage_value || tier.percentage; 

                let renderData =<li className="c-product-shop-box__item-amount-price-table-item">
                    <span className="c-product-shop-box__item-amount-price-table-item-number">Buy <b>{tierfrom}-{parseInt(qty)}</b> item</span>
                    <span className="c-product-shop-box__item-amount-price-table-item-price">{formatPrice(price)} <span className="c-product-shop-box__item-amount-price-table-item-amount text-lowercase">/{sold_as}</span></span>
                    {percentage_value && <span className="c-product-shop-box__item-amount-price-table-item-discount">SAVE {percentage_value}%</span> || null}
                </li>
                tierfrom = parseInt(qty);
                return renderData;
            })}
        </ul>
    )
}
export default withApp(TierPrice);