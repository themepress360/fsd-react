import React, { useState } from 'react';
import ReviewService from '../../service/review.service';
import withApp from '../../higherorder';
import ReactDOM from 'react-dom';
const ModalPopupProductReview = (props) => {
    console.log(props)
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const pdpService = new ReviewService({});

    const submitReview = (event) => {
        event.preventDefault();
        pdpService.writeReview(props.sku, rating, username, title, message).then(res => {
            console.log("review: ", res)
            if (res.status == false)
                alert(res.message);
            if (props.onClose)
                props.onClose()
        }).catch(err => {
            alert(err)
            if (props.onClose) props.onClose()
        });

    }

    if (!props.isDidPurchase) {
        return ReactDOM.createPortal(<div style={{ zIndex: '99999999999' }} className="modal-fsd">
            <div className="modal-fsd-content review">
                <span style={{ fontSize: '200%' }} className="close right-align" onClick={() => { if (props.onClose) props.onClose() }}>&times;</span>
                <h2>Write Review</h2>
                <form onSubmit={submitReview}>
                    <p style={{ fontSize: "115%", marginBottom: "16px", marginTop: "16px" }}>Please <a href="/customer/account/login/">signin</a> or purchase this item to write review.</p>
                    <div className="full-width mt-3 text-right" >
                        <input type="button" value="Cancel" onClick={() => { if (props.onClose) props.onClose() }} name="Cancel" className="c-button c-button--outline" />
                        {/* <span className="ml-3">  <input type="submit" value="" name="Submit" className="c-button c-button--primary" /> </span> */}
                    </div>
                </form>
            </div>
        </div>
            , document.body)
    }

    // const sku = props.sku;
    return ReactDOM.createPortal(<div style={{ zIndex: '99999999999' }} className="modal-fsd">
        <div className="modal-fsd-content review">
            <span style={{ fontSize: '200%' }} className="close right-align" onClick={() => { if (props.onClose) props.onClose() }}>&times;</span>
            <h2>Write Review</h2>
            {/* <hr /> */}
            <form onSubmit={submitReview}>
                <input type="text" name="title" value={title} className="c-text-input mt-3 mb-2 " onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input type="text" name="lname" value={username} className="c-text-input mb-2" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                {/* <br />
                <label className="fsd-review-label"></label> */}
                <div className={"my-2 c-rating " + (rating > 0 ? ' c-rating--' + rating : '')}>
                    <ul style={{ fontSize: '26px' }} className="c-rating__stars">
                        <li className="c-rating__star" onClick={() => setRating(1)}></li>
                        <li className="c-rating__star" onClick={() => setRating(2)}></li>
                        <li className="c-rating__star" onClick={() => setRating(3)}></li>
                        <li className="c-rating__star" onClick={() => setRating(4)}></li>
                        <li className="c-rating__star" onClick={() => setRating(5)}></li>
                    </ul>
                </div>
                {/* <br /> */}
                <textarea style={{ height: '5em' }} className="c-text-input" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
                {/* <hr /> */}
                <div className="full-width mt-3 text-right" >
                    <input type="button" value="Cancel" onClick={() => { if (props.onClose) props.onClose() }} name="Cancel" className="c-button c-button--outline" />
                    <span className="ml-3">  <input type="submit" value="Submit" name="Submit" className="c-button c-button--primary" /> </span>

                </div>
            </form>
        </div>
    </div>
        , document.body)
}

export default withApp(ModalPopupProductReview);