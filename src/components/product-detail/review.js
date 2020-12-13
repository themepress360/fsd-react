

import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ReviewService from '../../service/review.service';
import withApp from '../../higherorder';
import Rating from '../../container/rating';
const Review = (props) => {
    const [reviewData, setReviewData] = useState([]);
    const pdpData = useSelector(state => state.pdpData, shallowEqual);
    const sku = props.sku
    // const sku = "21191939"

    const [data, setData] = useState({
        stars: [0, 0, 0, 0, 0],
        roundOf: 0,
        totalCount: 0,
        total: 0,
    });
    useEffect(() => {
        const pdpService = new ReviewService({});
        pdpService.getReviewData(sku).then(res => {
            console.log("review: ", res)
            for (let review of res) {
                data.stars[review.ratings[0].value - 1]++;
                data.totalCount++;
                data.total += review.ratings[0].value;
            }
            data.roundOf = data.total / data.totalCount
            setReviewData(res);
        }).catch(err => {
        });
    }, []);

    const getReviewItem = (review) => {
        return (<li className="c-reviews-list__item" >
            <h3 className="c-reviews-list__item-title">{review.title}</h3>
            <div className="c-reviews-list__item-info-bar">
                <div className="c-reviews-list__item-rating">
                    <Rating rating={review.ratings[0].value} />
                </div>
                <span className="c-reviews-list__item-author">{review.nickname}</span>
                <span className="c-reviews-list__item-date">{(new Date(review.created_at)).toDateString()}</span>
            </div>
            <div className="c-reviews-list__item-comment">
                <p>{review.detail}</p>
            </div>
            {/* <div className="c-reviews-list__item-feedback-message">
                <div className="c-reviews-list__item-feedback-message-icon">
                    <div
                        className="c-reviews-list__item-feedback-message-icon-happy">
                    </div>
                </div>
                <span className="c-reviews-list__item-feedback-message-text">Thank you for your feedback</span>
            </div>
            <div className="c-reviews-list__item-feedback"><span className="c-reviews-list__item-feedback-text">Was Helpful?</span>
                <div className="c-reviews-list__item-feedback-icon">
                    <div className="c-reviews-list__item-feedback-icon-happy"></div>
                </div>
                <div className="c-reviews-list__item-feedback-icon">
                    <div className="c-reviews-list__item-feedback-icon-sad"></div>
                </div>
                <span className="c-reviews-list__item-feedback-link">Reply</span>
                <span className="c-reviews-list__item-feedback-link">Report Abuse</span>
            </div> */}
        </li>
        );
    }
    if (!reviewData || !reviewData.length) return null;
    return (
        <div className="page__section p-product-detail__review-questions">
            <div className="page__section-caption">
                <div className="page__section-caption-title page__section-caption-title--script">
                    Review
                 </div>
            </div>
            <div className="page__section-content">
                <div className="c-tab-box">
                    <div className="c-tab-box__container">
                        <div className="c-tab-box__tab">
                            {/* <!-- To show current active tab, '--active' must be append to the class name --> */}
                            {/* <div className="c-tab-box__tab-links ">26 Questions & 16 Answers</div> */}
                            <div className="c-tab-box__tab-links c-tab-box__tab-links--active">{reviewData.length} Customer Reviews</div>
                        </div>

                        <div className="c-tab-box__tab-wrapper">
                            {/* <div className="c-tab-box__tab-content">
                                                        @@include('./components/questions-answers.html')
                                                    </div> */}

                            {/* <!-- reviews part --> */}
                            <div className="c-tab-box__tab-content">
                                <div id="rating" className="c-reviews">
                                    <div className="c-reviews__container">
                                        <div className="c-reviews__overall-box">
                                            <div className="c-review-overall-box">
                                                <div className="c-review-overall-box__container">
                                                    <div className="c-review-overall-box__header">
                                                        <h2 className="c-review-overall-box__title">Overall</h2>
                                                        <div className="c-review-overall-box__rating">
                                                            <div className={"c-rating c-rating--" + parseInt(data.roundOf)}>
                                                                <ul className="c-rating__stars">
                                                                    <li className="c-rating__star"></li>
                                                                    <li className="c-rating__star"></li>
                                                                    <li className="c-rating__star"></li>
                                                                    <li className="c-rating__star"></li>
                                                                    <li className="c-rating__star"></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="c-review-overall-box__statistic-info">
                                                            <span className="c-review-overall-box__statistic-info-medal-count">{data.roundOf} out of 5 medals</span>
                                                            <span className="c-review-overall-box__statistic-info-comment-count">({reviewData.length} reviews) </span>
                                                        </div>
                                                    </div>
                                                    <div className="c-review-overall-box__content">
                                                        <div className="c-review-overall-box__progress-list">
                                                            <ul className="c-review-overall-box__progress-list-items">
                                                                <li className={"c-review-overall-box__progress-list-item " + (data.stars[4] != 0 ? "" : "c-review-overall-box__progress-list-item--no-info")}>
                                                                    <div className="c-review-overall-box__progress-list-progress progress">
                                                                        <div className="c-review-overall-box__progress-list-progress-bar progress-bar" role="progressbar" style={{ width: parseInt((data.stars[4] / data.totalCount) * 100) + '%' }} aria-valuenow={parseInt((data.stars[4] / data.totalCount) * 100)} aria-valuemin="0"
                                                                            aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className="c-review-overall-box__progress-list-stats">
                                                                        <span className="c-review-overall-box__progress-list-stats-star-count">5 Stars</span>
                                                                        <span className="c-review-overall-box__progress-list-stats-percentage-count">{data.stars[4] == 0 ? 0 : parseInt((data.stars[4] / data.totalCount) * 100)}%</span>
                                                                    </div>
                                                                </li>
                                                                <li className={"c-review-overall-box__progress-list-item " + (data.stars[3] != 0 ? "" : "c-review-overall-box__progress-list-item--no-info")}>
                                                                    <div className="c-review-overall-box__progress-list-progress progress">
                                                                        <div className="c-review-overall-box__progress-list-progress-bar progress-bar" role="progressbar" style={{ width: parseInt((data.stars[3] / data.totalCount) * 100) + '%' }} aria-valuenow={parseInt((data.stars[3] / data.totalCount) * 100)} aria-valuemin="0"
                                                                            aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className="c-review-overall-box__progress-list-stats">
                                                                        <span className="c-review-overall-box__progress-list-stats-star-count">4 Stars</span>
                                                                        <span className="c-review-overall-box__progress-list-stats-percentage-count">{data.stars[3] == 0 ? 0 : parseInt((data.stars[3] / data.totalCount) * 100)}%</span>
                                                                    </div>
                                                                </li>
                                                                <li className={"c-review-overall-box__progress-list-item " + (data.stars[2] != 0 ? "" : "c-review-overall-box__progress-list-item--no-info")}>
                                                                    <div className="c-review-overall-box__progress-list-progress progress">
                                                                        <div className="c-review-overall-box__progress-list-progress-bar progress-bar" role="progressbar" style={{ width: parseInt((data.stars[2] / data.totalCount) * 100) + '%' }} aria-valuenow={parseInt((data.stars[4] / data.totalCount) * 100)} aria-valuemin="0"
                                                                            aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className="c-review-overall-box__progress-list-stats">
                                                                        <span className="c-review-overall-box__progress-list-stats-star-count">3 Stars</span>
                                                                        <span className="c-review-overall-box__progress-list-stats-percentage-count">{data.stars[2] == 0 ? 0 : parseInt((data.stars[2] / data.totalCount) * 100)}%</span>
                                                                    </div>
                                                                </li>
                                                                <li className={"c-review-overall-box__progress-list-item " + (data.stars[1] != 0 ? "" : "c-review-overall-box__progress-list-item--no-info")}>
                                                                    <div className="c-review-overall-box__progress-list-progress progress">
                                                                        <div className="c-review-overall-box__progress-list-progress-bar progress-bar" role="progressbar" style={{ width: parseInt((data.stars[1] / data.totalCount) * 100) + '%' }} aria-valuenow={parseInt((data.stars[4] / data.totalCount) * 100)} aria-valuemin="0"
                                                                            aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className="c-review-overall-box__progress-list-stats">
                                                                        <span className="c-review-overall-box__progress-list-stats-star-count">2 Stars</span>
                                                                        <span className="c-review-overall-box__progress-list-stats-percentage-count">{data.stars[1] == 0 ? 0 : parseInt((data.stars[1] / data.totalCount) * 100)}%</span>
                                                                    </div>
                                                                </li>
                                                                <li className={"c-review-overall-box__progress-list-item " + (data.stars[0] != 0 ? "" : "c-review-overall-box__progress-list-item--no-info")}>
                                                                    <div className="c-review-overall-box__progress-list-progress progress">
                                                                        <div className="c-review-overall-box__progress-list-progress-bar progress-bar" role="progressbar" style={{ width: parseInt((data.stars[0] / data.totalCount) * 100) + '%' }} aria-valuenow={parseInt((data.stars[4] / data.totalCount) * 100)} aria-valuemin="0"
                                                                            aria-valuemax="100"></div>
                                                                    </div>
                                                                    <div className="c-review-overall-box__progress-list-stats">
                                                                        <span className="c-review-overall-box__progress-list-stats-star-count">1 Stars</span>
                                                                        <span className="c-review-overall-box__progress-list-stats-percentage-count">{data.stars[0] == 0 ? 0 : parseInt((data.stars[0] / data.totalCount) * 100)}%</span>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="c-review-overall-box__footer">
                                                        <button className="c-button c-button--outlined c-button--lg" onClick={() => { props.startReviewWrite() }}>Write a Customer Review</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="c-reviews__reviews-list" style={{ width: '100%' }}>
                                            <div className="c-reviews-list">
                                                <div className="c-reviews-list__container">
                                                    <div className="c-reviews-list__content">
                                                        <ul className="c-reviews-list__items">
                                                            {reviewData.map(getReviewItem)}
                                                        </ul>
                                                    </div>
                                                    <div className="c-reviews-list__mobile-action">
                                                        <button className="c-button c-button--full-width">See All Reviews</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="c-tab-box__tab-action">
                                                        <span>See all 26 Questions</span>
                                                        <i className="icon__fsd icon__fsd--arrow-down-primary"></i>
                                                    </div> */}
                        </div>
                    </div>
                </div>
                {/* <div className="p-product-detail__review-questions-mobile">
                                                @@include('./components/reviews.html')
                                                @@include('./components/questions-answers.html')
                                              </div> */}
            </div>
        </div>

    )
}
export default withApp(Review);