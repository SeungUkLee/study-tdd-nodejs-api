// sync-db.js 파일은 데이터베이스를 sync 하는 모듈

const models = require('../models')

module.exports = () => {
    return models.sequelize.sync({force: true}) // force: true 는 기존의 DB가 있더라도 다 날리고 새로 만든다.
}
// sequelize.sync는 내부적으로 Promise를 리턴한다. 그래서 비동기 처리를 완료할 수 있도록 인터페이스를 제공해준다.