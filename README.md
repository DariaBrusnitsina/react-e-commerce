## Функционал приложения
### Frontend-часть проекта [11/11]
- [x] Добавление списка элементов:
  1. Через GET-запрос от сервера выводится:
     - список товаров и список категорий – /shop
  2. Через GET-запрос к localStorage выводится:
     - список элементов корзины – /cart
- [x] Реализован Loader
  - Skeleton-loader на странице Home – /
  - Skeleton-loader на странице Shop – /shop
  - ClipLoader в навигационном компоненте NavProfile 
- [x] Cтраницы, реализованные с помощью React Router
  - Home – /
  - About – /about
  - Contact – /contact
  - Shop – /shop
  - Cart – /cart
  - Auth: Login & Registration – /auth/*
  - Admin – /admin
- [x] Cтраницы отдельного элемента
  - ShopItem – /shop/:id
  - Profile & ProfileEdit – /profile/edit
- [x] Базовые компоненты
  - productCard – / & /shop
  - itemCard – /cart & /profile
- [x] Формы отправки
  - Login form group – /auth/login
  - Registration form group – /auth/register
  - Edit form – /profile/edit
  - Cart Checkout – /cart
  - Add/Edit item/category – /admin
- [x] Кастомные хуки
  - useCart
- [x] Приватная страница
  - /profile
  - /admin
- [x] Редактирование элементов
  - Edit profile – /profile/edit
  - Edit item/category – /admin
- [x] Удаление элементов
  - Delete item/category на клиенте и на сервере – /admin
  - Clear cart удаление элемента корзины из localStorage – /cart
- [x] Использование библиотеки для управления состоянием 
  - Redux для храненния данных
    - items
    - categories
    - users
    - admin

### Backend-часть проекта [8/8]
- [x] Настройка Express
- [x] Обработка GET-запросов
  - items
  - categories
  - users
  - admin
- [x] Обработка POST-запросов
  - items
  - categories
  - users
  - auth
- [x] Обработка PUT/PATCH-запросов
  - items
  - categories
  - users
- [x] Обработка DELETE-запросов
  - items
  - categories
- [x] Создание модели mongoose
  - Admin
  - Categories
  - User
  - Items
  - Token
- [x] Авторизация и регистрация
- [x] Использование middleware
  - auth.middleware.js











