<template>
    <div>
        <div class="d-flex justify-content-center mt-4" v-if="loading">
              Fetching User data . . . Please Wait
            </div>
       <div class="user--details" v-else>
            <div class="user--header d-flex align-items-center" style="gap: 20px">
           <div class="user--image">
                <img
                    :src="envUrl + user.photo"
                    alt=""
                    class="mr-2 user--photo"
                  />
                  <div :class="[user.status]"></div>
           </div>
                  
            <div>
                <h4> {{ user.name }} </h4>
                <p class="small"> {{ user.email }} </p>
                <div class="d-flex mt-2" style="gap: 10px">
                    <button @click="activateUser(user)" class="btn-success btn" v-show="user.status !== 'active'">Activate</button>
                    <button @click="suspendUser(user)" class="btn btn-warning" v-show="user.status !== 'suspended'">Suspend</button>
                    <button @click="banUser(user)" class="btn btn-danger" v-show="user.status !== 'banned'">Ban</button>
                </div>
            </div>
        </div>
        <section class="user--apps">
             <div class="row m-t-30" id="main">
      <div class="col-lg-12">
        <h5 class="font-weight-bold mb-4"> {{ user.name }}'s  Apps</h5>
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
            <tbody >
              <p v-if="user.products.length === 0 " class="font-weight-bold text-danger mt-3">
                 {{ user.name }} has no apps at the moment
              </p>
              <tr v-for="product in user.products" :key="product.id">
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
        </section>
       </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    data(){
        return{
            id: this.$route.params.id,
            envUrl: 'https://api.africanapp.store/',
            user: {},
            loading: false,
        }
    },
    methods:{
        async getUser(){
            this.loading = true
            const res = await  axios.get(this.envUrl + 'api/admin/find-user/'+this.id);
            this.user = res.data.user
            this.loading = false
        },
        activateUser(user) {
      let payload = { status: "active" };
      axios
        .post(`${this.envUrl}api/admin/update-user/${user.id}`, payload)
        .then((response) => {
          
        Swal.fire(
          'Done',
          response.data.message,
          'success'
        )
          this.getUser();
          
        });
    },
    banUser(user) {
      let payload = { status: "banned" };
      axios
        .post(`${this.envUrl}api/admin/update-user/${user.id}`, payload)
        .then((response) => {
          Swal.fire(
          'Done',
          response.data.message,
          'success'
        )
          this.getUser();
          
        });
    },
    suspendUser(user) {
      let payload = { status: "suspended" };
      axios
        .post(`${this.envUrl}api/admin/update-user/${user.id}`, payload)
        .then((response) => {
          Swal.fire(
          'Done',
          response.data.message,
          'success'
        )
          this.getUser();
          
        });
    },
    },
    async created(){
        this.getUser()
    }
}
</script>

<style scoped>
.user--photo {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    object-position: top;
}
.user--image{
    position: relative;
}
.active, .banned, .suspended {
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
.active{
background: #28a745;
}
.suspended{
background: #ffc107;
}
.btn {
    padding: 0.2rem 1rem;
    font-size: 0.8rem;
    border-radius: 2px;
}
</style>
