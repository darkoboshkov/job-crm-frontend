<template>
  <div id="page_user_create" class="dashboard-content">
    <div class="d-flex">
      <a
        href="javascript:void(0)"
        class="back pull-left"
        @click.prevent="$router.go(-1)"
      >
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
    </div>
    <div class="content">
      <h1 class="title text-center">
        {{ $t("page_offer_extend.title") }}
      </h1>
      <p class="description text-center mt-5">
        {{ $t("page_offer_extend.description") }}
      </p>
      <div class="mt-5">
        <button
          class="btn btn-red large mr-2 min-width-260"
          @click="createCurrentModal"
        >
          {{ $t("page_offer_extend.button.current") }}
        </button>

        <button
          class="btn btn-blue large ml-2 min-width-240"
          @click="createNewModal"
        >
          {{ $t("page_offer_extend.button.clean") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import jobOffersApi from "@/services/api/joboffers";

export default {
  name: "ExtendContract",
  data() {
    return {
      companyId: this.$route.params.companyId,
      offerId: this.$route.params.offerId
    };
  },
  methods: {
    createCurrentModal() {
      this.$store.dispatch("updateShowConfirmModal", true);
      this.$store.dispatch("updateConfirmModalContent", {
        title: this.$t("page_offer_extend.modal.current.title"),
        subTitle: this.$t("page_offer_extend.modal.current.sub_title"),
        button: this.$t("page_offer_extend.modal.current.continue"),
        onButtonClick: () => {
          this.createCurrentJobOffer();
          this.$store.dispatch("updateShowConfirmModal", false);
        }
      });
    },
    createCurrentJobOffer() {
      jobOffersApi
        .createCurrentJobOffer({
          companyId: this.companyId,
          offerId: this.offerId
        })
        .then(res => {
          if (res.companyId === res.hiringCompanyId) {
            this.$router.push({
              name: "admin-offer-details",
              params: {
                offerId: res._id,
                companyId: res.companyId
              }
            });
          } else {
            this.$router.push({
              name: "admin-offer-inter-details",
              params: {
                offerId: res._id,
                companyId: res.companyId
              }
            });
          }
        });
    },
    createNewModal() {
      this.$store.dispatch("updateShowConfirmModal", true);
      this.$store.dispatch("updateConfirmModalContent", {
        title: this.$t("page_offer_extend.modal.clean.title"),
        subTitle: this.$t("page_offer_extend.modal.clean.sub_title"),
        button: this.$t("page_offer_extend.modal.clean.continue"),
        onButtonClick: () => {
          this.createNewJobOffer();
          this.$store.dispatch("updateShowConfirmModal", false);
        }
      });
    },
    createNewJobOffer() {
      jobOffersApi
        .createNewJobOffer({
          companyId: this.companyId,
          offerId: this.offerId
        })
        .then(res => {
          if (res.companyId === res.hiringCompanyId) {
            this.$router.push({
              name: "admin-offer-details",
              params: {
                offerId: res._id,
                companyId: res.companyId
              }
            });
          } else {
            this.$router.push({
              name: "admin-offer-inter-details",
              params: {
                offerId: res._id,
                companyId: res.companyId
              }
            });
          }
        });
    }
  }
};
</script>

<style scoped></style>
