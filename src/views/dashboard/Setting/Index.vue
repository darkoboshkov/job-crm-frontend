<template>
    <div id="page_settings" class="dashboard-content">
        <div class="container">
            <h1 class="title">Settings</h1>
            <b-tabs class="mt-3 bg-white">
                <b-tab title="Profile Settings" active>
                    <setting-profile />
                </b-tab>
                <b-tab title="System Settings">
                    <p>I'm the second tab</p>
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
    export default {
        name: "Setting",
        components: {SettingProfile}
    }
</script>

<style scoped>

</style>