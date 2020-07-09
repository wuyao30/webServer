const handleBlogRouter = (req, res) => {
    const method = req.method

    if(method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg : 'get blog list interface'
        }
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