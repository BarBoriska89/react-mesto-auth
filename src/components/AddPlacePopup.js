import React from "react";
import PopupWithForm from "./PopupWithForm ";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [placeName, setPlaceName] = React.useState("");
    const [placeLink, setPlaceLink] = React.useState("");

    React.useEffect(() => {
        if (isOpen) {
            setPlaceName("");
            setPlaceLink("");
        }
    }, [isOpen]);

    function handlePlaceNameChange(e) {
        setPlaceName(e.target.value);
    }

    function handlePlaceLinkChange(e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isOpen) {
            onAddPlace({
                name: placeName,
                link: placeLink
            });
        }
    }

    return (

        <PopupWithForm isOpen={isOpen}
            onClose={onClose}
            title={"Новое место"}
            name={"add-place"}
            buttonText={"Создать"}
            onSubmit={handleSubmit}

        >
            <div className="popup__form-section">
                <input value={placeName} type="text" placeholder="Название" className="popup__input popup__input_type_place"
                    name="place-title" id="place-name" minLength="2" maxLength="30" required onChange={handlePlaceNameChange} />
                <span className="popup__error" id="place-title-error"></span>
            </div>
            <div className="popup__form-section">
                <input value={placeLink} type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_place-img"
                    name="place-img" id="url-for-img" required onChange={handlePlaceLinkChange} />
                <span className="popup__error" id="url-for-img-error"></span>
            </div>

        </PopupWithForm>
    );
}
export default AddPlacePopup;