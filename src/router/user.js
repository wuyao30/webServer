const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const user = require('../controller/user')


const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method

    if(method === 'GET' && req.path==='/api/user/login') {
        // const {username, password} = req.body
        const {username, password} = req.query
        return login(username, password).then(data => {
            if(data) {
                res.setHeader('Set-cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SuccessModel()
            } else {
                return new ErrorModel('login error')
            }
        })
    }

    if(method==='GET' && req.path === '/api/user/login-test') {
        if(req.cookie.username) {
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('login error'))
    }
}

module.exports = handleUserRouter
