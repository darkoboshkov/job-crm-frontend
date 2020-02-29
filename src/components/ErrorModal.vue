<template>
  <b-modal
    ref="modal-alert"
    v-model="showErrorModal"
    :hide-footer="true"
    :hide-header="true"
    centered
    modal-class="modal-alert"
  >
    <div class="text-center">
      <img class="alert-image" src="@/assets/image/icon/alert.svg" />
      <p class="alert-title color-blue">
        {{ title }}
      </p>
      <p class="alert-sub-title">
        {{ subTitle }}
      </p>
      <button class="btn btn-blue" @click="showErrorModal = false">
        {{ button }}
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ErrorModal",
  computed: {
    showErrorModal: {
      get() {
        return this.$store.state.showErrorModal;
      },
      set(value) {
        return this.$store.dispatch("updateShowErrorModal", value);
      }
    },
    title() {
      return this.$store.state.errorModalTitle;
    },
    subTitle() {
      return this.$store.state.errorModalSubTitle;
    },
    button() {
      return this.$store.state.errorModalButton;
    }
  }
};
</script>

<style scoped></style>
