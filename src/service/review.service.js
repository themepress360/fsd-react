import { axiosfsd } from "./axios";
import PdpService from "./pdp.service";

export default class ReviewService extends PdpService {
    constructor(props) {
        super(props);
        console.log(this.sku);
    }
    getReviewData(sku) {
        return new Promise((resolve, reject) =>
            axiosfsd.get(`/products/${sku}/reviews`)
                .then(res => resolve(res.data))
                .catch(err => reject(err)));
    }

    writeReview(sku, RatingVal, username, reviewTitle, reviewDescription) {
        return new Promise((resolve, reject) =>
            axiosfsd.post(`/products/writereview`, {
                "reviewData": {
                    "sku": sku,
                    "nickname": username,
                    "title": reviewTitle,
                    "detail": reviewDescription,
                    "ratingData": [
                        {
                            "rating_code": "Rating",
                            "rating_value": RatingVal,
                        }
                    ]
                }
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err)));
    }
}