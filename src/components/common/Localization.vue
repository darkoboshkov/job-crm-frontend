<template>
  <div class="locale-changer">
    <div class="form-element">
      <label>
        {{ $t("page_setting.language_setting.form.select_language") }}:
      </label>
      <b-form-select
          v-model="$i18n.locale"
          :options="langs"
          class="lang-selector hide-icon"
          value-field="lang"
          text-field="lang"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Localization",
  data() {
    return { langs: ["en", "nl"] };
  }
};
</script>

<style scoped>
</style>
