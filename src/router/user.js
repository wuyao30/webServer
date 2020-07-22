const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const user = require('../controller/user')

const handleUserRouter = (req, res) => {
    const method = req.method

    if(method === 'POST' && req.path==='/api/user/login') {
        const {username, password} = req.body
        return login(username, password).then(data => {
            if(data) {
                return new SuccessModel()
            } else {
                return new ErrorModel('login error')
            }
        })
    }
}

module.exports = handleUserRouter
