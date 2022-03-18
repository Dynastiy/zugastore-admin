<template>
  <div>
    <div class="text-capitalize font-weight-bold">
      {{ dataArr.total }} {{ queryTitle }} User<span v-if="dataArr.total !== 1  ">s</span>
    </div>
    <user-page-header @changeTitle="ChangeT($event)"></user-page-header>
    <div class="row m-t-30" id="main" >
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
            
              <div class="d-flex mt-4 justify-content-center" v-if="loading">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
            <tbody v-else>
              <p v-if="no_user" class="font-weight-bold text-danger mt-3">
                No {{ queryTitle }} users at the moment
              </p>
              <tr  v-else v-for="user in users" :key="user.id">
                <td>
                  <img
                    :src="envUrl + user.photo"
                    alt=""
                    class="mr-2 user--photo"
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
                  <span
                    class="badge badge-warning p-1"
                    v-if="user.status === 'suspended'"
                  >
                    {{ user.status }}
                  </span>
                  <span
                    class="badge badge-success p-1"
                    v-else-if="user.status === 'active'"
                    >{{ user.status }}</span
                  >
                  <span class="badge badge-danger p-1" v-else>{{
                    user.status
                  }}</span>
                </td>
                <td>
                  <router-link :to="'/dashboard/user/'+user.id"><button class="view-more-button">View More</button></router-link>
                  <!-- Default button -->
                  <div class="btn-group dropleft ml-2">
                    <button
                      type="button"
                      class="more__icon"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <!-- Dropleft -->
                      <ion-icon name="more"></ion-icon>
                    </button>
                    <div class="dropdown-menu">
                      <a
                        class="dropdown-item"
                        href="#"
                        v-show="user.status !== 'active'"
                        @click="activateUser(user)"
                        >Activate</a
                      >
                      <a
                        class="dropdown-item"
                        href="#"
                        v-show="user.status !== 'suspended'"
                        @click="suspendUser(user)"
                        >Suspend</a
                      >
                      <!-- <div class="dropdown-divider"></div> -->
                      <a
                        class="dropdown-item"
                        href="#"
                        v-show="user.status != 'banned'"
                        @click="banUser(user)"
                        >Ban</a
                      >
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
    <nav>
     
          <ul
            class="pagination pagination-md d-flex justify-content-center align-items-center mt-5" style="gap:20px"
          >
            <li class="page-item" :class="{ disabled: dataArr.total === 0 }">
              <a
                href="javascript:void(0)"
                class="page-link"
                @click="next(dataArr.current_page - 1)"
              >
                &laquo;
              </a>
            </li>
            <li>
               Showing <span> {{ dataArr.from }} - {{ dataArr.to }} </span> of <span> {{ dataArr.total }} </span>
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
                @click="next(dataArr.current_page + 1)"
              >
                &raquo;
              </a>
            </li>
          </ul>
        </nav>
  </div>
</template>

<script>
import UserPageHeader from '@/components/static/userPageHeader'
import axios from "axios";
export default {
  components: {
    UserPageHeader
  },
  data() {
    return {
      users: [],
      baseUrl: "https://api.africanapp.store/api/",
      envUrl: "https://api.africanapp.store/",
      queryTitle: "",
      no_user: "",
      dataArr: [],
      loading: false,
      search: '',
    };
  },
  methods: {
    activateUser(user) {
      let payload = { status: "active" };
      axios
        .post(`${this.baseUrl}admin/update-user/${user.id}`, payload)
        .then((response) => {
          
          // console.log(response);
          this.getUsers();
          return response
        });
    },
    banUser(user) {
      let payload = { status: "banned" };
      axios
        .post(`${this.baseUrl}admin/update-user/${user.id}`, payload)
        .then((response) => {
          // console.log(response);
          this.getUsers();
          return response
        });
    },
    suspendUser(user) {
      let payload = { status: "suspended" };
      axios
        .post(`${this.baseUrl}admin/update-user/${user.id}`, payload)
        .then((response) => {
          // console.log(response);
          this.getUsers();
          return response
        });
    },
    async getUsers(page = 1) {
      this.loading = true
      // try {
      
        // console.log(this.$route.query.status);
      let queryName = this.$route.query.status;
      this.queryTitle = queryName;
      const res = await axios.get(`${this.baseUrl}admin/get-users`, {
        params: { status: queryName, page, name: this.search},
      });
      console.log(res.data.data);
      this.users = res.data.data;
      this.dataArr = res.data
      if (res.data.data.length === 0) {
        this.no_user = true;
      }
      
  this.loading = false
      // res.data.args;
    },
    async next(page) {
      this.getUsers(page);
    },
    ChangeT(title)
    {
      this.search = title.trim();
      this.getUsers()
      if (this.users.length === 0) {
        this.no_user = true;
      }
      else {
        this.no_user = false
        this.getUsers()
      }
    },
  },
  async created() {
    this.getUsers();
  },
};
</script>

<style scoped>
.user--photo {
  width: 30px;
  height: 30px;
  object-position: top;
  object-fit: cover;
  border-radius: 50%;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.4);
}
</style>