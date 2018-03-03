// 애플리케이션 역할

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const user = require('./api/user') //index 생략해도 자동으로 index.js를 들고온다.

// for parsing "application/json"
app.use(bodyParser.json());
// for parsing "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({ extended: true }))

// 이렇게 해두면 package.json 의 script 부분에
// NODE_ENV = test 라고 해두었으니
// 테스트 환경일때는 로그가 보이지 않을 것이다.
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
}

app.use('/users', user); // users로 들어오는 요청은 user 모듈이 담당하겠다.


// app.listen(3000, () => {
//     console.log('server is running');
// })

module.exports = app;