<template>
    <div class="app-header">
        <div class="d-flex">
            <div class="logo">
                <a href="/"><img src="@/assets/logo.svg"/></a>
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
