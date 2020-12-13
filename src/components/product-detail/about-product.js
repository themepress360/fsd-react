

import React, { useState, useRef, useEffect } from 'react';
import withApp from '../../higherorder';
import dispatchEvent from '../../utils/dispatchEvent';
const AboutProduct = ({data,constant}) => {
    const {Content,is_returnable,shipping_temp} = data;
    const unbxdRef = useRef(null); 
    const tabskeys =['Product Specifications','Properties','Allergens','Nutrition Facts'];
    const [activeTab,setActiveTab] = useState(tabskeys[0]);
    const [expand,setExpand] = useState([]);
    // console.log(JSON.stringify(JSON.parse(data['Allergen Content'])));
    const {imagePath} = constant; 
    const tabs = () => {
        return tabskeys.map(tab=>{
           return data[tab] && data[tab].length && <div onClick={()=>setActiveTab(tab)} style={{borderLeft:"1px solid white"}} className={`c-tab-box__tab-links ${activeTab === tab ? 'c-tab-box__tab-links--active': ' '}`}>{tab}</div> || null ;
        }) 
    }
    useEffect(()=>{
        if(unbxdRef.current){
            dispatchEvent('unbxd-pdp');
        }
    },[]) ;
    const expandClick = (tab) =>{
        console.log(tab);
        const expandnew = [...expand];
        const index = expandnew.indexOf(tab);
        if(index === -1){
            expandnew.push(tab);
        }else{
            expandnew.splice(index,1);
        }
        setExpand(expandnew);
    } 
    return (
        <div className="row">

        <div className="col-lg-12 col-xl-13">

            {/* <!-- about product section --> */}
            <div className="page__section p-product-detail__about-product">
                <div className="page__section-caption">
                    <div className="page__section-caption-title">
                        <h2>About this product</h2>
                    </div>
                </div>
                <div className="page__section-content">
                    {/* <div className="p-product-detail__about-product-warning-box">
                        <div className="p-product-detail__about-product-warning-box-caption">
                            <div className="p-product-detail__about-product-warning-box-icon">
                                <i className="icon__fsd icon__fsd--error-danger"></i>
                            </div>
                            <div className="p-product-detail__about-product-warning-box-title">
                                December Delays!
                            </div>
                        </div>
                        <div className="p-product-detail__about-product-warning-box-description">
                            Throughout the month of December, our shipping partners often experience delays in transit. As this item is temparature sensitive, it may be held until the following Monday before shipping to ensure it arrives in the condition you expect.
                        </div>
                    </div> */}
                    {Content.map((content, index)=>{
                        switch(content.attribute_code){
                            case 'title_2' : return <h1 key={index+"-"+content.attribute_code}><strong>{content.value}</strong></h1>
                            case 'short_description' : return <div  key={index+"-"+content.attribute_code} dangerouslySetInnerHTML={{__html: content.value}}></div>
                            case 'title_3' : return <h1  key={index+"-"+content.attribute_code} className="pt-2"><strong>{content.value}</strong></h1>
                            case 'description' : return <div  key={index+"-"+content.attribute_code} dangerouslySetInnerHTML={{__html: content.value}}></div>
                            default: return null
                        }
                    })}
                </div>
                {/* <div className="p-product-detail__about-product-download-manual">
                    <a href="#">
                        <i className="icon__fsd icon__fsd--download-primary icon__fsd--sm"></i><span>Download User
                            Manual</span><i className="icon__fsd icon__fsd--pdf-gray"></i>
                    </a>
                </div> */}
                <div className="p-product-detail__about-product-spec">
                    <div className="p-product-detail__about-product-spec-ships-frozen">
                    {shipping_temp === 'Frozen' || shipping_temp ==='Refrigerated' ? 
                    <>
                        <div className="p-product-detail__about-product-spec-ships-frozen-icon"><i
                                className="icon__fsd icon__fsd--ships-frozen-snow"></i></div>
                        <div className="p-product-detail__about-product-spec-ships-frozen-information">
                            <a id="ships-refrigerated"></a> <span
                                className="p-product-detail__about-product-spec-ships-frozen-information-title">
                                {/* <ToolTip text="Ships Refrigerated" toolTipText="Ships Refrigerated tooltip" /> */}
                                Ships Refrigerated in our Proprietary Boxes</span>
                            <p className="p-product-detail__about-product-spec-ships-frozen-information-description">
                                This
                                temperature sensitive item can not transit over a weekend so, depending on the day
                                of the week ordered
                                and destination, some delays may occur.</p>
                        </div></> : ''}
                    </div>
                    {!parseInt(is_returnable) &&   
                    <div className="p-product-detail__about-product-spec-no-return">
                        <div className="p-product-detail__about-product-spec-no-return-icon"><i
                                className="icon__fsd icon__fsd--no-return"></i></div>
                        <div className="p-product-detail__about-product-spec-no-return-information"><span
                                className="p-product-detail__about-product-spec-no-return-information-title">No Returns Allowed on This Product
                                </span>
                            <p className="p-product-detail__about-product-spec-no-return-information-description">
                            We are currently unable to accept returns or cancellation requests on all items</p>
                        </div>
                    </div>
                    || null}
                </div>
            </div>


            {/* <!-- video section --> */}
            {data.Fsd_Video && data.Fsd_Video.length ?
            <div className="page__section p-product-detail__video" id="product-video">
                {/* <div className="page__section-caption">
                    <div className="page__section-caption-title">
                        <h3>Dexter Russell | Duo-Glide® Knives | myBoelter</h3>
                    </div>
                </div> */}
                <div className="page__section-content">
                    <div className="p-product-detail__video-box">
                        <iframe width="100%" height="auto" src={data.Fsd_Video[0].value}></iframe>
                    </div>
                   
                </div>
            </div>
            : ''}

            {/* <!-- product features section --> */}
            <div className="page__section p-product-detail__product-features">
                <div className="page__section-content">
                    <div className="p-product-detail__product-features-table">
                        <div className="c-tab-box">
                            <div className="c-tab-box__container">
                                <div className="c-tab-box__tab">
                                    {/* <!-- To show current active tab, '--active' must be append to the class name --> */}
                                    {
                                       tabs()}
                                      
                                        
                                    {/* <div className="c-tab-box__tab-links">Properties</div>
                                    <div className="c-tab-box__tab-links">Ingridients</div>
                                    <div className="c-tab-box__tab-links">Allergens</div>
                                    <div className="c-tab-box__tab-links">Nutrition Facts</div> */}
                                </div>

                                <div className="c-tab-box__tab-wrapper">
                                    <div className="c-tab-box__tab-content">
                                        <div className="c-zebra-table">
                                            <div className="c-zebra-table__container">
                                                {data[activeTab].map(tabvalue=>{
                                                    console.log(tabvalue,'sadsadsa');
                                                    if(typeof tabvalue.value === "object")  
                                                    return Object.keys(tabvalue.value).map(label=>(
                                                    <div className="c-zebra-table__row">
                                                    <div className="c-zebra-table__column">{label}</div>
                                                    <div className="c-zebra-table__column">{tabvalue.value[label]}</div>
                                                    </div>))
                                                    return <div className="c-zebra-table__row">
                                                    <div className="c-zebra-table__column">{tabvalue.label}</div>
                                                    <div className="c-zebra-table__column">{tabvalue.value}</div>
                                                    </div>
                                                    
                                                })}
                                                

                                                {/* <div className="c-zebra-table__row">
                                                    <div className="c-zebra-table__badge">
                                                        <div className="c-zebra-table__badge-icon">
                                                            <i className="icon__fsd icon__fsd--kosher"></i>
                                                        </div>
                                                        <div className="-zebra-table__badge-title">Kosher</div>
                                                    </div>
                                                </div>
                                                <div className="c-zebra-table__row">
                                                    <div className="c-zebra-table__warning">
                                                        <div className="c-zebra-table__warning-icon-wrapper">
                                                            <div className="c-zebra-table__warning-icon"></div>
                                                        </div>
                                                        <div className="c-zebra-table__warning-info">
                                                            <span className="c-zebra-table__warning-title">Attention CA Residents: <b>Prop 65 Warning</b> </span>
                                                            <p className="c-zebra-table__warning-description">
                                                                his product can expose you to chemicals including lead, which are known to the State of California to cause cancer, birth defects, or other reproductive harm. For more information, go to <a href="#">www.p65warnings.ca.gov.</a>.  
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-product-detail__product-features-mobile-expandable-blocks">

                         {/* <!-- product specifications section --> */}
                         {tabskeys.map(tab=>(
                             data[tab] && data[tab].length ?
                             <div className={`c-expandable-list-block ${expand.includes(tab) ? 'c-expandable-list-block--expanded' : ''}`} >
                             <div className="c-expandable-list-block__container">
                                 <div className="c-expandable-list-block__caption">
                                     <div className="c-expandable-list-block__caption-title">
                                         <h6>{tab}</h6>
                                     </div>
                                     <div className="c-expandable-list-block__caption-action">
                                         <button
                                            onClick={()=>expandClick(tab)} className="c-expandable-list-block__caption-action-button c-button c-button--icon"></button>
                                     </div>
                                 </div>
                                 <div className="c-expandable-list-block__content">
                                     <ul className="c-expandable-list-block__items">
                                         {data[tab].map(tabvalue=>{
                                            
                                             if(typeof tabvalue.value === "object") 
                                             return Object.keys(tabvalue.value).map(label=>(
                                                <li className="c-expandable-list-block__item">
                                                <div className="c-expandable-list-block__item-label">
                                                   {label}
                                                </div>
                                                <div className="c-expandable-list-block__item-value">
                                                    <ul>
                                                        <li>{tabvalue.value[label]}</li>
                                                    </ul>
                                                </div>
                                            </li>
                                             ))
                                        return  <li className="c-expandable-list-block__item">
                                             <div className="c-expandable-list-block__item-label">
                                                {tabvalue.label}
                                             </div>
                                             <div className="c-expandable-list-block__item-value">
                                                 <ul>
                                                     <li>{tabvalue.value}</li>
                                                 </ul>
                                             </div>
                                         </li>
                                        })}
                                         {/* <li className="c-expandable-list-block__item">
                                             <div className="p-product-detail__about-product-speciality">
                                                 <ul className="p-product-detail__about-product-speciality-items">
                                                     <li className="p-product-detail__about-product-speciality-item">
                                                         <i
                                                             className="p-product-detail__about-product-speciality-item-icon icon__fsd icon__fsd--halal"></i>
                                                         <span
                                                             className="p-product-detail__about-product-speciality-item-name">Halal</span>
                                                     </li>
                                                 </ul>
                                             </div>
                                         </li> */}
                                     </ul>
                                 </div>
                             </div>
                             </div> : null
                         ))}


            </div>
            </div>
            </div>

            {/* <!-- product brand section --> */}
            {
                data[tabskeys[0]].map(tabvalue=>{
                    if(tabvalue.attribute_code !== "brand" || !tabvalue.content) return null;
     return <div className="page__section p-product-detail__product-brand">
                <div className="page__section-caption">
                    <div className="page__section-caption-title">
                        <h3>Brand</h3>
                    </div>
                </div>
                <a href={tabvalue.url_path} style={{textDecoration:"none"}} className="page__section-content">
                    <div className="p-product-detail__product-brand-container">
                        <div className="p-product-detail__product-brand-logo">
                            <img src={tabvalue.logo} alt={tabvalue.name} />
                        </div>
                        <div className="p-product-detail__product-brand-description">
                            {tabvalue.content}
                        </div>
                    </div>
                </a>
            </div>}
                )
            }
            
        </div>

        <div className="col-xl-5 offset-xl-2 col-lg-7 offset-lg-1">
            {/* <!-- unbxd recommendations section --> */}
            <div ref={unbxdRef} className="page__section p-product-detail__product-list" id="unbxd-recommendation--product-detail"></div>

            {/* <!-- bundle cart section --> */}
            <div className="page__section p-product-detail__bundle-car">
                <div className="page__section-caption">
                    <div className="page__section-caption-title">
                        {/* <h3>Frequently Bought Together</h3> */}
                    </div>
                </div>
                <div className="page__section-content">
                    {/* @@include('./components/bundle-cart.html') */}
                </div>
            </div>
        </div>
                                        
    </div>  
    )
}
export default withApp(AboutProduct);