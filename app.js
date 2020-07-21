const handlerUserRouter = require('./src/router/user')
const handlerBlogRouter = require('./src/router/blog')
const queryString = require('querystring')
const { resolve } = require('path')

// 获取post请求的数据
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', ()=> {
            if(!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    }) 
}


const serverHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = queryString.parse(url.split('?')[1])
    getPostData(req).then(postData => {
        req.body = postData

        //处理 blog router
        const blogData = handlerBlogRouter(req, res)
        if(blogData) {
            res.end(JSON.stringify(blogData))
            return
        }
        //handler user router
        const userData = handlerUserRouter(req, res)
        if(userData) {
            res.end(JSON.stringify(userData))
            return
        }
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.write("404 NOT FOUNT")
        res.end()
    })
}

module.exports = serverHandler