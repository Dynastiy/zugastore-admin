<template>
    <div class="app-page-header">
        <header>
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
            </ul>
        </header>
    </div>
</template>