<template>
    <div>
        <div class="">
        <router-link to="/dashboard" class="text-dark">
            <ion-icon name="home"></ion-icon>
            Home
        </router-link>
        <a href="">
            /
        </a>
        <a href=""> {{ currentRouteName }} </a>
    </div>
    <div>
        <h4> {{ currentRouteName }} </h4>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
     computed: {
        currentRouteName() {
        return this.$route.name;
    }
     },
}
</script>