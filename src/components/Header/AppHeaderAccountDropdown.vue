<template>
  <div class="account-dropdown">
    <div class="account-dropdown__photo">
      <img src="@/assets/image/avatar_nick.png" />
    </div>
    <div class="account-dropdown__list">
      <a href="javascript;" @click.prevent="toggleDropdown">
        {{ fullName }}
        <i class="hiway-crm-icon icon-angle-down ml-3" />
      </a>
      <ul v-if="collapsed">
        <li>
          <a href="javascript:void(0);" @click.prevent="logout">Logout</a>
        </li>
        <li>
          <router-link :to="'/' + role + '/dashboard/privacy'"
            >Privacy</router-link
          >
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
      photo: "", // To do from store
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
