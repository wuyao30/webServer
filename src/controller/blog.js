const { exec } = require('../db/mysql')

const blogList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }

    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc;`
    return exec(sql.toString())
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