// const baseUrl = "https://api.africanapp.store"

import axios from 'axios';

const url = 'https://api.africanapp.store/api/';

export default {
    async login(credentials) {
        const response = await axios
            .post(url + 'auth/signin/', credentials);
        return response.data;
    },
    async getIndex() {
        const response = await axios.get(url + 'admin/data');
        return response.data;
    },
    async createProduct(payload) {
        const response = await axios.post(url + 'create-product', payload);
        return response.data;
    },
    async getTags() {
        const response = await axios
            .get(url + 'all-tags/');
        return response.data;
    },
    async getCategories() {
        const response = await axios
            .get(url + 'all-categories/');
        return response.data;
    },
    async getProductDetails(id) {
        const response = await axios.get(`${url}find-product/${id}`);
        return response.data
    },
    // async updateProduct(payload) {
    //   const response = await axios.post(url + 'create-product', payload);
    //   return response.data;
    // },
};