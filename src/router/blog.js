const { blogList, getDetail, newBlog, updateBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author
        const keyword = req.query.keyword
        const blogData = blogList(author, keyword)
        return new SuccessModel(blogData)
    }
    
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SuccessModel(data)
    }
    
    if(method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }
    
    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel(result)
        } else{
            return new ErrorModel('update error')
        }
        
    }

    //delete a blog

}


module.exports = handleBlogRouter