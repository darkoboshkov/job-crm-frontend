<template>
    <div class="app-header">
        <div style="display: flex">
            <div class="logo">
                <img src="@/assets/logo.svg"/>
            </div>
            <div class="nav">
                <search-bar />
            </div>
        </div>
    </div>
</template>

<script>
    import SearchBar from '@/components/common/SearchBar.vue';

    export default {
        name: "AppHeader",
        components: {
            SearchBar,
        }
    }
</script>

<style scoped>

</style>
