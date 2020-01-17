<template>
    <div class="dashboard-container">
        <div class="dashboard-container__back">
            <div class="circle-2"></div>
            <div class="circle-3"></div>
            <div class="circle-4"></div>
            <div class="circle-5"></div>
            <div class="circle-6"></div>
        </div>
        <localization />
        <app-header/>
        <app-sidebar :items="items"/>
        <div class="app-content sidebar">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import AppSidebar from "../components/Sidebar/AppSidebar";
    import AppHeader from "../components/Header/AppHeader";
    import Localization from "../components/common/Localization";
    import { items } from "../navs";

    export default {
        name: "DashboardContainer",
        components: {
            Localization,
            AppHeader,
            AppSidebar
        },
        data() {
            return {
                items
            }
        }
    }
</script>

<style scoped>

</style>
