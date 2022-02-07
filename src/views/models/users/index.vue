<template>
    <div>
        <h3 class="font-weight-bold mb-5">Users</h3>
        <user-page-header></user-page-header>
        <router-view></router-view>
    </div>
</template>

<script>
import UserPageHeader from '@/components/static/userPageHeader'
export default {
    components:{
        UserPageHeader
    }
}
</script>