import apiClient from "./client";

const prefix = 'bookshop'

export const getProducts = async (params = {}) => {
  return await apiClient.get(`/${prefix}/products/`, {params: params});
};

export const getProduct = async (id) => {
  return await apiClient.get(`/${prefix}/products/${id}/`);
};

export const getProductReviews = async (productId) => {
  return await apiClient.get(`/${prefix}/products/${productId}/reviews/`);
};

export const createProductReview = async (productId, reviewData) => {
  return await apiClient.post(`/${prefix}/products/${productId}/reviews/`, reviewData);
};

export const getCategories = async() => await apiClient.get(`/${prefix}/categories/`)