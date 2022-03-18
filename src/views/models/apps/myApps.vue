<template>
  <div>
    <div class="d-flex justify-content-center mt-4" v-if="loading">
      Fetching data . . . Please Wait
    </div>
    <div class="user--details" v-else>
      <section class="user--apps">
        <div class="row m-t-30" id="main">
          <div class="col-lg-12">
            <h5 class="font-weight-bold mb-4">Admin Apps</h5>
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-0">
                <thead class="thead-light">
                  <tr>
                    <!-- <th>Id</th> -->
                    <th>Name of App</th>
                    <!-- <th>Developer</th> -->
                    <th>Size</th>
                    <!-- <th>Category</th> -->
                    <!-- <th>Tags</th> -->
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <p
                    v-if="dataObj.length === 0"
                    class="font-weight-bold text-danger mt-3"
                  >
                    No apps at the moment
                  </p>
                  <tr v-for="product in dataObj" :key="product.id">
                    <!-- <td>12324233DED  {{ products }} </td> -->
                    <td class="text-capitalize">{{ product.name }}</td>

                    <!-- <td>{{ product.developer }}</td> -->
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
                    <td class="d-flex" style="gap: 10px">
                      <router-link :to="'/product/' + product.id">
                        <button class="view-more-button">View More</button>
                      </router-link>
                      <router-link :to="'/dashboard/update-app/' + product.id">
                        <button class="update">Update</button>
                      </router-link>
                      <button class="delete" @click="confirmBox(product)">
                        <ion-icon name="trash"></ion-icon>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- end table-responsive -->
          </div>
        </div>
      </section>
    </div>
    <confirm-box v-show="confirm_box" @close='close' @deleteApp='deleteApp'> 
        <span>Are You Sure you want to delete this App?</span> 
    </confirm-box>
  </div>
</template>

<script>
import confirmBox from '@/components/alerts/confirm_box.vue'
import axios from "axios";
import Swal from "sweetalert2";
export default {
    components: {
        confirmBox
    },
    data() {
    return {
      id: '',
      envUrl: "https://api.africanapp.store/",
      dataObj: {},
      loading: false,
      confirm_box: false,
      msg: ''
    };
  },
  methods: {
    async getApps() {
      this.loading = true;
      const res = await axios.get(this.envUrl + "api/admin/admin-products/");
      console.log(res.data.admin_products);
      this.dataObj = res.data.admin_products.data;
      this.loading = false;
    },
    close(){
        this.confirm_box = false
    },
    confirmBox(product){
        this.id = product.id
        console.log(product.id);
         this.confirm_box = !this.confirm_box
    },
    async deleteApp() {
      try {
          let response = await axios.post(`${this.envUrl}api/delete-product/${this.id}`)
            this.msg = response.data.message
            console.log(response);
          Swal.fire("Done", this.msg, "success");
          this.getApps();
          this.confirm_box = false
      } catch (error) {
          console.log(error);
          Swal.fire("Error", this.msg, "warning");
          this.confirm_box = false
      }
    },
    banUser(user) {
      let payload = { status: "banned" };
      axios
        .post(`${this.envUrl}api/admin/update-user/${user.id}`, payload)
        .then((response) => {
          Swal.fire("Done", response.data.message, "success");
          this.getUser();
        });
    },
  },
  async created() {
    this.getApps();
  },
};
</script>

<style scoped>
.user--photo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
}
.user--image {
  position: relative;
}
.active,
.banned,
.suspended {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  right: 17%;
  bottom: 10%;
  border: 1px solid #d2b68175;
}
.banned {
  background: #dc3545;
}
.active {
  background: #28a745;
}
.suspended {
  background: #ffc107;
}
.btn {
  padding: 0.2rem 1rem;
  font-size: 0.8rem;
  border-radius: 2px;
}
</style>
