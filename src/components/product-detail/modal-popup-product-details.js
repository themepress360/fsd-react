import React, { useRef, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import MagnifierImgView from './magnifier-img-view'
import Swiper from 'swiper';
import withApp from '../../higherorder';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
let g_slider = null;

const ModalPopupProductDetail = (props) => {
    let sliderRef = useRef(null);

    const { gallery_image, id } = useSelector(state => state.pdpImage, shallowEqual);

    const pdpData = useSelector(state => state.pdpData, shallowEqual);
    const { name, url } = pdpData;

    const [currentSlide, setCurrentSlide] = useState(0);
    const setCurrentMainImage = (index) => {
        setCurrentSlide(index);
        if (g_slider)
            g_slider.slideTo(index)
    }

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
    }, []);

    const prevSlide = () => {
        var currentSlideVar = currentSlide;
        if (currentSlide > 0) {
            currentSlideVar--;
        } else {
            currentSlideVar = gallery_image.length - 1;
        }
        setCurrentSlide(currentSlideVar)
        if (g_slider)
            g_slider.slideTo(currentSlideVar)
    }

    const nextSlide = () => {
        var currentSlideVar = (currentSlide + 1) % gallery_image.length;
        setCurrentSlide(currentSlideVar)
        if (g_slider)
            g_slider.slideTo(currentSlideVar)
    }

    return (<div style={{ zIndex: '99999999999' }} className="modal-fsd">
        <div className="modal-fsd-content" style={{width:"65%", maxWidth: "950px"}}>

            <div className="c-product-image-modal">
                <div className="c-product-image-modal_container">
                    <div className="c-product-image-modal_header">
                        <div className="c-product-image-modal_social">
                            <span className="c-product-image-modal_social-title">Share</span>
                            <i className="icon__fsd icon__fsd--arrow-right-filled-light-gray c-product-image-modal_social-arrow"></i>
                            <FacebookShareButton url={url} qoute={name} ><FacebookIcon size={32} round /></FacebookShareButton>
                            <TwitterShareButton url={url} title={name}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <PinterestShareButton url={url} media={gallery_image[0].large_image} >
                                <PinterestIcon size={32} round />
                            </PinterestShareButton>
                            <EmailShareButton url={url} subject={name} body="" >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                        </div>
                        <span className="close" style={{ fontSize: "200%" }} onClick={() => { if (props.onClose) props.onClose() }}>&times;</span>
                    </div>
                    <div className="c-product-image-modal_content">
                        <div className="c-product-image-modal_title">{name}</div>
                        <div className="c-product-image-modal_slider">
                            <div className="c-product-image-modal_slider-container">
                                <div ref={i => sliderRef = i} className="c-product-viewer__image-container swiper-container">
                                    <div className="c-product-viewer__image-wrapper swiper-wrapper">
                                        {gallery_image.map((image, index) => (
                                            <div className="c-product-viewer__image-slide swiper-slide" key={index + "-" + image.large_image} >
                                                <MagnifierImgView imageSrc={image.large_image  || image.full} index={index} imageAlt="Example" lensHeight="250px" lensWidth="350px" largeImageSrc={image.large_image || image.full} />
                                            </div>))}
                                    </div>
                                </div>
                            </div>
                            <div className="c-product-image-modal_slider-nav">
                                <div className="c-product-image-modal_slider-nav-item c-product-image-modal_slider-nav-next c-multi-product-slider__nav-item c-multi-product-slider__nav-prev" onClick={() => { nextSlide() }}>
                                </div>
                                <div className="c-product-image-modal_slider-nav-item c-product-image-modal_slider-nav-prev  c-multi-product-slider__nav-item c-multi-product-slider__nav-next" onClick={() => { prevSlide() }}>
                                </div>
                            </div>
                        </div>
                        <div className="c-product-image-modal_preview">
                            <div className="c-product-image-modal_preview-container">
                                <ul className="c-product-image-modal_preview-items">
                                    {gallery_image.map((image, index) => (
                                        <li className="c-product-image-modal_preview-item" key={index + "-preview"} onClick={() => setCurrentMainImage(index)}>
                                            <img src={image.large_image || image.full} alt="" />
                                        </li>))}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default withApp(ModalPopupProductDetail);