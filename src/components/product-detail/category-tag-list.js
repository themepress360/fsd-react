import React from 'react';
import { useSelector,shallowEqual } from 'react-redux';
import withApp from '../../higherorder';
const CategoryTagList = () =>{
    const categoryTagList= useSelector(state=>state.breadcrumbsData,shallowEqual);
    if(!categoryTagList || !categoryTagList.tags || !Object.keys(categoryTagList.tags).length) return null;
    const {tags}= categoryTagList; 
    return (
        <div className="c-category-tag-list">
        <div className="c-category-tag-list__container">
            <input className="c-category-tag-list__checkbox" type="checkbox" id="showCategory" />
            <label className="c-category-tag-list__link" htmlFor="showCategory">Show more products likes this</label>
            <ul className="c-category-tag-list__items">
                <li className="c-category-tag-list__item c-category-tag-list__item--title">
                    <span>See more products like this</span>
                </li>
                {Object.values(tags).map(({name,url_path},index)=>(
                    <li className="c-category-tag-list__item" key={index +"-"+name}>
                        <a key={index} href={url_path} className="c-category-tag-list__item-title">{name}</a>
                    </li>
                ))}
            </ul>
        </div>
    
    </div>
    )
}
export default withApp(CategoryTagList);