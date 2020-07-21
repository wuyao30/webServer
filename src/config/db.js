const env = process.env.NODE_ENV

let MYSQL_CONFIG

if(env ==='development') {
    MYSQL_CONFIG = {
        host: '47.104.157.76',
        user:'root',
        password: 'yawei110',
        port: '3306',
        database: 'test'
    }
}

if(env ==='production') {
    MYSQL_CONFIG = {
        host: '47.104.157.76',
        user:'root',
        password: 'yawei110',
        port: '3306',
        database: 'test'
    }
}

module.exports = {
    MYSQL_CONFIG
}