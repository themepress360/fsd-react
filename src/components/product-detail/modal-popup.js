import React from 'react';
import withApp from '../../higherorder';

const ModalPopup = (props) => {

    const submitClicked = (event) => {
        event.preventDefault();

        if (props.submitClicked)
            props.submitClicked();
        else
            alert("submit is clicked");
    }

    const positiveButtonLabel = props.positiveButtonLabel || "Submit";
    const isControlsOpen = props.isControlsOpen || true;
    const negativeButtonLabel = props.negativeButtonLabel || "Cancel";

    // const sku = props.sku;
    return (<div style={{ zIndex: '99999999999' }} className="modal-fsd">
        <div className="modal-fsd-content review">
            <span style={{ fontSize: "200%" }} className="close right-align" onClick={() => { if (props.onClose) props.onClose() }}>&times;</span>
            <h2>{props.title}</h2>
            <hr />
            <form onSubmit={submitClicked}>
                {props.children}
                {isControlsOpen === true ? (<hr />) : ""}
                {isControlsOpen === true? (<div className="full-width mt-3 text-right" >
                    <input type="button" style={{marginRight:"10px"}} value={negativeButtonLabel} onClick={() => { if (props.onClose) props.onClose() }} name="cancel" className="c-button c-button--outline" />
                    {positiveButtonLabel.length !== 0 ? (
                        <input type="submit" value={positiveButtonLabel} name="submit" className="c-button c-button--primary" />) : ""}
                </div>) : ""}
            </form>
        </div>
    </div>
    )
}

export default withApp(ModalPopup);