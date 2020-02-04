<template>
  <div :id="id" class="custom-card">
    <div class="custom-card-header">
      <div class="custom-card-header__title">
        <slot name="header" />
      </div>
      <div class="custom-card-header__tool"></div>
    </div>
    <div class="custom-card-body">
      <slot />
    </div>
    <div class="custom-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      showCollapse: true
    };
  }
};
</script>

<style scoped></style>
