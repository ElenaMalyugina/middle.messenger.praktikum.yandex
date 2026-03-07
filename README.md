Мессенджер
Учебный проект на курсе Миддл-фронтенд-разработчик Яндекс Практикума
Находится в разработке.
На данном этапе выполнена базовая верстка, разбивка на компоненты.
Возможно, по мере уточнения ТЗ разбивка будет пересмотрена

Запуск
npm run dev - локальная версия для разработки
npm run build - сборка прод-версии
npm run start - сборка прод-версии и сразу же ее запуск на http://localhost:3000

Дизайн
https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link
от яндекс-практикума.

Демо тут
https://mf1-messenger.netlify.app
Временно, пока netlify заблочен за превышение запросов (ориентировочно до 23 марта 2026)

Vercel
https://middle-messenger-praktikum-yandex-eosin.vercel.app/

Демо 
https://elenamalyugina.github.io/middle.messenger.praktikum.yandex/ 
Возможны ошибки в роутах из-за специфической среды исполнения - пришлось создавать отдельную ветку с не очень хорошим местами кодом (gh-deploy)


Пути 
"/chat" - чат;
"/" - чат;
"/login" -  логин
/registration" - регистрация;
"/profile" - профиль;    
"/edit-profile" - редактирование профиля;    
"/change-password" - смена пароля ;
"/not-found" - не найдено
"/server-error" - 500 ошибка
