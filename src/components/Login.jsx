export default function Login() {

    return (
        <div className="sign">
        <h2 className="sign__title">Вход</h2>
        <form className="sign__form" name="login-form" noValidate>
            <ul className="sign__input-list">
                <li className="sign__input-item">
                    <input className="sign__input" type="email" name="login-email" placeholder="Email" />
                </li>
                <li className="sign__input-item">
                    <input className="sign__input" type="password" name="login-password" placeholder="Пароль" />
                </li>
            </ul>
            <button className="sign__button sign__button_type_login" type="submit" name="submit">Войти</button>
        </form>
    </div>
    )
}