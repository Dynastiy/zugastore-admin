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
              <p v-if="none_app" class="font-weight-bold text-danger mt-3">No submissions at the moment  </p>
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
                  <div class="btn-group dropleft ml-2">
                      <button type="button" class="more__icon" data-toggle="dropdown" aria-expanded="false">
                        <!-- Dropleft -->
                        <ion-icon name="more"></ion-icon>
                      </button>
                      <div class="dropdown-menu">
                        
                        <a class="dropdown-item"    @click="decline(product)">Decline</a>
                         <a class="dropdown-item"   @click="approve(product)">Approve</a>
                      </div>
                    </div>
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
      // queryTitle :'',
      none_app: false,
    };
  },
  methods: {
    async getProducts() {
        const res = await axios.get(`${this.baseUrl}admin/get-submissions`);
        console.log(res.data.pending_apps);
        this.products = res.data.pending_apps;
        if(res.data.pending_apps.length === 0){
          this.none_app = true;
        }
    },
    approve(product) {
        let payload = { status: "approved"};
        axios.post(`${this.baseUrl}admin/update-product/${product.id}`, payload)
                .then((response) => {
                    console.log(response);
                   this.getProducts();
                });
      },
      decline(product) {
        let payload = { status: "declined"};
        axios.post(`${this.baseUrl}admin/update-product/${product.id}`, payload)
                .then((response) => {
                    console.log(response);
                   this.getProducts();
                });
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
