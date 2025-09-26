import apiClient from "./client";

const endpoint = '/bookshop/carts'

const createCart = async() => await apiClient.post(`${endpoint}/`)
const getCart = async(id) => await apiClient.get(`${endpoint}/${id}/`)
const addCartItem = async(cartId, productId, quantity) => await apiClient.post(`${endpoint}/${cartId}/items/`, {product_id: productId, quantity})
const updateCartItem = async(cartId,itemId, quantity) => await apiClient.patch(`${endpoint}/${cartId}/items/${itemId}/`, {quantity})
const removeCartItem = async(cartId, itemId) => await apiClient.delete(`${endpoint}/${cartId}/items/${itemId}/`)

export default {
    createCart,
    getCart,
    addCartItem,
    updateCartItem,
    removeCartItem
}