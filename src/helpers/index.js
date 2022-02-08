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
   async createProduct() {
    const response = await axios.post(url + 'admin/create-product');
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
};