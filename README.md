# Kanban Board

## Описание проекта

Это веб-приложение для управления задачами, где пользователь может легко создавать, редактировать
и перемещать задачи между различными колонками. Также пользователь может настраивать количество колонок,
создавая новые, редактируя и удаляя существующие.


## Цель задания

Основной целью данного задания является отработка следующих навыков:
- Взаимодействие с сервером: В рамках этого задания требуется создать механизм взаимодействия 
  с сервером для получения и отправки данных, необходимых для функционирования приложения. Это может включать 
  в себя использование HTTP-запросов, обработку ответов и ошибок сервера и обновление интерфейса при получении 
  обновлении данных. Разработка надежного и эффективного взаимодействия с сервером является ключевым аспектом 
  современного веб-разработки, который позволяет приложениям быть динамичными и актуальными.

- Работа с драг&дроп: В процессе выполнения задания необходимо реализовать функциональность драг&дроп для 
  перемещения задач между различными колонками.

- Создание собственного Ui-kit: Вам необходимо будет спроектировать и  разработать набор компонентов 
  пользовательского интерфейса (UI), который может быть многократно использован в проектах для обеспечения 
  единообразия и согласованности в дизайне и интеракции пользователей. Этот навык позволяет разработчикам эффективно работать над проектами, сокращая время разработки и обеспечивая качество и стиль.

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev - запуск сервера + frontend проекта в dev режиме

Используемая версия Node - v18.17.0
```

----

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design.

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Линтинг

В проекте используется eslint для проверки typescript кода.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin *eslint-plugin-zavalition-fsd*,
который содержит 3 правила
1) path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2) layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entities)
3) public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
----