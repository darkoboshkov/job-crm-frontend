<template>
  <b-modal
    ref="modal-confirm"
    v-model="showConfirmModal"
    :hide-footer="true"
    :hide-header="true"
    centered
    modal-class="modal-confirm"
  >
    <div class="text-center">
      <p class="confirm-title color-red">
        {{ title }}
      </p>
      <p class="confirm-sub-title">
        {{ subTitle }}
      </p>
      <button class="btn btn-red mr-3" @click="showConfirmModal = false">
        {{ $t("common.cancel") }}
      </button>
      <button v-if="button" class="btn btn-blue" @click="onButtonClick">
        {{ button }}
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ConfirmModal",
  computed: {
    showConfirmModal: {
      get() {
        return this.$store.state.showConfirmModal;
      },
      set(value) {
        return this.$store.dispatch("updateShowConfirmModal", value);
      }
    },
    title() {
      return this.$store.state.confirmModalTitle;
    },
    subTitle() {
      return this.$store.state.confirmModalSubTitle;
    },
    button() {
      return this.$store.state.confirmModalButton;
    }
  },
  methods: {
    onButtonClick() {
      if (typeof this.$store.state.confirmModalOnButtonClick === "function") {
        this.$store.state.confirmModalOnButtonClick();
      } else {
        this.showConfirmModal = false;
      }
    }
  }
};
</script>

<style scoped></style>
