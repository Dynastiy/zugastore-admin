<template>
  <div class="app-page-header">
    <header>
      <ul class="list-unstyled app-nav">
        <li>
          <router-link to="/dashboard/apps"> All Apps </router-link>
        </li>
        <li>
          <router-link
            :to="{ path: '/dashboard/apps', query: { status: 'approved' } }"
          >
            Approved Apps
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ path: '/dashboard/apps', query: { status: 'declined' } }"
          >
            Declined Apps
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ path: '/dashboard/apps', query: { status: 'pending' } }"
          >
            Pending Apps
          </router-link>
        </li>
        <li class="ml-auto">
          <div>
            <i class="fa fa-search" aria-hidden="true"></i>
            <input
              @keyup="passEvent"
              type="search"
              name=""
              id=""
              v-model="search"
              placeholder="Search Apps"
            />
          </div>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      search: "",
    };
  },
  methods: {
    passEvent() {
      this.$emit("changeTitle", this.search);
    },
  },
};
</script>