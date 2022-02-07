<template>
    <div class="app-page-header">
        <header>
            <ul class="list-unstyled app-nav">
                <li>
                    <router-link to="/dashboard/apps"> All Apps </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/dashboard/apps',query:{status:'approved'}}"> Approved Apps </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/dashboard/apps',query:{status:'declined'}}"> Declined Apps </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/dashboard/apps',query:{status:'pending'}}"> Pending Apps </router-link>
                </li>
            </ul>
        </header>
    </div>
</template>