import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({ isOpen, isLoading, card, onClose, onCardDelete, onOverlay, onEscClick }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card)
    }

    useEffect(() => {
        if(isOpen) {
            document.addEventListener('keydown', onEscClick)
        }
    }, [isOpen])

    return (
        <PopupWithForm name="delete" title="Вы уверены?" buttonText={`${!isLoading ? "Да" : "Удаление..."}`}
            isOpen={isOpen}
            onClose={onClose}
            onOverlay={onOverlay}
            onSubmit={handleSubmit} >
        </PopupWithForm>
    )

}