import React from "react";
import closeIconPath from '../images/Close-Icon.png';

function PopupWithForm(props) {
   
       return (

        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}
            id={`popup-${props.name}`}>
            <div className="popup__container">
                <button className="popup__button-close button" type="button" aria-label="Закрыть окно" onClick={props.onClose}>
                    <img src={closeIconPath} alt="Крестик закрытия окна"
                        className="popup__button-close-img" />
                </button>
                <form className="popup__form" id={props.name} name="editForm" noValidate onSubmit={props.onSubmit}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button className="popup__button" type="submit" aria-label="Сохранить изменения">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;