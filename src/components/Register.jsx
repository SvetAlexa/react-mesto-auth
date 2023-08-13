import { Link } from "react-router-dom";

export default function Register() {

    return (
        <div className="sign">
            <h2 className="sign__title">Регистрация</h2>
            <form className="sign__form" name="register-form" noValidate>
                <ul className="sign__input-list">
                    <li className="sign__input-item">
                        <input className="sign__input" type="email" name="register-email" placeholder="Email" />
                    </li>
                    <li className="sign__input-item">
                        <input className="sign__input" type="password" name="register-password" placeholder="Пароль" />
                    </li>
                </ul>
                <button className="sign__button sign__button_type_register" type="submit" name="submit">Зарегистрироваться</button>
            </form>
            <div className="sign__redirect-container">
                <p className="sign__redirect-title">Уже зарегистрированы? </p>
                <Link to="/sign-in" className="sign__redirect-link">Войти</Link>
            </div>
        </div>
    )
}