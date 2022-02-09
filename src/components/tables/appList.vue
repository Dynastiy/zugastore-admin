<template>
  <div>
    
    <div class="row m-t-30" id="main">
      <div class="col-lg-12">
        <!-- <h5 class="font-weight-bold mb-4">{{ currentRouteName }} Apps</h5> -->
        <div class="table-responsive">
          <table class="table table-centered table-nowrap mb-0">
            <thead class="thead-light">
              <tr>
                <!-- <th>Id</th> -->
                <th>Name of App</th>
                <th>Developer</th>
                <th>Size</th>
                <!-- <th>Category</th> -->
                <!-- <th>Tags</th> -->
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <p v-if="none_app" class="font-weight-bold text-danger mt-3">No {{queryTitle}} apps at the moment  </p>
              <tr v-for="product in products" :key="product.id">
                <!-- <td>12324233DED  {{ products }} </td> -->
                <td class="text-capitalize"> {{ product.name }} </td>

                <td> {{ product.developer }} </td>
                <td> {{ product.file_size }} </td>
                <!-- <td>Blockchain</td> -->
                <!-- <td>Cryptocurrency</td> -->
                <td>
                  <span class="badge badge-warning p-1" v-if="product.status === 'pending' "> {{ product.status }} </span>
                  <span class="badge badge-success p-1" v-else-if="product.status === 'approved' ">{{ product.status }}</span>
                  <span class="badge badge-danger p-1" v-else>{{ product.status }}</span>
                </td>
                <td>
                  <router-link :to=" '/product/'+product.id "> <button class="view-more-button">View More</button> </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- end table-responsive -->
      </div>
    </div>
  </div>
</template>

<script>
// import helpers from "@/helpers/index.js";
import axios from 'axios'
export default {
  data() {
    return {
      products: [],
      baseUrl: 'https://api.africanapp.store/api/',
      queryTitle :'',
      none_app: false,
    };
  },
  methods: {
    async getProducts() {
      // try {
        console.log(this.$route.query.status);
        let queryName = this.$route.query.status
        this.queryTitle = queryName;
        const res = await axios.get(`${this.baseUrl}admin/get-products`, { params: { status: queryName } });
        console.log(res.data.data);
        this.products = res.data.data;
        if(res.data.data.length === 0){
          this.none_app = true;
        }

// res.data.args; 
    },
  },
  async created() {
    this.getProducts();
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
