<template>
    <div id="page_settings" class="dashboard-content">
        <div class="container">
            <h1 class="title">Settings</h1>
            <b-tabs class="mt-3 bg-white">
                <b-tab title="Profile Settings" active>
                    <setting-profile />
                </b-tab>
                <b-tab title="System Settings">
                    <setting-system />
                </b-tab>
                <b-tab title="Notifications">
                    <p>I'm a disabled tab!</p>
                </b-tab>
                <b-tab title="Overig">
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import SettingProfile from "./SettingProfile";
    import SettingSystem from "./SettingSystem";
    export default {
        name: "Setting",
        components: {SettingSystem, SettingProfile}
    }
</script>

<style scoped>

</style>