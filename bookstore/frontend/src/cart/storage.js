const key = 'cartId'

const storeCartId = (cartId) => {
    localStorage.setItem(key, cartId)
}

const removeCartId = () => {
    localStorage.removeItem(key)
}

const getCartId = () => {
    return localStorage.getItem(key)
}

export default {
    storeCartId,
    removeCartId,
    getCartId
}