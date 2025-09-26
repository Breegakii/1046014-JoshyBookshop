const key = 'authToken'
const userKey = 'user'
const refresh = 'refreshToken'

const storeToken = (authToken) => {
    localStorage.setItem(key, authToken)
}

const getToken = () => {
    return localStorage.getItem(key)
}

const removeToken = () => {
    localStorage.removeItem(key)
}

const storeRefreshToken = (refreshToken) => {
    localStorage.setItem(refresh, refreshToken)
}

const getRefreshToken = () => {
    return localStorage.getItem(refresh)
}

const removeRefreshToken = () => {
    localStorage.removeItem(refresh)
}

const storeUser = (user) => {
    localStorage.setItem(userKey, JSON.stringify(user))
}

const getUser = () => {
    return JSON.parse(localStorage.getItem(userKey))
}

const removeUser = () => {
    localStorage.removeItem(userKey)
}


export default {
    storeToken,
    getToken,
    removeToken,
    storeUser,
    getUser,
    removeUser,
    storeRefreshToken,
    getRefreshToken,
    removeRefreshToken
}