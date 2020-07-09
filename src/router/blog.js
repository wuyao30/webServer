const { blogList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author
        const keyword = req.query.keyword
        const blogData = blogList(author, keyword)
        return new SuccessModel(blogData)
    }
    
    if(method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg : 'get blog detail interface'
        }
    }
    
    if(method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg : 'new a blog interface'
        }
    }
    
    if(method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg : 'update a blog interface'
        }
    }
    
}


module.exports = handleBlogRouter