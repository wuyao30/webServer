const blogList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'title A',
            content: 'content A',
            createTime: '1594279426877',
            author: 'salted'
        },
        {
            id: 2,
            title: 'title B',
            content: 'content B',
            createTime: '1594279447278',
            author: 'fish'
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: 'title A',
        content: 'content A',
        createTime: '1594279426877',
        author: 'salted'
    }
}

const newBlog = (blogData = {}) => {
    //:TODO
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    return true
}

const delBlog = id => {
    return true
}

module.exports = {
    blogList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}