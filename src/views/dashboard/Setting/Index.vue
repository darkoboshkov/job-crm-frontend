<template>
    <div id="page_settings" class="dashboard-content">
        <div class="container">
            <h1 class="title">{{ $t('SETTINGS') }}</h1>
            <b-tabs class="mt-3 bg-white">
                <b-tab :title="$t('PROFILE_SETTINGS')" active>
                    <setting-profile />
                </b-tab>
                <b-tab :title="$t('SYSTEM_SETTINGS')">
                    <setting-system />
                </b-tab>
                <b-tab :title="$t('NOTIFICATIONS')">
                    <p>I'm a disabled tab!</p>
                </b-tab>
                <b-tab :title="$t('OTHER')">
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
