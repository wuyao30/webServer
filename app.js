const http = require('http')
const queryString = require('querystring')

const server = http.createServer((request, response) => {
    const method = request.method
    if(method === 'GET') {
        const url = request.url
        request.query = queryString.parse(url.split('?')[1])
        response.end(
        JSON.stringify(request.query)
        )
    } else if (method === 'POST') {
        const conttentType = request.headers['content-type']
        console.log('request content type:', conttentType)
        let postData = ''
        request.on('data', chunk => {
            postData += chunk.toString()
        })
        request.on('end', () => {
            response.end(postData)
        })
    } else {
        response.end('')
    }
})

server.listen(8888)