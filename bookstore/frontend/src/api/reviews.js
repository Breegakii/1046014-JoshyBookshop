import apiClient from "./client";

const prefix = '/bookshop/products'

const getProductReviews = async(productId) => await apiClient.get(`${prefix}/${productId}/reviews/`)
const createProductReview = async(productId, reviewData) => await apiClient.post(`${prefix}/${productId}/reviews/`, reviewData)

export default {
    getProductReviews,
    createProductReview
}