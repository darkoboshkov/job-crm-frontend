<template>
    <div class="locale-changer">
        <b-form-select
                v-model="$i18n.locale"
                :options="langs"
                class="lang-selector"
                value-field="lang"
                text-field="lang"
        ></b-form-select>

        <!--<select v-model="$i18n.locale">-->
            <!--<option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>-->
        <!--</select>-->
    </div>
</template>

<script>
    export default {
        name: "Localization",
        data () {
            return { langs: ['en', 'nl'] }
        }
    }
</script>

<style scoped>
    .lang-selector {
        height: 40px;
    }
</style>