<template>
  <b-modal
    ref="modal-validate-contract"
    :hide-footer="true"
    :hide-header="true"
    size="lg"
    modal-class="modal-validate-contract"
    centered
    v-model="showModal"
  >
    <h2 class="text-center color-red mt-4">
      {{ $t("page_offer_detail.modal.validate_contract.title") }}
    </h2>
    <h4 class="text-center color-gray">
      {{ $t("page_offer_detail.modal.validate_contract.sub_title") }}
    </h4>
    <div class="pl-5" v-if="validations.worker.length">
      <p class="mt-4 font-weight-bold">
        {{ $t("page_offer_detail.modal.validate_contract.worker_info") }}
      </p>
      <b-form-invalid-feedback
        v-for="(item, index) in validations.worker"
        :key="index + 'worker'"
        class="d-block pl-3"
      >
        {{ $t(`validation.${item}`) }}
      </b-form-invalid-feedback>
    </div>
    <div class="pl-5" v-if="validations.company.length">
      <p class="mt-4 font-weight-bold">
        {{ $t("page_offer_detail.modal.validate_contract.company_info") }}
      </p>
      <b-form-invalid-feedback
        v-for="(item, index) in validations.company"
        :key="index + 'company'"
        class="d-block pl-3"
      >
        {{ $t(`validation.${item}`) }}
      </b-form-invalid-feedback>
    </div>
    <div class="pl-5" v-if="validations.manager.length">
      <p class="mt-4 font-weight-bold">
        {{ $t("page_offer_detail.modal.validate_contract.manager_info") }}
      </p>
      <b-form-invalid-feedback
        v-for="(item, index) in validations.manager"
        :key="index + 'manager'"
        class="d-block pl-3"
      >
        {{ $t(`validation.${item}`) }}
      </b-form-invalid-feedback>
    </div>
    <div class="pl-5" v-if="validations.jobOffer.length">
      <p class="mt-4 font-weight-bold">
        {{ $t("page_offer_detail.modal.validate_contract.job_offer_info") }}
      </p>
      <b-form-invalid-feedback
        v-for="(item, index) in validations.jobOffer"
        :key="index + 'jobOffer'"
        class="d-block pl-3"
      >
        {{ $t(`validation.${item}`) }}
      </b-form-invalid-feedback>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "SignValidation",
  props: {
    validations: {
      default: {
        worker: [],
        company: [],
        manager: [],
        jobOffer: []
      }
    },
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
  }
};
</script>

<style scoped />
