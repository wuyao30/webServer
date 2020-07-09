const http = require('http')
const queryString = require('querystring')

const server = http.createServer((request, response) => {
    console.log('request url:', request.url)
    const url = request.url
    console.log('request method: ', request.method)
    request.query = queryString.parse(url.split('?')[1])
    console.log('query params: ', request.query)
    response.end(
        JSON.stringify(request.query)
    )
})

server.listen(8888)