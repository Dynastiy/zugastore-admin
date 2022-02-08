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
    const response = await axios.get(url + 'create-product');
    return response.data;
  }
};