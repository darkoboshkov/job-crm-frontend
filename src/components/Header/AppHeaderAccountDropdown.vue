<template>
    <div class="account-dropdown">
        <div class="account-dropdown__photo">
            <img src="@/assets/image/avatar_nick.png" />
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
    import { handleLogout, Toast } from '@/utils';

    export default {
        name: "AppHeaderAccountDropdown",
        data() {
            return {
                photo: "", // To do from store
                fullName: "Aslan Lin", // To do from store
                collapsed: false
            }
        },
        methods: {
            toggleDropdown() {
                this.collapsed = !this.collapsed;
            },
            logout() {
                handleLogout();
                Toast('Logged out successfully!', 'success')
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>