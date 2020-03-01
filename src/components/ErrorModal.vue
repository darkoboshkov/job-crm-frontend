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
      <button class="btn btn-black mr-3" @click="showErrorModal = false">
        {{ $t("common.cancel") }}
      </button>
      <button class="btn btn-blue" @click="onButtonClick">
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
  },
  methods: {
    onButtonClick() {
      if (typeof this.$store.state.errorModalOnButtonClick === "function") {
        this.$store.state.errorModalOnButtonClick();
      } else {
        this.showErrorModal = false;
      }
    }
  }
};
</script>

<style scoped></style>
