<template>
  <div class="account-dropdown">
    <div class="account-dropdown__photo">
      <img v-if="image" :src="APP_URL + image" />
    </div>
    <div class="account-dropdown__list">
      <a href="javascript;" @click.stop.prevent="toggleDropdown">
        {{ fullName }}
        <i class="hiway-crm-icon icon-angle-down ml-3" />
      </a>
      <ul v-if="collapsed">
        <li>
          <i class="hiway-crm-icon icon-exit mr-2" />
          <a href="#" @click.prevent="logout">{{ $t("common.logout") }}</a>
        </li>
        <li>
          <router-link :to="'/' + role + '/dashboard/privacy'">
            <i class="hiway-crm-icon icon-lock mr-2" />
            <span>{{ $t("common.privacy") }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { handleLogout, Toast } from "@/utils";
import { APP_URL } from "@/constants";

export default {
  name: "AppHeaderAccountDropdown",
  data() {
    return {
      collapsed: false,
      APP_URL
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
    closeDropdown() {
      this.collapsed = false;
    },
    logout() {
      handleLogout();
      Toast("Logged out successfully!", "success");
      this.$router.push("/login");
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<style scoped></style>
