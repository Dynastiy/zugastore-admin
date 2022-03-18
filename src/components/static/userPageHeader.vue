<template>
    <div class="app-page-header">
        <header >
            <ul class="list-unstyled app-nav">
                <li>
                    <router-link to="/dashboard/users"> All Users</router-link>
                </li>
                <li>
                    <router-link :to="{path:'/dashboard/users',query:{status:'active'}}"> Active Users </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/dashboard/users',query:{status:'suspended'}}"> Suspended Users </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/dashboard/users',query:{status:'banned'}}"> Banned Users </router-link>
                </li>
                <li class="ml-auto">
                    <div>
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input @keyup='passEvent' type="search" name="" id="" v-model="search" placeholder="Search User">
                    </div>
                </li>
            </ul>
        </header>
    </div>
</template>

<script>
export default {
    data:()=>{
        return {
           search: ''
        }
    },
    methods:{
        // searchItem(){
        //     console.log(this.search);
        // },
        passEvent()
    {
      this.$emit('changeTitle', this.search)
    }
    }
}
</script>
