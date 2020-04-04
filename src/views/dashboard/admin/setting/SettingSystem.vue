<template>
  <div class="setting-system">
    <div class="setting-system__form container">
      <div class="form-element">
        <label>{{ $t("page_setting.system_setting.form.back_color") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="bgColor"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.system_setting.form.font_family") }}:</label>
        <b-form-select v-model="fontFamily">
          <option>{{
            $t("page_setting.system_setting.form.select_option")
          }}</option>
          <option value="a">{{ $t("OPTION") }} A</option>
          <option value="b">{{ $t("OPTION") }} B</option>
        </b-form-select>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.system_setting.form.notifications") }}:</label
        >
        <div class="d-flex responsive w-100" style="margin-bottom: 0.5rem">
          <b-form-checkbox
            class="rtl"
            switch
            size="lg"
            v-model="notificationEnabled"
            >{{
              $t("page_setting.system_setting.form.mail_notifications")
            }}</b-form-checkbox
          >
          <b-form-checkbox
            class="rtl"
            switch
            size="lg"
            v-model="messageEnabled"
            >{{
              $t("page_setting.system_setting.form.phone_message")
            }}</b-form-checkbox
          >
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("page_setting.system_setting.form.timezone") }}:</label>
        <b-form-select v-model="timezone">
          <option>{{ $t("SELECT_OPTION") }}</option>
          <option v-for="(tz, idx) in tzList" :key="idx">{{ tz }}</option>
        </b-form-select>
      </div>
      <div class="form-element mt-3">
        <label
          >{{ $t("page_setting.system_setting.form.week_start_at") }}:</label
        >
        <b-form-select v-model="weekStartAt">
          <option>{{ $t("SELECT_OPTION") }}</option>
          <option v-for="(weekDay, idx) in weekDays" :key="idx">{{
            $t(weekDay)
          }}</option>
        </b-form-select>
      </div>
      <div class="form-element mt-3">
        <button class="btn btn-blue" @click="update">
          {{ $t("page_setting.system_setting.button.update") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";
import systemSettingsApi from "@/services/api/system-settings";

export default {
  name: "SettingSystem",
  data() {
    return {
      selected: [],
      options: [
        {
          text: this.$t("page_setting.system_setting.form.mail_notifications"),
          value: "red"
        },
        {
          text: this.$t("page_setting.system_setting.form.phone_message"),
          value: "green"
        }
      ],
      tzList: [],
      weekDays: [
        this.$t("weekday.mon"),
        this.$t("weekday.tue"),
        this.$t("weekday.wed"),
        this.$t("weekday.thu"),
        this.$t("weekday.fri"),
        this.$t("weekday.sat"),
        this.$t("weekday.sun")
      ],
      bgColor: "",
      fontFamily: "",
      notificationEnabled: false,
      messageEnabled: false,
      weekStartAt: "",
      timezone: ""
    };
  },
  mounted() {
    this.tzList = moment.tz.names();
    this.get();
  },
  methods: {
    get() {},
    update() {}
  }
};
</script>

<style scoped></style>
