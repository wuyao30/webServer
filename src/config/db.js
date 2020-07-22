const env = process.env.NODE_ENV

let MYSQL_CONFIG
let REDIS_CONFIG

if(env ==='development') {
    MYSQL_CONFIG = {
        host: '47.104.157.76',
        user:'root',
        password: 'yawei110',
        port: '3306',
        database: 'test'
    }

    REDIS_CONFIG = {
        port: '6379',
        host: '47.104.157.76'
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

    REDIS_CONFIG = {
        port: '6379',
        host: '47.104.157.76'
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}