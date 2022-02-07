<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css');
@import url('assets/css/main.css');
@import url('assets/css/util.css');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400&display=swap');
#app {
  font-family: 'DM Sans', sans-serif;
}
</style>


<script>
export default {
   async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/signin');
    }
   }
}
</script>
