const queryString = require('querystring')

const handleUserRouter = (req, res) => {
    const method = req.method

    if(method === 'GET' && req.path==='/api/user/login') {
        return {
            msg:'login interface'
        }
    }
}

module.exports = handleUserRouter
