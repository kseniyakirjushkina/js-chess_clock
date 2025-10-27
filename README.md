# template-repo 
это шаблон для будущих домашек, перед выводом не забыть 

- [ ] поменять имя в `./package.json`
- [ ] поменять `README.md`
- [ ] настроить `./src`
- [ ] настроить тесты в папке `./tests` 
- - если это чтото с html то `./tests/e2e`
- - или `./tests/unit` для js
- [ ] почистить не нужные ci

перед работой с проектом, чтобы установить зависимости
```
npm i
```

запуск приложения
```
npm run dev
```

запуск тестов
```
npm run test
```
запуск e2e в удобном окне 
```
npx playwright test --ui
```

перегенерация скриншотов
```
npx playwright test --update-snapshots
```
## инструкция по настройке gh-pages для студента
для того чтобы включить деплой на gh-pages вам нужно
1. в вашем проекте настроить деплой из gh actions:
 - Settings -> Pages -> Build and deployment -> Source="GitHub Actions"
2. в файле .env поставить url репозитория
