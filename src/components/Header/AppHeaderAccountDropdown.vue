<template>
  <div class="account-dropdown">
    <div class="account-dropdown__photo">
      <img v-if="image" :src="image" />
    </div>
    <div class="account-dropdown__list">
      <a href="javascript;" @click.prevent="toggleDropdown">
        {{ fullName }}
        <i class="hiway-crm-icon icon-angle-down ml-3" />
      </a>
      <ul v-if="collapsed">
        <li>
          <a href="javascript:void(0);" @click.prevent="logout">{{
            $t("common.logout")
          }}</a>
        </li>
        <li>
          <router-link :to="'/' + role + '/dashboard/privacy'">{{
            $t("common.privacy")
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { handleLogout, Toast } from "@/utils";

export default {
  name: "AppHeaderAccountDropdown",
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    fullName() {
      if (this.$store.state.user) {
        return (
          this.$store.state.user.firstName +
          " " +
          this.$store.state.user.lastName
        );
      }
      return "";
    },
    role() {
      if (this.$store.state.user) {
        return this.$store.state.user.role;
      }
      return "worker";
    },
    image() {
      if (this.$store.state.user) {
        return this.$store.state.user.image;
      }
      return null;
    }
  },
  methods: {
    toggleDropdown() {
      this.collapsed = !this.collapsed;
    },
    logout() {
      handleLogout();
      Toast("Logged out successfully!", "success");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
