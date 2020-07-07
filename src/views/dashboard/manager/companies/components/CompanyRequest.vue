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
      <button class="btn btn-blue large" @click="sendCompanyAccess">
        <span>{{ $t("page_companies.modal.access_request.send_button") }}</span>
      </button>
    </div>
  </b-modal>
</template>

<script>
import companiesApi from "@/services/api/companies";

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
  },
  methods: {
    sendCompanyAccess() {
      companiesApi
        .sendCompanyAccess({
          companyId: this.$store.state.user.companyId,
          hiringCompanyId: this.model.companyId
        })
        .then(res => {
          this.showModal = false;
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_offer_end.modal.success.title"),
            button: this.$t("page_offer_end.modal.success.continue"),
            onButtonClick: () => {
              this.$store.dispatch("updateShowSuccessModal", false);
            }
          });
        })
        .catch(e => {
          this.showModal = false;
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_end.modal.fail.title"),
            button: this.$t("page_offer_end.modal.fail.continue")
          });
        });
    }
  }
};
</script>

<style scoped></style>
