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

module.exports = {
    blogList,
    getDetail
}