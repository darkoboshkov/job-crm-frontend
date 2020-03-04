<template>
  <div id="page_companies_detail" class="dashboard-content">
    <div class="d-flex justify-content-between">
      <a
        href="javascript:void(0)"
        class="back pull-left"
        @click.prevent="$router.go(-1)"
      >
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
      <div class="pull-right">
        <a href="javascript:void(0);" @click.prevent="onEditCompany">
          {{
            editCompany
              ? $t("page_detail_company.save")
              : $t("page_detail_company.edit")
          }}
        </a>
        <i class="hiway-crm-icon icon-pencil ml-2" />
      </div>
    </div>
    <div class="content">
      <div class="company-detail__header text-center">
        <h1>
          {{ $t("page_detail_company.edit_title") }}
        </h1>
      </div>

      <div class="company-detail__description d-flex align-items-center">
        <div class="company-detail__photo">
          <div class="image-wrapper">
            <img :src="imageData.preview" />
            <b-spinner type="grow" label="Spinning" v-if="isImageLoading" />
            <input
                    type="file"
                    class="form-control"
                    id="image_upload"
                    accept="image/*"
                    :disabled="!editCompany"
                    @change="onFileChange"
            />
          </div>
        </div>
        <p class="m-0">
          {{ $t("page_detail_company.description") }}
        </p>
      </div>

      <form class="company-detail__form mt-5" ref="company-detail-form">
        <div class="container">
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.name") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="text"
                name="name"
                required
                class="custom-input"
                v-model="model.name"
                :disabled="!editCompany"
              ></b-form-input>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.email") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="email"
                name="email"
                required
                class="custom-input"
                v-model="model.email"
                :disabled="!editCompany"
              ></b-form-input>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.kvk") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="number"
                name="kvk"
                required
                class="custom-input"
                v-model="model.kvkNumber"
                :disabled="!editCompany"
              ></b-form-input>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label
                >{{ $t("page_detail_company.form.limit_credit_safe") }}:</label
              >
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="number"
                name="limit_credit_safe"
                required
                class="custom-input"
                v-model="model.limitCreditSafe"
                :disabled="!editCompany"
              ></b-form-input>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.vat_shifted") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <div class="row align-items-center">
                <div class="col-12 col-md-4">
                  <b-form-group class="mb-2">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="vatShiftedEnabled"
                      name="vat_shifted"
                      style="outline: none;"
                      :disabled="!editCompany"
                    >
                      <b-form-radio :value="false" class="mr-5"
                        >No</b-form-radio
                      >
                      <b-form-radio :value="true">Yes</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row align-items-center">
                    <div class="col-12 col-md-4">
                      <label class="pull-right">Number:</label>
                    </div>
                    <div class="col-12 col-md-8">
                      <b-form-input
                        type="text"
                        name="vat_shifted"
                        :disabled="!vatShiftedEnabled || !editCompany"
                        class="custom-input"
                        v-model="model.VATShifted"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.g_account") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <div class="row align-items-center">
                <div class="col-12 col-md-4">
                  <b-form-group class="mb-2">
                    <b-form-radio-group
                      id="radio-group-2"
                      v-model="gAccountEnabled"
                      name="g_account"
                      style="outline: none;"
                      :disabled="!editCompany"
                    >
                      <b-form-radio :value="false" class="mr-5"
                        >No</b-form-radio
                      >
                      <b-form-radio :value="true">Yes</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row align-items-center">
                    <div class="col-12 col-md-4">
                      <label class="pull-right">Percentage:</label>
                    </div>
                    <div class="col-12 col-md-8">
                      <b-form-input
                        type="number"
                        name="vat_shifted"
                        :disabled="!gAccountEnabled || !editCompany"
                        class="custom-input"
                        v-model="model.GAccount"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label
                >{{ $t("page_detail_company.form.terms_of_payment") }}:</label
              >
            </div>
            <div class="col-12 col-md-8">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-3"
                  v-model="model.termOfPayment"
                  :options="termsOfPayment"
                  name="term_of_payment"
                  style="outline: none;"
                  :disabled="!editCompany"
                ></b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label
                >{{
                  $t("page_detail_company.form.automatic_collection")
                }}:</label
              >
            </div>
            <div class="col-12 col-md-6">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-4"
                  v-model="model.automaticCollection"
                  name="automatic_collection"
                  style="outline: none;"
                  :disabled="!editCompany"
                >
                  <b-form-radio :value="false" class="mr-5">No</b-form-radio>
                  <b-form-radio :value="true">Yes</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label
                >{{
                  $t("page_detail_company.form.charge_travel_expenses")
                }}:</label
              >
            </div>
            <div class="col-12 col-md-8">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-5"
                  v-model="model.chargeTravelExpenses"
                  name="charge_travel_expenses"
                  style="outline: none;"
                  :disabled="!editCompany"
                >
                  <b-form-radio :value="false" class="mr-5">No</b-form-radio>
                  <b-form-radio :value="true">Yes</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label
                >{{
                  $t("page_detail_company.form.charge_other_expenses")
                }}:</label
              >
            </div>
            <div class="col-12 col-md-8">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-6"
                  v-model="model.chargeOtherExpenses"
                  name="charge_other_expenses"
                  style="outline: none;"
                  :disabled="!editCompany"
                >
                  <b-form-radio :value="false" class="mr-5">No</b-form-radio>
                  <b-form-radio :value="true">Yes</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <!--<div class="col-12 col-md-6">-->
            <!--<div class="form-element">-->
            <!--<b-form-checkbox-->
            <!--v-model="model.active"-->
            <!--class="custom-input"-->
            <!--name="is_active"-->
            <!--&gt;-->
            <!--{{ $t("page_detail_company.form.is_active") }}-->
            <!--</b-form-checkbox>-->
            <!--</div>-->
            <!--</div>-->
            <div class="col-12 col-md-6">
              <!--<div class="form-element">-->
              <!--<label>{{ $t("COMPANY_MEMBERS") }}:</label>-->
              <!--<b-form-input-->
              <!--type="text"-->
              <!--required-->
              <!--class="custom-input"-->
              <!--v-model="model.members"-->
              <!--/>-->
              <!--</div>-->
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12">
              <div class="row">
                <div class="col-6 text-left">
                  <button
                    class="btn btn-red"
                    @click.prevent="deleteCompanyConfirm"
                  >
                    {{ $t("page_detail_company.button.delete") }}
                  </button>
                </div>
                <!--<div class="col-6 text-right">-->
                <!--<button type="submit" class="btn btn-blue">-->
                <!--{{ $t("page_detail_company.button.update") }}-->
                <!--</button>-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import companyApi from "../../../../services/api/companies.js";
