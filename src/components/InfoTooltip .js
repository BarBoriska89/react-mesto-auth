import React from "react";
import closeIconPath from '../images/Close-Icon.png';
import successPicPath from '../images/Union.png';
import failPicPath from '../images/Union-fail.png'

function InfoTooltip(props) {

    return (

        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}
            id={`popup-${props.name}`}>
            <div className="popup__container">
                <button className="popup__button-close button" type="button" aria-label="Закрыть окно" onClick={props.onClose}>
                    <img src={closeIconPath} alt="Крестик закрытия окна"
                        className="popup__button-close-img" />
                </button>
                <img src={props.isSuccessfulRegistration ? successPicPath : failPicPath} alt="статус регистрации"
                    className="popup__regstatus-img" />
                <h2 className="popup__regstatus-text">{props.isSuccessfulRegistration ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</h2>

            </div>
        </div>
    );
}
export default InfoTooltip;