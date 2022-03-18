<template>
    <div>
        <div class="sidebar shadow-sm" id="side-bar">
            <header>
                <div class="logo text-center py-4">
                    <img src="@/assets/img/logo_spread.svg" width="100" alt="">
                </div>
                <ul class="list-unstyled sidebar__menu">
                    <li> 
                        <router-link to="/"> 
                            <span> <ion-icon name="analytics"></ion-icon> </span>
                            Analytics 
                        </router-link> 
                    </li>
                    <li> 
                        <router-link to="/dashboard/apps"> 
                            <span> <ion-icon name="apps"></ion-icon> </span>
                            All Apps 
                        </router-link> 
                    </li>
                    <li> 
                        <router-link to="/dashboard/users"> 
                            <span> <ion-icon name="contacts"></ion-icon> </span>
                            Users 
                        </router-link> 
                    </li>
                    <li> 
                        <router-link to="/dashboard/submissions"> 
                            <span> <ion-icon name="cloud-upload"></ion-icon> </span>
                            Submissions 
                        </router-link> 
                    </li>
                    <li> 
                        <router-link to="/dashboard/add-app"> 
                            <span> <ion-icon name="appstore"></ion-icon> </span>
                           Add App
                        </router-link> 
                    </li>
                    <li> 
                        <router-link to="/dashboard/my-apps"> 
                            <span> <ion-icon name="appstore"></ion-icon> </span>
                           My Apps
                        </router-link> 
                    </li>
                    <li> 
                        <a href="javascript:void(0)" @click="logout"> 
                            <span> <ion-icon name="power"></ion-icon> </span>
                            Logout 
                        </a> 
                    </li>
                </ul>
            </header>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    methods:{
        logout() {
      this.$store.dispatch('logout');
      Swal.fire(
          'Bye!',
          'Logged out!',
          'warning'
        )
      this.$router.push('/signin');
    }
    }
}
</script>