import constantsApi from "../../../../services/api/constants.js";
import errorReader from "@/helpers/ErrorReader";
import { APP_URL } from "@/constants";

export default {
  name: "CompanyDetails",
  data() {
    return {
      editCompany: false,
      vatShiftedEnabled: false,
      gAccountEnabled: false,
      companyId: this.$route.params.companyId,
      model: {
        name: "",
        email: "",
        phoneNumber: "",
        kvkNumber: "",
        limitCreditSafe: "",
        VATShifted: "",
        GAccount: "",
        termOfPayment: "",
        automaticCollection: true,
        chargeTravelExpenses: true,
        chargeOtherExpenses: true,
        active: false,
        members: []
      },
      termsOfPayment: [],
      error: "",
      imageData: {
        preview: null
      },
      isImageLoading: false
    };
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      if (window.File && window.FileList && window.FileReader) {
        let reader = new FileReader();
        let vm = this;

        if (files.length !== 1 || !files[0].type.match("image")) return;
        let file = files[0];
        reader.onload = e => {
          let title = file.name;
          let titleArray = title.split(".");
          title = title.replace("." + titleArray[titleArray.length - 1], "");

          vm.imageData = {
            file: file,
            preview: e.target.result,
            title: title,
            size: file.size
          };
        };
        reader.readAsDataURL(file);
      } else {
        console.error("Your browser does not support File API");
      }
    },
    onEditCompany() {
      if (this.editCompany) {
        this.update();
      } else {
        this.editCompany = !this.editCompany;
      }
    },
    getCompany() {
      companyApi
        .getById({
          companyId: this.companyId
        })
        .then(res => {
          this.model = res;
          this.vatShiftedEnabled = !!res.VATShifted;
          this.gAccountEnabled = !!res.GAccount;

          this.imageData.preview = res.logo ? `${APP_URL}${res.logo}` : null;
        });
    },
    getTermsOfPayment() {
      return constantsApi.getAll().then(res => {
        this.termsOfPayment = res.termsOfPayments;
        this.model.termOfPayment = this.termsOfPayment[0];
      });
    },
    async update() {
      try {
        if (this.imageData.file) {
          this.isImageLoading = true;
          const data = new FormData();
          data.append("title", this.imageData.title);
          data.append("file", this.imageData.file);
          const response = await companyApi.uploadLogo(data);
          this.isImageLoading = false;
          this.model.logo = response.path;
          delete this.imageData.file;
        }

        if (!this.model.vatShiftedEnabled) {
          delete this.model.VATShifted;
        }
        if (!this.model.gAccountEnabled) {
          delete this.model.GAccount;
        }

        companyApi
                .patch(
                        Object.assign(this.model, {
                          companyId: this.model._id
                        })
                )
                .then(res => {
                  this.$store.dispatch("updateShowSuccessModal", true);
                  this.$store.dispatch("updateSuccessModalContent", {
                    title: this.$t("page_detail_company.modal.update_success.title"),
                    subTitle: this.$t(
                            "page_detail_company.modal.update_success.sub_title"
                    ),
                    button: this.$t("page_detail_company.modal.update_success.continue")
                  });

                  this.editCompany = !this.editCompany;
                })
                .catch(err => {
                  // let read = errorReader(err);
                  // this.error = read.param + ' is ' + read.msg.toLowerCase();

                  this.error = err.response.data?.errors?.msg;

                  this.$store.dispatch("updateShowErrorModal", true);
                  this.$store.dispatch("updateErrorModalContent", {
                    title: this.$t("page_detail_company.modal.update_error.title"),
                    subTitle: this.error,
                    button: this.$t("page_detail_company.modal.update_error.continue")
                  });
                });
      } catch (error) {
        this.isImageLoading = false;
        console.log(error);
      }
    },
    catchSubmitUpdate(e) {
      e.preventDefault();
      this.update();
    },
    deleteCompanyConfirm() {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_companies.modal.company_delete.title"),
        subTitle: this.$t("page_companies.modal.company_delete.sub_title"),
        button: this.$t("page_companies.modal.company_delete.continue"),
        onButtonClick: () => {
          this.deleteCompany();
        }
      });
    },
    deleteCompany() {
      companyApi
        .delete({
          companyId: this.companyId
        })
        .then(res => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.$router.push("/admin/dashboard/companies");
        });
    }
  },
  mounted() {
    this.getCompany();
    this.getTermsOfPayment();
    this.$refs["company-detail-form"].addEventListener(
      "submit",
      this.catchSubmitUpdate.bind(this)
    );
  },
  beforeDestroy() {
    this.$refs["company-detail-form"].removeEventListener(
      "submit",
      this.catchSubmitUpdate
    );
  }
};
</script>
