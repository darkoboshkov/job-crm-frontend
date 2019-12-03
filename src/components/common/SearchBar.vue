<template>
    <div class="search-bar">
        <div class="icon-search">
            <img src="@/assets/image/icon/magnifier.svg"/>
        </div>
        <input v-model="search" placeholder="Zoeken..."/>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return {
                search: ''
            }
        },
    }
</script>

<style scoped>
    .search-bar {
        display: flex;
        align-items: center;
    }

    .icon-search {
        display: flex;
    }

    input {
        font-size: 18px;
        /*height: 58px;*/
        border: none;
    }
</style>