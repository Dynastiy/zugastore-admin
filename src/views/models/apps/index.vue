<template>
    <div>
        <h3 class="font-weight-bold mb-5">
      Apps
    </h3>
        
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>

// import tags from '../../../components/tags.vue'
export default {
    
}
</script>