import React, { Fragment, useEffect, useState, useRef, Suspense } from 'react'
import StickyBar from '../components/product-detail/sticky-bar'
import NotifyOutofStock from '../components/product-detail/notify-out-stock'
import InStockComponent from '../components/product-detail/in-stock.component'
import ProductSlider from '../components/product-detail/product-slider'
import ProductViewer from '../components/product-detail/product-viewer'
import CategoryTagList from '../components/product-detail/category-tag-list'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import PdpService from '../service/pdp.service'
import Breadcrumbs from '../components/product-detail/breadcrumbs'
import TrackVisibility from 'react-on-screen';
import Loader from 'react-loader-spinner'
import Review from '../components/product-detail/review'
import AboutProduct from '../components/product-detail/about-product'
import ModalPopupProductReview from './../components/product-detail/modal-popup-product-review'
import ModalPopup from './../components/product-detail/modal-popup'
import withApp from './../higherorder';
import Slider from '../container/slider'
// const AboutProduct = React.lazy(() => import( '../components/product-detail/about-product' ));
let productInformationcall = false;
const ProductDetail = ({ constant }) => {
    const pdpData = useSelector(state => state.pdpData, shallowEqual);
    const { imagePath } = constant;
    const dispatch = useDispatch();
    const pdp = new PdpService({ dispatch });
    const [lazyload, setLazyload] = useState(0);

    const [openReviewPopup, setOpenReviewPopup] = useState(false);
    const [openPopup, setOpenPopup] = useState(true);
    const popupReview = () => {
        if (openReviewPopup) {
            return (<ModalPopupProductReview isDidPurchase={pdpData.is_did_purchase} sku={pdpData.sku} onClose={() => {
                setOpenReviewPopup(false)
            }} />);
        }
        return "";
    }




    useEffect(() => {
        pdp.getPdpData();
    }, []);
    // console.log(pdpData,'textttttt')
    useEffect(() => {
        if (pdpData && pdpData.General && lazyload === 0) {
            setLazyload(1);
        }
    }, [lazyload, pdpData]);
    if (!pdpData) return null;
    else if (!pdpData.sku) return <div className="text-center my-5"> <Loader type="ThreeDots" color="#546385" height={100} width={100} /></div>
        ;
    const { is_in_stock } = pdpData;
    const stock_component = is_in_stock ? <InStockComponent /> : <NotifyOutofStock />;
    const getAboutProductData = (value) => {
        if (!productInformationcall) {
            productInformationcall = true;
            pdp.getProductinformation();
        }
    }
    return (
        <Fragment>
            {popupReview()}
            {/* generic model sample */}
            {/* {openPopup ? (
                <ModalPopup title="new generic model" isControlsOpen={true} positiveButtonLabel="OK" onClose={() => setOpenPopup(false)}>
                    <img src="https://mcstaging2.foodservicedirect.com/media/catalog/product/1/0/10048001010045_8.jpg" />
                </ModalPopup>) : ""} */}
            <div className="page__sections p-product-detail__primary-sections">
                <div className="container">
                    <div className="p-product-detail__top row">
                        <div className="col-lg-11">
                            <div className="p-product-detail__breadcrumb">
                                
                                    <Breadcrumbs />
                                
                                {/* @@include('./components/breadcrumb.html', { "theme": "sm" }) */}
                            </div>
                            <div className="p-product-detail__tag-list">
                                <CategoryTagList />
                                {/* @@include('./components/category-tag-list.html') */}
                            </div>
                        </div>
                    </div>

                    <div className="p-product-detail__product-first-look row justify-content-between">
                        <div className="col-lg-8">
                            <div className="page__section">
                                {/* @@loop('./components/product-viewer.html', '/mock-data/product.json') */}
                                <ProductSlider details={pdpData} startReviewWrite={() => {
                                    setOpenReviewPopup(true)
                                    console.log("setOpenReviewPopup(true)")
                                }} />

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-product-detail__aside">
                                <div className="page__section p-product-detail__product-shop-box">
                                    <div className="page__section-content">
                                        <ProductViewer startReviewWrite={() => {
                                            setOpenReviewPopup(true)
                                            console.log("setOpenReviewPopup(true)")
                                        }} />
                                        {/* @@loop('./components/product-shop-box.html', '/mock-data/product.json') */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="p-product-detail__aside">
                                <div className="page__section p-product-detail__cart-box">
                                    <div className="page__section-content">
                                        {stock_component}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page__sections p-product-detail__secondary-sections">
                <TrackVisibility partialVisibility>
                    {({ isVisible }) => {

                        if (isVisible && lazyload === 0) {
                            getAboutProductData(1);
                            return <div className="text-center mt-5"> <Loader type="ThreeDots" color="#546385" height={100} width={100} /></div>
                        }
                        return lazyload > 0 ? <div className="container">
                            <AboutProduct data={pdpData} />
                        </div>
                            : ''
                    }}
                </TrackVisibility>
            </div>
            <div className="page__section p-product-detail__tertiary-sections">
                <TrackVisibility partialVisibility>
                    {({ isVisible }) => {
                        if (isVisible && lazyload === 1) setLazyload(2);
                        return lazyload > 1 ? <div className="container">
                            <div className="row">
                                <div className="col-lg-20">

                                    {/* <!-- compare table section --> */}
                                    <Slider slider="similarproducts" />





                                    {/* <!-- review & questions section --> */}
                                    <Review sku={pdpData.sku} startReviewWrite={() => {
                                        setOpenReviewPopup(true)
                                    }} />

                                    {/* <!-- FSD promise section --> */}
                                    <div className="page__section p-product-detail__fsd-promise">
                                        <div className="page__section-caption">
                                            <div className="page__section-caption-title page__section-caption-title--script">The Food Service Direct Promise
                                            </div>
                                        </div>
                                        <div className="page__section-content">
                                            <div className="p-product-detail__feature-cards page__section-feature-card-list row">
                                                <div className="page__section-feature-card-list-item col-lg-5 col-md-10 col-sm-20">
                                                    <div className="c-feature-card">
                                                        <div className="c-feature-card__container">
                                                            <div className="c-feature-card__header">
                                                                <div className="c-feature-card__icon">
                                                                    <div className="c-feature-card__icon-container" style={{ backgroundColor: "#546385" }}><img
                                                                        className="c-feature-card__icon-icon" src={imagePath + "/images/icon/snowbox.svg"} alt="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="c-feature-card__content">
                                                                <div className="c-feature-card__title">
                                                                    <h3>Quality Shipments</h3>
                                                                </div>
                                                                <div className="c-feature-card__description">
                                                                    <p>We promise to get you what you need in quality condition</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="page__section-feature-card-list-item col-lg-5 col-md-10 col-sm-20">
                                                    <div className="c-feature-card">
                                                        <div className="c-feature-card__container">
                                                            <div className="c-feature-card__header">
                                                                <div className="c-feature-card__icon">
                                                                    <div className="c-feature-card__icon-container" style={{ backgroundColor: "#86A13C" }}><img
                                                                        className="c-feature-card__icon-icon" src={imagePath + "/images/icon/telescope.svg"} alt="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="c-feature-card__content">
                                                                <div className="c-feature-card__title">
                                                                    <h3>Partnership in Sourcing</h3>
                                                                </div>
                                                                <div className="c-feature-card__description">
                                                                    <p>When you can’t find something you need, you can call us.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="page__section-feature-card-list-item col-lg-5 col-md-10 col-sm-20">
                                                    <div className="c-feature-card">
                                                        <div className="c-feature-card__container">
                                                            <div className="c-feature-card__header">
                                                                <div className="c-feature-card__icon">
                                                                    <div className="c-feature-card__icon-container" style={{ backgroundColor: "#7D2254" }}><img
                                                                        className="c-feature-card__icon-icon" src={imagePath + "/images/icon/support-call.svg"}
                                                                        alt="" /></div>
                                                                </div>
                                                            </div>
                                                            <div className="c-feature-card__content">
                                                                <div className="c-feature-card__title">
                                                                    <h3>Service &amp; Support</h3>
                                                                </div>
                                                                <div className="c-feature-card__description">
                                                                    <p>We are here for you – our team is your team.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="page__section-feature-card-list-item col-lg-5 col-md-10 col-sm-20">
                                                    <div className="c-feature-card">
                                                        <div className="c-feature-card__container">
                                                            <div className="c-feature-card__header">
                                                                <div className="c-feature-card__icon">
                                                                    <div className="c-feature-card__icon-container" style={{ backgroundColor: "#534b70" }}><img
                                                                        className="c-feature-card__icon-icon" src={imagePath + "/images/icon/free-shipping.svg"}
                                                                        alt="" /></div>
                                                                </div>
                                                            </div>
                                                            <div className="c-feature-card__content">
                                                                <div className="c-feature-card__title">
                                                                    <h3>Free Shipping</h3>
                                                                </div>
                                                                <div className="c-feature-card__description">
                                                                    <p>Free Shipping over $750 and reduced shipping for 2+ items.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> : ''
                    }}
                </TrackVisibility>
            </div>
            
                <StickyBar />
           
        </Fragment>
    )
}

export default withApp(React.memo(ProductDetail))
