import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
const Rating = ({rating}) =>{
    return (
        <div className={`c-rating c-rating--${rating}`}>
                        <ul className="c-rating__stars">
                            <li className="c-rating__star"></li>
                            <li className="c-rating__star"></li>
                            <li className="c-rating__star"></li>
                            <li className="c-rating__star"></li>
                            <li className="c-rating__star"></li>
                        </ul>
        </div>
    )
}
export default Rating;