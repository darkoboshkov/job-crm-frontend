<template>
    <div class="auth-container">
        <div class="auth-container__back">
            <div class="circle-1"></div>
            <div class="circle-2"></div>
            <div class="circle-3"></div>
            <div class="circle-4"></div>
            <div class="circle-5"></div>
            <div class="circle-6"></div>
        </div>
        <localization />
        <router-view/>
    </div>
</template>

<script>
    import Localization from "../components/common/Localization";
    export default {
        name: "AuthContainer",
        components: {
            Localization
        }
    }
</script>

<style scoped>

</style>
