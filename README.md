# Проект: Место React

Учебный проект

Сервис **Место** - одностраничное приложение, где пользователи могут делиться своими фотографиями. А также редактировать свой профиль, ставить и удалять лайки, просматривать фотографии в большом формате.


**Данный репозиторий** - продолжение проекта [Mesto на React](https://github.com/SvetAlexa/mesto-react "https://github.com/SvetAlexa/mesto-react"). <br> 
В этой части реализована регистрация и авторизация пользователя. Вся функциональность проекта теперь доступна только авторизованным пользователям.


## Технологии

* Проект создан через ***CRA (Create React Component)***
* HTML разметка портирована в JSX
* Использованы функциональные компоненты
* Использованы хуки состояния и для создания «побочных эффектов»
* С помощью HOC ProtectedRoute защищен основной роут от неавторизованных пользователей
* Основная функциональность сайта подключена к бэкенду
* Реализована аутентификация пользователя
* Настроена работа с LocalStorage, чтобы при повторном визите пользователю не нужно было вновь авторизироваться
* Проект адаптирован для мобильных устройств

## Запуск проекта
* установить зависимости ```npm install```
* запустить сервер ```npm run start```
* запустить сборку ```npm run build```
* опубликовать сбоку на github pages ```npm run deploy```

## Ссылка на GitHub Pages

[Нажмите на ссылку](https://svetalexa.github.io/react-mesto-auth "https://svetalexa.github.io/react-mesto-auth")
