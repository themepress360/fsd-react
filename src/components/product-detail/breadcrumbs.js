

import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import withApp from './../../higherorder';
const Breadcrumbs = () =>{
    const breadcrumbsData= useSelector(state=>state.breadcrumbsData,shallowEqual);
    if(!breadcrumbsData || !breadcrumbsData.breadcrumbs) return null;
    const {breadcrumbs}= breadcrumbsData; 
    
    return (
        <div className="c-breadcrumb c-breadcrumb--sm">
	    <ul className="c-breadcrumb__container">
        {Object.values(breadcrumbs).map(({url_path,name},index)=>(
            <li key={index} className="c-breadcrumb__item"><a href={url_path} className="c-breadcrumb__item-link">{name}</a></li>
        ))}
		
	</ul>
</div>
    )
}
export default withApp(Breadcrumbs);