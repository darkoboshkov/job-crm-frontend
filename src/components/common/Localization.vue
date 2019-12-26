<template>
    <div class="locale-changer">
        <b-form-select
                v-model="$i18n.locale"
                :options="langs"
                class="lang-selector hide-icon"
                value-field="lang"
                text-field="lang"
        />
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
        border: none;
        outline: none;
        box-shadow: none;
    }
</style>