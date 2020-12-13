
import React, { useEffect, useRef, useState } from 'react';
import withApp from '../higherorder';
import ProductCard from './product-card';
import Swiper from 'swiper';
import PdpService from '../service/pdp.service';
import { pdpPrice } from '../redux-store/reducers/pdp.reducer';

const Slider = () =>{
    let sliderRef = useRef(null);
    const [products,setProducts] = useState(null);
    const pdpService = new PdpService({});
    useEffect(() => {
         pdpService.similarProducts().then(products=>{
             console.log(products)
            setProducts(products);
         });
         
    }, []);
    useEffect(() => {

        // breakpoints: {
        //     xs: { min: 0, max: 575, breakpointName: "extrasmall", className: "phone" },
        //     sm: { min: 576, max: 767, breakpointName: "small", className: "phone" },
        //     md: { min: 768, max: 991, breakpointName: "medium", className: "tablet" },
        //     lg: { min: 992, max: 1199, breakpointName: "large", className: "desktop" },
        //     xl: { min: 1200, max: 1299, breakpointName: "xlarge", className: "wide-desktop" },
        //     xxl: { min: 1300, max: Infinity, breakpointName: "xxlarge", className: "wide-desktop" }
        //   },
        if(sliderRef){
            new Swiper(sliderRef, {
                slidesPerView: 5,
                spaceBetween: 30,
                breakpoints:{
                    992: {
                        slidesPerView: 5,
                        slidesPerGroup: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        freeMode: true,
                        slidesPerView: 2,
                        // slidesPerGroup: 2,
                        spaceBetween: 10,
                    },
                    576: {
                        slidesPerView: 'auto',
                        freeMode: true,
                        spaceBetween: 10,
                    },
                    0: {
                        slidesPerView: 'auto',
                        freeMode: true,
                        spaceBetween: 10,
                    }
                }
                
            });
        }
   }, [products]);
    if(!products || !products.length ) return null;
    console.log(products,'test1234');
    return (

        <div className="page__section p-product-detail__similar-products">
        <div className="page__section-caption">
            <div className="page__section-caption-title">
                <h2>Similar Products</h2>
            </div>
        </div>
        <div className="page__section-content">
        <div data-load="true" className="c-multi-product-slider">
         <div ref={i => sliderRef = i} className="c-multi-product-slider__container swiper-container">
        <div className="c-multi-product-slider__wrapper swiper-wrapper">
            {products.map(product=>(
                 <div className="c-multi-product-slider__slide swiper-slide">
                 <ProductCard product={product}/>
                 {/* @@include('./components/product-card.html', { "title": "Southern Sweet Spicy Barbeque Sauce", "type": "", "info": "", "badgeIcon": "", "shipInfo": "Ships in 2 days", "ratingPoint": "4", "reviewCount": "919", "currentPrice": "$18.25", "nominalPrice": "$36.26", "images": ["https://picsum.photos/180/180?image=0", "https://picsum.photos/180/180?image=1", "https://picsum.photos/180/180?image=2"] }) */}
             </div>
            ))}
       </div>

        <div className="c-multi-product-slider__scrollbar swiper-scrollbar d-sm-none"></div>
    </div></div>
      {/* <div className="c-multi-product-slider__nav d-none d-sm-block">
        <div className="c-multi-product-slider__nav-item c-multi-product-slider__nav-prev"></div>
        <div className="c-multi-product-slider__nav-item c-multi-product-slider__nav-next"></div>
    </div> */}
            {/* @@include('./components/multi-product-slider.html') */}
        </div>
    </div>
    

  

)
}


export default withApp(Slider);