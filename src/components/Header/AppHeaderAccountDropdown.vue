<template>
    <div class="account-dropdown">
        <div class="account-dropdown__photo">
            <img :src="photo" />
        </div>
        <div class="account-dropdown__list">
            <a href="javascript;" @click.prevent="toggleDropdown">{{ fullName }}</a>
            <ul v-if="collapsed">
                <li><a href="javascript;" @click.prevent="logout">Logout</a></li>
                <li><a href="/dashboard/privacy">Privacy</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { handleLogout } from '@/utils';

    export default {
        name: "AppHeaderAccountDropdown",
        data() {
            return {
                photo: "",
                fullName: "Aslan Lin",
                collapsed: false
            }
        },
        methods: {
            toggleDropdown() {
                this.collapsed = !this.collapsed;
            },
            logout() {
                handleLogout();
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>