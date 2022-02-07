<template>
    <div>
        <h3 class="font-weight-bold mb-5">
      Apps
    </h3>
        <app-page-header></app-page-header>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
import AppPageHeader from '@/components/static/appPageHeader'
// import tags from '../../../components/tags.vue'
export default {
    components:{
        AppPageHeader,
        // Categories,
        // tags
    }
}
</script>