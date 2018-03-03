// 서버를 run해주는 역할

const app = require('../index')
const syncDb = require('./sync-db')

syncDb().then(_=> {
    console.log('Sync database!')
    app.listen(3000, () => {
        console.log('Server is running 3000 port')
    })
})