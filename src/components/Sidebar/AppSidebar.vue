<template>
    <div class="app-sidebar">
        <div class="app-sidebar__top">
            <a href="/dashboard" class="nav-link">
                <img src="@/assets/image/icon/home.svg"/>
            </a>
            <a href="/dashboard/candidates" class="nav-link">
                <img src="@/assets/image/icon/group.svg"/>
            </a>
            <a href="/dashboard/candidates" class="nav-link">
                <img src="@/assets/image/icon/bag.svg"/>
            </a>
            <a href="/dashboard/matches" class="nav-link">
                <img src="@/assets/image/icon/hand.svg"/>
            </a>
            <a href="/dashboard/candidates" class="nav-link">
                <img src="@/assets/image/icon/calendar.svg"/>
            </a>
            <a href="/dashboard/news" class="nav-link">
                <img src="@/assets/image/icon/mail.svg"/>
            </a>
        </div>
        <div class="app-sidebar__bottom">
            <a href="javascript:;" class="nav-link" @click.prevent="onAddItem">
                <img src="@/assets/image/icon/plus.svg"/>
            </a>
            <a href="/dashboard/setting" class="nav-link">
                <img src="@/assets/image/icon/setting.svg"/>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppSidebar",
        methods: {
            onAddItem() {
                /* eslint-disable-next-line */
                console.log("add item");
            }
        }
    }
</script>

<style scoped>

</style>
