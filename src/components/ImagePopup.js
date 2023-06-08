import React from "react";
import closeIconPath from '../images/Close-Icon.png';

function ImagePopup(props) {

    return (
        <div className={`popup popup_overlay ${props.card ? "popup_opened" : ""}`} id="popup-view-img">
            <div className="popup__view-container">
                <button className="popup__button-close button" type="button" aria-label="Закрыть окно" onClick={props.onClose}>
                    <img src={closeIconPath} alt="Крестик закрытия окна"
                        className="popup__button-close-img" />
                </button>
                <figure className="popup__view">
                    <img className="popup__view-img" src={`${props.card ? props.card.link : ""}`} alt={`${props.card ? props.card.name : ""}`} />
                    <figcaption className="popup__view-img-caption">{`${props.card ? props.card.name : ""}`}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;