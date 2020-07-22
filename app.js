const handlerUserRouter = require('./src/router/user')
const handlerBlogRouter = require('./src/router/blog')
const queryString = require('querystring')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

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

const SESSION_DATA = {}

const serverHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = queryString.parse(url.split('?')[1])

    req.cookie = {}
    const cookieString = req.headers.cookie || ''
    cookieString.split(';').forEach(item => {
        if(!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0]
        const val = arr[1]
        req.cookie[key] = val
    })

    //初始化session
    let needSetCookie = false
    let userId = req.cookie.userid
    if(userId) {
        if(!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    
    
    getPostData(req).then(postData => {
        req.body = postData
        //处理 blog router
        // const blogData = handlerBlogRouter(req, res)
        // if(blogData) {
        //     res.end(JSON.stringify(blogData))
        //     return
        // }
        const blogResult = handlerBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
                if(needSetCookie) {
                    res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }
        //handler user router
        // const userData = handlerUserRouter(req, res)
        // if(userData) {
        //     res.end(JSON.stringify(userData))
        //     return
        // }
        const userResulet = handlerUserRouter(req, res)
        if(userResulet) {
            userResulet.then(userData => {
                if(needSetCookie) {
                    res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.write("404 NOT FOUNT")
        res.end()
    })
}

module.exports = serverHandler