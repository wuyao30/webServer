const http = require('http')
const queryString = require('querystring')

const server = http.createServer((request, response) => {
    const method = request.method
    const url = request.url
    const path = url.split('?')[0]
    const query = queryString.parse(url.split('?')[1])
    
    //set reponse data format
    response.setHeader('Content-Type', 'application/json')
    const resData = {
        method,
        url,
        path,
        query
    }
    if(method === 'GET') {
        response.end(
            JSON.parse(resData)
        )
    }

    if(method === 'POST') {
        let postData = ''
        request.on('data', chunk => {
            postData += chunk.toString()
        })
        request.on('end', () => {
            response.end(
                JSON.parse(postData)
            )
        })
    }
})

server.listen(8888)