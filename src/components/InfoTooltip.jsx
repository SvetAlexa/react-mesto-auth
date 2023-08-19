import RegisterOk from "../images/RegisterOk.jpg";
import RegisterCancel from '../images/RegisterCancel.jpg'
import { useEffect } from "react";

export default function InfoTooltip({ isOpen, registerStatus, onClose, onOverlay, onEscClick }) {

      useEffect(() => {
        if(isOpen) {
            document.addEventListener('keydown', onEscClick)
        }
    }, [isOpen])

    return (
        <div className={`popup popup_type_infotooltop ${isOpen ? 'popup_is-opened' : ''}`}
            onClick={onOverlay}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img className="popup__infotooltop-img" src={registerStatus.status ? RegisterOk : RegisterCancel} alt={registerStatus ? 'ок'
                    : 'ошибка'} />
                <h2 className="popup__infotooltop-title">{registerStatus.title}</h2>
            </div>
        </div>
    )
}