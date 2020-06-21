<template>
  <b-modal
    ref="modal-access-request"
    size="md"
    :hide-footer="true"
    :hide-header="true"
    centered
    v-model="showModal"
  >
    <h2 class="color-red text-center mt-3">
      {{ $t("page_companies.modal.access_request.title") }}
    </h2>

    <div class="row my-3">
      <div class="col">
        <div class="color-blue">
          {{ $t("page_companies.modal.access_request.description") }}
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col">
        <span>{{ $t("page_companies.modal.access_request.unique_id") }}:</span>
        <b-input v-model="model.companyId" class="custom-input" />
      </div>
    </div>
    <div class="text-center mt-5">
      <button class="btn btn-blue large">
        <span>{{ $t("page_companies.modal.access_request.send_button") }}</span>
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "CompanyAccessRequest",
  props: {
    modalOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modalOpen;
      },
      set(v) {
        this.$emit("update:modalOpen", v);
      }
    }
  },
  data() {
    return {
      model: {
        companyId: null
      }
    };
  }
};
</script>

<style scoped />
