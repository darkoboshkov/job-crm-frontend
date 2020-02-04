<template>
  <div class="app-sidebar">
    <div class="app-sidebar__top">
      <template v-for="(item, index) of items">
        <router-link
          v-if="item && hasPermission(item)"
          :to="item.path"
          :key="index"
          class="nav-link"
        >
          <i class="hiway-crm-icon" :class="item.icon"></i>
        </router-link>
      </template>
    </div>
    <div class="app-sidebar__bottom">
      <!--            <a href="javascript:;" class="nav-link" @click.prevent="onAddItem">-->
      <!--                <img src="@/assets/image/icon/plus.svg"/>-->
      <!--            </a>-->
      <router-link :to="'/' + role + '/dashboard/setting'" class="nav-link">
        <i class="hiway-crm-icon icon-gear"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  props: {
    items: Array
  },
  computed: {
    role() {
      return this.$store.state.user.role;
    }
  },
  methods: {
    onAddItem() {
      console.log("add item");
    },
    hasPermission(item) {
      if (item.roles && Array.isArray(item.roles)) {
        const foundIndex = item.roles.findIndex(role => {
          return this.role === role;
        });
        return foundIndex > -1;
      }
      return true;
    }
  }
};
</script>

<style scoped></style>
