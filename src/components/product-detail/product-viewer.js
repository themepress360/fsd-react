import React from 'react';
import TypeChooser from './type-chooser';
import ColorChooser from './color-chooser';
import { useSelector, shallowEqual } from 'react-redux';
import Rating from '../../container/rating';
import TierPrice from './tier.price';
import ProductSize from './product-sizes';
import ToolTip from './tooltip'
import withApp from '../../higherorder';
import tierPrice from './tier.price';
const ProductViewer = (props) =>{
    const {method,constant} = props;
    const {imagePath} = constant;
    const pdpData= useSelector(state=>state.pdpData,shallowEqual);
    const priceData= useSelector(state=>state.pdpPrice,shallowEqual);
    const {formatPrice} = method;
    const {bulk_each_sku_url,shipping_type, shipping_temp,name,sku,product_review,final_price,special_price,price,sold_as} = pdpData;
    const {finalPrice,tierPrices:tier_prices} = priceData;
    
    const renderOffer = () =>{
        // console.log(typeof tier_prices,'textttt');
        const obj = tier_prices[Object.keys(tier_prices)[Object.keys(tier_prices).length-1]];
        console.log(obj,'textttt');
        let qty = obj.price_qty || obj.qty; 
        let percentage_value = obj.percentage_value || obj.percentage;
        return <div className="c-product-shop-box__amount-discount">

  <span className="c-product-shop-box__amount-discount-save-badge">Buy {parseInt(qty)} and More {percentage_value}% Off</span>
  {shipping_type === "Ships Free" && <span className="c-product-shop-box__amount-discount-description">& FREE Shipping</span>  || ''}
</div> ;
    }
    return (
        <div className="c-product-shop-box" json-product='%7B%22id%22%3A%2238253%22%2C%22sku%22%3A%2221380009%22%2C%22name%22%3A%22Happy%20Baby%20Organic%20Stage%202%20Milk%20Based%20Infant%20Formula%20Powder%20with%20Iron%2C%2021%20Ounce%20--%204%20per%20case.%22%2C%22type%22%3A%22simple%22%2C%22is_saleable%22%3Atrue%2C%22image_url%22%3A%22http%3A%2F%2Flocalhost%3A8080%2Fpub%2Fmedia%2Fcatalog%2Fproduct%2Fplaceholder%2Fdefault%2Ffoodservicedirect-product-th-placelolder_1.png%22%2C%22category%22%3A%22FSD_US%2FFoods%2FBaby%20Foods%2FBaby%20Formulas%2FBaby%20Formulas%22%2C%22brand%22%3Afalse%2C%22price%22%3A%22183.95%22%2C%22in_stock%22%3Atrue%2C%22tax_class_name%22%3A%22Food%20Items%22%7D'>
    <div className="c-product-shop-box__container">
        <div className="c-product-shop-box__header">
            <div className="c-product-shop-box__title">
                <h2>{name}</h2>
            </div>
        </div>
        <div className="c-product-shop-box__content">

            {/* <!-- review section --> */}
            <div className="c-product-shop-box__review">
                <span className="c-product-shop-box__review-rating">
                    {product_review.rating_avg ? <> <Rating rating={product_review.rating_avg}/>   
                    <span className="c-product-shop-box__review-count">({product_review.review_count})</span> </> : ''} 
                </span>
                <span className="c-product-shop-box__review-create">
                    <a href="javascript:void(0)" onClick={() =>  props.startReviewWrite()}>Write review</a>
                </span>
            </div>

            <div className="c-product-shop-box__SKU">
                SKU ID: #{sku}
            </div>
                {tier_prices && Object.keys(tier_prices).length ? 
                 
                 
                     renderOffer()
                :''}

            {/* <!-- price section --> */}
            <div className="c-product-shop-box__price">
                <div className="c-product-shop-box__price-bar">
                    <span className="c-product-shop-box__price-current">{formatPrice(finalPrice.amount)}</span>
                    {special_price ? <span className="c-product-shop-box__price-nominal">{formatPrice(price)}</span> : ''}
                    {bulk_each_sku_url ?
                        <>
                        <div class="c-radio-button"><input onClick={()=>sold_as.toLowerCase() !== "each" ? null : window.location.href=bulk_each_sku_url} type="radio"  name="check" id="check1" defaultChecked={sold_as.toLowerCase() !== "each"} /> <label for="check1">case</label></div>
                        <div class="c-radio-button"><input onClick={()=>sold_as.toLowerCase() !== "case" ? null : window.location.href=bulk_each_sku_url} type="radio" name="check" id="check2" defaultChecked={sold_as.toLowerCase() !== "case"} /> <label for="check2">each</label></div>
                        </>
                    :<span className="c-product-shop-box__price-current-amount text-lowercase"> /{sold_as}</span> }
                </div>
                {/* <div className="c-product-shop-box__price-you-save">You save: $49,75</div> */}
            </div>

            {/* <!-- item-amount-price-table section --> */}
            <div className="c-product-shop-box__item-amount-price-table">
                 <TierPrice />
            </div>

            {/* <!-- specification item section --> */}
            {shipping_temp === 'Frozen' || shipping_temp ==='Refrigerated' ? 
            <div className="c-product-shop-box__spec-item">
                <ul className="c-product-shop-box__spec-item-list">
                    <li className="c-product-shop-box__spec-item-list-item">
                        <span className="c-product-shop-box__spec-item-list-item-icon">
                            <img alt={name} src={imagePath + "/images/icon/ships-frozen.svg"} />
                        </span>
                        <div className="c-product-shop-box__spec-item-list-item-description">
                            <span> <a href="javascript:void()"><ToolTip text="Ships Refrigerated"  toolTipLarge="long">Depending on the day of the week ordered and duration of transit, this temperature item may be held until Monday before shipping.</ToolTip></a> in our Proprietary Boxes</span>
                        </div>
                    </li>
                </ul>
            </div> : null }

             <div className="c-product-shop-box__type-chooser">
                <TypeChooser />
                {/* @@include('./components/type-chooser.html') */}
            </div>

            <div className="c-product-shop-box__color-chooser">
                <ColorChooser />
                {/* @@include('./components/color-chooser.html') */}
            </div>
            <ProductSize />
{/*
            <div className="c-product-shop-box__product-size">
                <div className="c-product-shop-box__product-size-title">3 Sizes</div>
                <div className="c-product-shop-box__product-size-select">
                    <div className="c-selectbox">
                        <select>
                            <option>16oz (Pack of 2) - $18.69 ($2.21 / Fl Oz)</option>
                            <option>12oz (Pack of 2) - $15.69 ($2.21 / Fl Oz)</option>
                            <option>10oz (Pack of 2) - $13.69 ($2.21 / Fl Oz)</option>
                        </select>
                    </div>
                </div>
                <div className="c-product-shop-box__product-size-info">$18.69 ($2.21 / Fl Oz)</div>
            </div> */}
        </div>
    </div>
</div>
    )
}
export default withApp(ProductViewer);