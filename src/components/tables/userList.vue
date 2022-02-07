<template>
  <div>
    <div class="row m-t-30" id="main">
      <div class="col-lg-12">
            <!-- <h4 class="font-weight-bold mb-4">{{ currentRouteName }}  Users</h4> -->
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-0">
                <thead class="thead-light">
                  <tr>
                    <th></th>
                    <!-- <th>Id</th> -->
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <p v-if="no_user" class="font-weight-bold text-danger mt-3">No {{queryTitle}} users at the moment  </p>
                  <tr v-for="user in users" :key="user.id">
                    <td>
                     <img
                  :src="baseUrl + user.photo"
                  alt=""
                  width="25"
                  class="mr-2"
                />
                    </td>
                    <!-- <td>
                      12324233DED
                    </td> -->
                    <td class="text-capitalize">
                      {{ user.name }}
                    </td>
                    <td>
                      {{ user.email }}
                    </td>
                     <td>
                        <span class="badge badge-warning p-1" v-if="user.status === 'suspended' "> {{ user.status }} </span>
                        <span class="badge badge-success p-1" v-else-if="user.status === 'active' ">{{ user.status }}</span>
                        <span class="badge badge-danger p-1" v-else>{{ user.status }}</span>
                      </td>
                    <td>
                     <button class="view-more-button">
                       View More
                     </button>
                     <!-- Default button -->
                    <div class="btn-group dropleft ml-2">
                      <button type="button" class="more__icon" data-toggle="dropdown" aria-expanded="false">
                        <!-- Dropleft -->
                        <ion-icon name="more"></ion-icon>
                      </button>
                      <div class="dropdown-menu">
                        
                        <a class="dropdown-item"  href="#" v-show="user.status !== 'active' "  @click="activateUser(user)">Activate</a>
                         <a class="dropdown-item" href="#" v-show="user.status !== 'suspended'  " @click="suspendUser(user)">Suspend</a>
                        <!-- <div class="dropdown-divider"></div> -->
                        <a class="dropdown-item" href="#" v-show="user.status != 'banned' " @click="banUser(user)">Ban</a>
                        <!-- <div class="dropdown-divider"></div> -->
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
import axios from 'axios'
export default {
  data() {
    return {
      users: [],
      baseUrl: 'https://api.africanapp.store/api/',
      queryTitle: '',
      no_user: ''
    };
  },
  methods: {
       activateUser(user) {
        let payload = { status: "active"};
        axios.post(`${this.baseUrl}admin/update-user/${user.id}`, payload)
                .then((response) => {
                    console.log(response);
                   this.getUsers();
                });
      },
       banUser(user) {
        let payload = { status: "banned"};
        axios.post(`${this.baseUrl}admin/update-user/${user.id}`, payload)
                .then((response) => {
                    console.log(response);
                   this.getUsers();
                });
      },
       suspendUser(user) {
        let payload = { status: "suspended"};
        axios.post(`${this.baseUrl}admin/update-user/${user.id}`, payload)
                .then((response) => {
                    console.log(response);
                   this.getUsers();
                });
      },
    async getUsers() {
      // try {
        console.log(this.$route.query.status);
        let queryName = this.$route.query.status
        this.queryTitle = queryName;
        const res = await axios.get(`${this.baseUrl}admin/get-users`, { params: { status: queryName } });
        console.log(res.data);
        this.users = res.data
        if(res.data.length === 0){
          this.no_user = true;
        }

// res.data.args; 
    },
  },
  async created() {
    this.getUsers();
  },
}
</script>