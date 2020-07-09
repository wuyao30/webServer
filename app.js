const handlerUserRouter = require('./src/router/user')
const handlerBlogRouter = require('./src/router/blog')
const queryString = require('querystring')

const serverHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = queryString.parse(url.split('?')[1])

    const blogData = handlerBlogRouter(req, res)
    if(blogData) {
        res.end(JSON.stringify(blogData))
        return
    }
    const userData = handlerUserRouter(req, res)
    if(userData) {
        res.end(JSON.stringify(userData))
        return
    }

    res.writeHead(404, {"Content-Type": "text/plain"})
    res.write("404 NOT FOUNT")
    res.end()
}

module.exports = serverHandler