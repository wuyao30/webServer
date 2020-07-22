const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const user = require('../controller/user')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method

    if(method === 'GET' && req.path==='/api/user/login') {
        // const {username, password} = req.body
        const {username, password} = req.query
        return login(username, password).then(data => {
            if(data) {
                req.session.username = data.username
                req.session.realname = data.realname
                set(req.sessionId, req.session)
                return new SuccessModel()
            } else {
                return new ErrorModel('login error')
            }
        })
    }

    if(method==='GET' && req.path === '/api/user/login-test') {
        if(req.session.username) {
            return Promise.resolve(new SuccessModel({session: req.session}))
        }
        return Promise.resolve(new ErrorModel('login error'))
    }
}

module.exports = handleUserRouter
