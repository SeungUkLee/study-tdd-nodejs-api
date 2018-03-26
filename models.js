const Sequelize = require('sequelize') // 클래스라서 앞글자 대문자 사용
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false, // console.log함수와 바인딩되어 있음. 테스트할때 쿼리 로그가 안보임.
}) // DB와 연동하기 위해 객체 생성

// 1번째: 만들 테이블 명, 2번째: 테이블 속성 정의
const User = sequelize.define('User', {
    // id는 자동으로 생성됨
    name: {
        type: Sequelize.STRING,
        unique: true
    }
}) // User 모델 정의

module.exports = { Sequelize, sequelize, User }