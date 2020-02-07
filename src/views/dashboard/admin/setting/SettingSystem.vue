<template>
  <div class="setting-system">
    <div class="setting-system__form container">
      <div class="form-element">
        <label>{{ $t("BACKGROUND_COLOR") }}:</label>
        <b-form-input
          type="text"
          required
          class="custom-input"
          v-model="bgColor"
        />
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("FONT_FAMILY") }}:</label>
        <b-form-select v-model="fontFamily">
          <option>{{ $t("SELECT_OPTION") }}</option>
          <option value="a">{{ $t("OPTION") }} A</option>
          <option value="b">{{ $t("OPTION") }} B</option>
        </b-form-select>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("NOTIFICATIONS") }}:</label>
        <div class="d-flex responsive w-100" style="margin-bottom: 0.5rem">
          <b-form-checkbox
            class="rtl"
            switch
            size="lg"
            v-model="notificationEnabled"
            >{{ $t("MAIL_NOTIFICATIONS") }}</b-form-checkbox
          >
          <b-form-checkbox
            class="rtl"
            switch
            size="lg"
            v-model="messageEnabled"
            >{{ $t("PHONE_MESSAGE") }}</b-form-checkbox
          >
        </div>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("TIMEZONE") }}:</label>
        <b-form-select v-model="timezone">
          <option>{{ $t("SELECT_OPTION") }}</option>
          <option v-for="(tz, idx) in tzList" :key="idx">{{ tz }}</option>
        </b-form-select>
      </div>
      <div class="form-element mt-3">
        <label>{{ $t("WEEK_START_AT") }}:</label>
        <b-form-select v-model="weekStartAt">
          <option>{{ $t("SELECT_OPTION") }}</option>
          <option v-for="(weekDay, idx) in weekDays" :key="idx">{{
            $t(weekDay)
          }}</option>
        </b-form-select>
      </div>
      <div class="form-element mt-3">
        <b-button @click="update">{{ $t("UPDATE_SETTINGS") }}</b-button>
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
        { text: "Mail notifications", value: "red" },
        { text: "Phone message", value: "green" }
      ],
      tzList: [],
      weekDays: [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
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
    get() {
      // systemSettingsApi.get(this.$store.state.user).then(res => {
      //   this.bgColor = res.bgColor;
      //   this.fontFamily = res.fontFamily;
      //   this.notificationEnabled = res.notificationEnabled;
      //   this.messageEnabled = res.messageEnabled;
      //   this.weekStartAt = res.weekStartAt;
      //   this.timezone = res.timezone;
      // });
    },
    update() {
      // systemSettingsApi
      //   .patch(
      //     Object.assign(this.$store.state.user, {
      //       bgColor: this.bgColor,
      //       fontFamily: this.fontFamily,
      //       notificationEnabled: this.notificationEnabled,
      //       messageEnabled: this.messageEnabled,
      //       weekStartAt: this.weekStartAt,
      //       timezone: this.timezone
      //     })
      //   )
      //   .then(res => {
      //     console.log("response", res);
      //   });
    }
  }
};
</script>

<style scoped></style>
