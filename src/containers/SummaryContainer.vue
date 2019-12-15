<template>
    <div class="summary-container">
        <div class="summary-container__back">
            <div class="circle-2"></div>
            <div class="circle-3"></div>
            <div class="circle-4"></div>
            <div class="circle-5"></div>
            <div class="circle-6"></div>
        </div>
        <localization />
        <app-header />
        <div class="app-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import AppHeader from "../components/Header/AppHeader";
    import Localization from "../components/common/Localization";

    export default {
        name: "SummaryContainer",
        components: {
            Localization,
            AppHeader
        }
    }
</script>

<style scoped>

</style>
