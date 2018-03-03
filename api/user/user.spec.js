// test code

const request = require('superTest');
const should = require('should');

const app = require('../..') // ../../index
const models = require('../../models')

describe('GET /users는', () => {
    const users = [
        {name: 'alice'}, {name: 'bek'}, {name: 'chris'}
    ]
    // before(done => {
    //     models.sequelize.sync({force: true}).then(_=> done())
    // })

    // mocha에서는 Promise를 리턴하면 자동으로 비동기가 완료될때까지 보장한다.
    // 그래서 위 before() 코드 대신 밑에처럼 사용가능.
    before(() => models.sequelize.sync({force: true}))
    before(() => models.User.bulkCreate(users)) // sample data 추가

    describe('성공시', () => {
        // it.only() 이것만 테스트하겠다라는 의미.
        it('유저 객체를 담은 배열로 응답한 ', done => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        })

        it('최대 limit 갯수만큼 응답한다.', () => {
            request(app)
                .get('/user?limit=2')
                .end((err, res) => {
                    res.body.should.be.lengthOf(2)
                    done();
                })
        })
    })

    describe('실패시 ', () => {
        it('limit가 숫자형이 아니면 400을 응답. ', done => {
            request(app)
                .get('/users?limit=2')
                .end(done);
        })
    })
})

describe('GET /users/:id' , () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}]
    before(() => models.sequelize.sync({force: true}))
    before(() => models.User.bulkCreate(users))

    describe('성공시', () => {
        it('id가 1인 유저 객체 반환', done => {
            request(app)
                .get('/users/1')
                .end((req, res) => {
                    res.body.should.be.property('id', 1)
                    done()
                })
        })
    })

    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답', done => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done)
        })

        it('id로 유저를 찾을수 없을 경우 404 응답.', done => {
            request(app)
                .get('/users/0')
                .expect(404)
                .end(done)
        })
    })
})

describe('DELETE /users/:id' , () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}]
    before(() => models.sequelize.sync({force: true}))
    before(() => models.User.bulkCreate(users))

    describe('성공시', () => {
        it('204를 응답한다', done => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done)
        })
    })

    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다.', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done)
        })
    })
})

describe('POST /users' , () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}]
    before(() => models.sequelize.sync({force: true}))
    before(() => models.User.bulkCreate(users))

    describe('성공시', () => {
        before(done => {
            request(app)
                .post('/users')
                .send({ name: 'daniel' })
                .end((err, res) => {
                    body = res.body
                    done()
                });
        })

        it('생성된 유저 객체를 반환한다.', () => {
            body.should.have.property('id')
        })
        
        it('입력한 name을 반환한다.', () => {
            body.should.have.property('name', 'daniel')
        })
    })

    describe('실패시', () => {
        it('name 파라메타 누락시 400을 반환', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })
        it('name이 중복일 경우 409을 반환', done => {
            request(app)
                .post('/users')
                .send({ name: 'daniel' })
                .expect(409)
                .end(done)
        })
    })
})

describe('PUT /users/:id', () => {
    const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}]
    before(() => models.sequelize.sync({force: true}))
    before(() => models.User.bulkCreate(users))

    describe('성공시', () => {
        it('변경된 name을 응답한다.', done => {
            let name = 'chally'
            request(app)
                .put('/users/3')
                .send({ name: name })
                .end((err, res) => {
                    res.body.should.have.property('name', name)
                    done()
                })
        })
    })

    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400 응답', done => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done)
        })

        it('name이 없을 경우 400 응답', done => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done)
        })

        it('없는 유저일 경우 404 응답', done => {
            request(app)
                .put('/users/0')
                .send({name: 'foo'})
                .expect(404)
                .end(done)
        })

        it('이름이 중복일 경우 409 응답', done => {
            request(app)
                .put('/users/3')
                .send({ name: 'bek' })
                .expect(409)
                .end(done)
        })
    })
})