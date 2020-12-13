import React, { useRef, useEffect, useState } from 'react';
import Rating from '../../container/rating';
import Swiper from 'swiper';
import ModalPopupProductDetail from './modal-popup-product-details'
import MagnifierImgView from './magnifier-img-view'
import withApp from '../../higherorder';
import { useSelector, shallowEqual } from 'react-redux';

let g_slider = null;
const ProductSlider = (props) => {
    let sliderRef = useRef(null);
    const pdpData = props.details;
    const { gallery_image, id } = useSelector(state => state.pdpImage, shallowEqual);

    console.log(pdpData)
    let { name, product_review,shipping_type,liquidation } = pdpData;

    const currentThumbnailBorder = {
        border: "solid  2px #6F95CC",
        borderRadius: "1px"
    }
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    const setCurrentMainImage = (index) => {
        setCurrentSlide(index);
        g_slider.slideTo(index)
    }

    // console.log("pdpData: ", pdpData)
    useEffect(() => {
        let slider = new Swiper(sliderRef, {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 30,
        });
        slider.on('slideChange', function (index) {
            setCurrentSlide(this.activeIndex);
        });
        g_slider = slider;
    }, [gallery_image]);
    useEffect(() => {
        if (id) {
            gallery_image.map((obj, index) => {
                if (obj.id === id) {
                    g_slider.slideTo(index);
                }
            })
        }
    }, [id])
    const popupDetails = () => {
        if (openPopup) {
            return (<ModalPopupProductDetail onClose={() => {
                setOpenPopup(false)
            }} />);
        }
        return "";
    }

    return (
        <div className="c-product-viewer" json-product='%7B%22id%22%3A%2238253%22%2C%22sku%22%3A%2221380009%22%2C%22name%22%3A%22Happy%20Baby%20Organic%20Stage%202%20Milk%20Based%20Infant%20Formula%20Powder%20with%20Iron%2C%2021%20Ounce%20--%204%20per%20case.%22%2C%22type%22%3A%22simple%22%2C%22is_saleable%22%3Atrue%2C%22image_url%22%3A%22http%3A%2F%2Flocalhost%3A8080%2Fpub%2Fmedia%2Fcatalog%2Fproduct%2Fplaceholder%2Fdefault%2Ffoodservicedirect-product-th-placelolder_1.png%22%2C%22category%22%3A%22FSD_US%2FFoods%2FBaby%20Foods%2FBaby%20Formulas%2FBaby%20Formulas%22%2C%22brand%22%3Afalse%2C%22price%22%3A%22183.95%22%2C%22in_stock%22%3Atrue%2C%22tax_class_name%22%3A%22Food%20Items%22%7D'>
            {popupDetails()}
            <div className="c-product-viewer__container">

                <div className="c-product-viewer__header">
                    <div className="c-product-shop-box__title">
                        <h1>{name}</h1>
                    </div>
                    {/* <!-- review section --> */}
                    <div className="c-product-shop-box__review">
                        <span className="c-product-shop-box__review-rating">
                            {product_review.rating_avg ? <><Rating rating={product_review.rating_avg} />

                                {/* @@include('./components/rating.html', {"star": "@@ratingPoint"}) */}
                                <span className="c-product-shop-box__review-count">({product_review.review_count})</span>
                            </> : ""}
                        </span>
                        <span className="c-product-shop-box__review-create">
                            <a onClick={() => { props.startReviewWrite(); console.log("props.startReviewWrite();") }}>Write review</a>
                        </span>
                    </div>
                </div>
                <div className="c-product-viewer__content">
                    <div ref={i => sliderRef = i} className="c-product-viewer__image-container swiper-container">
                        <div className="c-product-viewer__image-wrapper swiper-wrapper">
                            {gallery_image.map((image, index) => (
                                <div className="c-product-viewer__image-slide swiper-slide" key={index + "-" + (image.medium_image || image.full)} >

                                    <div style={{left:0}} class="c-product-card_additional-flags">
                                        {liquidation === "1" && <div style={{padding:'7px 10px'}} class="c-product-card_liquidation-flag">
                                            <span>CLEARANCE</span>
                                        </div> || null}
                                        {shipping_type === "Ships Free" && <div  style={{padding:'7px 10px'}} class="c-product-card_free-shipping-flag"> <span>FREE SHIPPING</span> </div> || null}
                                    </div>
                                    <MagnifierImgView imageSrc={image.large_image || image.full} index={index} imageAlt="Example" largeImageSrc={image.large_image || image.full}
                                    /></div>))}
                        </div>
                        <div className="c-product-viewer__image-pane"></div>
                        <div className="c-product-viewer__action-bar">
                            <div className="c-product-viewer__action-bar-left">
                            </div>
                            <div className="c-product-viewer__action-bar-center">
                                <div className="c-product-viewer__bullets">
                                    <div className="c-product-viewer__bullet c-product-viewer__bullet--active"></div>
                                    <div className="c-product-viewer__bullet"></div>
                                    <div className="c-product-viewer__bullet"></div>
                                </div>
                            </div>
                            <div className="c-product-viewer__action-bar-right">
                                <a className="c-product-viewer__action c-product-viewer__action-zoom" onClick={() => { setOpenPopup(true) }}></a>
                            </div>
                        </div>
                    </div>

                    <div className="c-product-viewer__thumb-container">
                        <div className="c-product-viewer__thumb-wrapper">{gallery_image.map((image, index) => (
                            <div onClick={() => setCurrentMainImage(index)} className="c-product-viewer__thumb-slide" key={(image.small_image || image.thumb) + "-" + index}>
                                <div style={index === currentSlide ? currentThumbnailBorder : {}} className={`c-product-viewer__thumb-slide-wrapper
                            `}><img src={image.small_image || image.thumb} /></div></div>))}</div>
                    </div>

                    {/* <Magnifier imageSrc={gallery_image[currentSlide].medium_image} imageAlt="Example" largeImageSrc={gallery_image[currentSlide].large_image} />
 */}
                </div>
            </div>
        </div>
    )
}
export default withApp(ProductSlider);