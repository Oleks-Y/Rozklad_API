 # RozkladApi
 
 Это АПИ для упрощения управления рассписанием нашей группы. 
 Основная идея заключается в том, чтобы иметь рассписание с готовыми ссылками на конференции и с необходимыми выборочными предметами. 
 
 #Технологии
 АПИ построен с помощью Serverless Framework, для разворачивания с использованием AWS Lamda и API Gateway. 
 Используется Node.js 12 с typescript , и MongoDB .
 
 #Развертование
 Для развертования в вашем AWS аккаунте: 
 ```
npm install 
sls deploy
```
#Api Reference
Документацию можно найти в файле
[a openapi.yml](openapi.yml) 


