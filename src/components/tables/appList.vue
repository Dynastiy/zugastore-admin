<template>
  <div>
    <div class="text-capitalize font-weight-bold">
      {{ dataArr.total }} {{ queryTitle }} Application<span v-if="dataArr.total !== 1  ">s</span>
    </div>
    <app-page-header @changeTitle="ChangeT($event)"></app-page-header>
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

            <div class="d-flex justify-content-center mt-4" v-if="loading">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <tbody v-else>
              <p v-if="none_app" class="font-weight-bold text-danger mt-3">
                No {{ queryTitle }} apps at the moment
              </p>
              <tr v-for="product in products" :key="product.id">
                <!-- <td>12324233DED  {{ products }} </td> -->
                <td class="text-capitalize">{{ product.name }}</td>

                <td>{{ product.developer }}</td>
                <td>{{ product.file_size }}</td>
                <!-- <td>Blockchain</td> -->
                <!-- <td>Cryptocurrency</td> -->
                <td>
                  <span
                    class="badge badge-warning p-1"
                    v-if="product.status === 'pending'"
                  >
                    {{ product.status }}
                  </span>
                  <span
                    class="badge badge-success p-1"
                    v-else-if="product.status === 'approved'"
                    >{{ product.status }}</span
                  >
                  <span class="badge badge-danger p-1" v-else>{{
                    product.status
                  }}</span>
                </td>
                <td>
                  <router-link :to="'/product/' + product.id">
                    <button class="view-more-button">View More</button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- end table-responsive -->
      </div>
    </div>

    <nav>
      <ul
        class="
          pagination pagination-md
          d-flex
          justify-content-center
          align-items-center
          mt-5
        "
        style="gap: 20px"
      >
        <li class="page-item" :class="{ disabled: dataArr.total === 0 }">
          <a
            href="javascript:void(0)"
            class="page-link"
            @click="nextPage(dataArr.current_page - 1)"
          >
            &laquo;
          </a>
        </li>
        <li>
          Showing <span> {{ dataArr.from }} - {{ dataArr.to }} </span> of
          <span> {{ dataArr.total }} </span>
        </li>
        <!-- <li
              class="page-item"
              v-for="page in dataArr.last_page"
              :key="page"
              :class="{active: dataArr.current_page === page }"
            >
              <a
                href="javascript:void(0)"
                @click.prevent="next(page)"
                class="page-link"
              >
                {{ page}}
              </a>
            </li> -->
        <li
          class="page-item"
          :class="{ disabled: dataArr.current_page === dataArr.last_page }"
        >
          <a
            href="javascript:void(0)"
            class="page-link"
            @click="nextPage(dataArr.current_page + 1)"
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import AppPageHeader from '@/components/static/appPageHeader'
// import helpers from "@/helpers/index.js";
import axios from "axios";
export default {
  components:{
        AppPageHeader,
        // Categories,
        // tags
    },
  data() {
    return {
      products: [],
      baseUrl: "https://api.africanapp.store/api/",
      queryTitle: "",
      dataArr: [],
      none_app: false,
      loading: false,
      search: ''
    };
  },
  methods: {
    async getProducts(page = 1) {
      this.loading = true;
      // try {
      // console.log(this.$route.query.status);
      let queryName = this.$route.query.status;
      this.queryTitle = queryName;
      const res = await axios.get(`${this.baseUrl}admin/get-products`, {
        params: { status: queryName, page, name: this.search},
        
      });
      console.log(res.data.data);
      this.products = res.data.data;
      this.dataArr = res.data;
      console.log(res.data);
      if (res.data.data.length === 0) {
        this.none_app = true;
      }
      this.loading = false;
    },
    async nextPage(page) {
      this.getProducts(page);
    },
    ChangeT(title)
    {
      this.search = title.trim();
      this.getProducts()
      if (this.products.length === 0) {
        this.none_app = true;
      }
      else {
        this.none_app = false
        this.getProducts()
      }
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
