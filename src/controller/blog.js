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
    let sql = `select * from blogs where id = ${id};`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    console.log(blogData)
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()

    let sql = `
        insert into blogs(title, content, createtime, author) 
        values ('${title}', '${content}', ${createtime}, '${author}');
    `
    return exec(sql).then(insertData => {
        console.log(insertData)
        return { id: insertData.insertId }
    })
}

const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    let sql = `
        update blogs set title = '${title}', content='${content}' where id = ${id}
    `
    return exec(sql).then(updateData => {
        console.log(updateData)
        if(updateData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}

const delBlog = (id, author) => {
    console.log(id, author)
    let sql = `delete from blogs where 1=1 and id=${id} and author='${author}'; `
    console.log(sql)
    return exec(id).then(result => {
        if(result.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}

module.exports = {
    blogList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}