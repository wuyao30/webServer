const login = (username, password) => {
    if(username === 'salted' && password === 'fish') {
        return true
    } else {
        return false
    }
}

module.exports = {
    login
}