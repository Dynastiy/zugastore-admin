<template>
    <div>
        <app-drawer/>
        <div class="main__content">
            <!-- <app-header></app-header> -->
            <div class="main__container px-4 py-4">
                <!-- <bread-crumb></bread-crumb> -->
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import AppDrawer from '@/components/static/appDrawer'
// import AppHeader from '@/components/static/appHeader'
// import BreadCrumb from '@/components/static/breadcrumb'
export default {
    components:{
        AppDrawer,
        // AppHeader,
        // BreadCrumb
    },
    data(){
        return{

        }
    }
}
</script>

