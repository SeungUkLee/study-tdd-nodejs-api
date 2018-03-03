// api logic (controller)

const models = require('../../models');

const index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);

    if (Number.isNaN(limit)) {
        return res.status(400).end()
    }

    models.User
        .findAll({
            limit: limit
        }) // findAll은 실행되고 나면 Promise를 리턴함.
        .then(users => {
            res.json(users);
        })
}

const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    // const user = users.filter(user => user.id === id)[0];
    
    models.User.findOne({
        where: {id} // {id: id}
    }).then(user => {
        if (!user) return res.status(404).end()
        res.json(user)
    })
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end()

    // users = users.filter(user => user.id !== id);
    models.User.destroy({
        where: {id}
    }).then(() => {
        res.status(204).end();
    })
}

const create = (req, res) => {
    const name = req.body.name
    if (!name) return res.status(400).end();

    // const isConflict = users.filter(user => 
    //     user.name === name
    // ).length

    // if (isConflict) return res.status(409).end()

    models.User.create({name})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            // console.log(err) // error 이름 확인 이것을 통해 응답 코드 작성.
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end()                
            }
            res.status(500).end()
        })

    // const id = Date.now();
    // const user = {id, name};
    // users.push(user)
}

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end()
    
    const name = req.body.name;
    if (!name) return res.status(400).end()

    // const isConflict = users.filter(user => user.name === name).length;
    // if (isConflict) return res.status(409).end();

    // const user = users.filter(user => user.id === id)[0]
    // if (!user) return res.status(404).end();

    // user.name = name
    
    models.User.findOne({where: id})
        .then(user => {
            if (!user) return res.status(404).end()
            
            user.name = name;
            user.save()
                .then(_=>{
                    res.json(user);
                })
                .catch(err => {
                    // console.log(err)
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        return res.status(409).end();
                    }
                    res.status(500).end()
                })
        })
}

// module.exports = {
//     index: index,
//     show: show,
//     destroy: destroy,
//     create: create,
//     update: update,
// }

// es6 문법으로 위와 같다.
module.exports = {
    index, show, destroy, create, update,
}