<template>
    <div class="app-sidebar">
        <div class="app-sidebar__top">
            <router-link
                    v-for="(item, index) of items" :key="index"
                    v-if="item && hasPermission(item)"
                    :to="item.path"
                    class="nav-link">
                <img :src="require(`@/assets/image/icon/${item.icon}`)" />
            </router-link>
<!--            <a href="/dashboard/calendars" class="nav-link">-->
<!--                <img src="@/assets/image/icon/calendar.svg"/>-->
<!--            </a>-->
        </div>
        <div class="app-sidebar__bottom">
<!--            <a href="javascript:;" class="nav-link" @click.prevent="onAddItem">-->
<!--                <img src="@/assets/image/icon/plus.svg"/>-->
<!--            </a>-->
            <router-link :to="'/' + role + '/dashboard/setting'" class="nav-link">
                <img src="@/assets/image/icon/setting.svg"/>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppSidebar",
        props: {
            items: Array
        },
        computed: {
            role() {
                return this.$store.state.user.role;
            }
        },
        methods: {
            onAddItem() {
                /* eslint-disable-next-line */
                console.log("add item");
            },
            hasPermission(item) {
                if (item.roles && Array.isArray(item.roles)) {
                    const foundIndex = item.roles.findIndex(role => {
                        return this.role === role;
                    });
                    return foundIndex > -1;
                }
                return true;
            }
        }
    }
</script>

<style scoped>

</style>
