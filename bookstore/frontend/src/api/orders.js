import apiClient from "./client";

const endpoint = '/bookshop/orders/'

const placeOrder = async(cartId) => await apiClient.post(endpoint, {cart_id: cartId})
const getOrders = async() => await apiClient.get(endpoint)

export default {
    placeOrder,
    getOrders
}