import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.owner._id === currentUser._id;

    const isLiked = props.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );;

    function handleClick() {
        props.onCardClick(props.name, props.link);
    }

    function handleDeleteClick() {
        props.onCardDelete(props);
    }

    function handleLikeClick() {
        props.onCardLike(props);
    }

    return (
        <li className="element">
            <img className="element__img" src={props.link} alt={props.name} onClick={handleClick} />
            {isOwn && <button className="element__trash" type="button" aria-label="Удалить" onClick={handleDeleteClick} />}
            <div className="element__caption">
                <h2 className="element__text">{props.name}</h2>
                <div className="section__like">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick} />
                    <span className="element__like-count">{props.likes.length}</span>
                </div>
            </div>
        </li>
    );
}
export default Card;