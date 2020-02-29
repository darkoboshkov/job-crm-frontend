<template>
  <b-modal
    ref="modal-success"
    v-model="showSuccessModal"
    :hide-footer="true"
    :hide-header="true"
    centered
    modal-class="modal-success"
  >
    <div class="text-center">
      <img class="success-image" src="@/assets/image/icon/success.svg" />
      <p class="success-title color-blue">
        {{ title }}
      </p>
      <p class="success-sub-title">
        {{ subTitle }}
      </p>
      <button class="btn btn-blue" @click="onButtonClick">
        {{ button }}
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "SuccessModal",
  computed: {
    showSuccessModal: {
      get() {
        return this.$store.state.showSuccessModal;
      },
      set(value) {
        return this.$store.dispatch("updateShowSuccessModal", value);
      }
    },
    title() {
      return this.$store.state.successModalTitle;
    },
    subTitle() {
      return this.$store.state.successModalSubTitle;
    },
    button() {
      return this.$store.state.successModalButton;
    }
  },
  methods: {
    onButtonClick() {
      if (typeof this.$store.state.successModalOnButtonClick === "function") {
        this.$store.state.successModalOnButtonClick();
      } else {
        this.showSuccessModal = false;
      }
    }
  }
};
</script>

<style scoped></style>
