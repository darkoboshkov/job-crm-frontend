<template>
  <div id="page_companies_edit" class="dashboard-content">
    <div class="d-flex justify-content-between">
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
      <div class="company-detail__header text-center">
        <h1>
          {{ $t("page_edit_company.edit_title") }}
        </h1>
      </div>

      <div class="company-detail__description">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 col-md-4">
              <div class="company-detail__photo">
                <div class="image-wrapper">
                  <img :src="imageData.preview" />
                  <b-spinner
                    type="grow"
                    label="Spinning"
                    v-if="isImageLoading"
                  />
                  <input
                    type="file"
                    class="form-control"
                    id="image_upload"
                    accept="image/*"
                    @change="onFileChange"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <p class="m-0">
                {{ $t("page_edit_company.description") }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form class="company-detail__form mt-5" ref="company-detail-form">
        <div class="container">
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.name") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="text"
                name="name"
                required
                class="custom-input"
                v-model="model.name"
              />
              <b-form-invalid-feedback class="d-block" v-if="nameError">
                {{ $t(`validation.${nameError}`) }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.email") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="email"
                name="email"
                required
                class="custom-input"
                v-model="model.email"
              />
              <b-form-invalid-feedback class="d-block" v-if="emailError">
                {{ $t(`validation.${emailError}`) }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.kvk") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="number"
                name="kvk"
                required
                class="custom-input"
                v-model="model.kvkNumber"
              />
              <b-form-invalid-feedback class="d-block" v-if="kvkNumberError">
                {{ $t(`validation.${kvkNumberError}`) }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_edit_company.form.limit_credit_safe") }}:
              </label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="number"
                name="limit_credit_safe"
                required
                class="custom-input"
                v-model="model.limitCreditSafe"
              />
              <b-form-invalid-feedback
                class="d-block"
                v-if="limitCreditSafeError"
              >
                {{ $t(`validation.${limitCreditSafeError}`) }}
              </b-form-invalid-feedback>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.country") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="country"
                class="custom-input"
                v-model="model.country"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.city") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="country"
                class="custom-input"
                v-model="model.city"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.street") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="country"
                class="custom-input"
                v-model="model.street"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.houseNumber") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="country"
                class="custom-input"
                v-model="model.houseNumber"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.postalCode") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="country"
                class="custom-input"
                v-model="model.postalCode"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.phone") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                type="text"
                class="custom-input"
                v-model="model.phoneNumber"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.description") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-textarea
                rows="10"
                class="custom-input"
                v-model="model.description"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.vat_shifted") }}:</label>
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
                    >
                      <b-form-radio :value="false" class="mr-5"
                        >{{ $t("common.no") }}
                      </b-form-radio>
                      <b-form-radio :value="true"
                        >{{ $t("common.yes") }}
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row align-items-center">
                    <div class="col-12 col-md-4">
                      <label class="pull-right"
                        >{{ $t("page_edit_company.form.number") }}:</label
                      >
                    </div>
                    <div class="col-12 col-md-8">
                      <b-form-input
                        type="text"
                        name="vat_shifted"
                        :disabled="!vatShiftedEnabled"
                        class="custom-input"
                        v-model="model.VATShifted"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_edit_company.form.g_account") }}:</label>
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
                    >
                      <b-form-radio :value="false" class="mr-5"
                        >{{ $t("common.no") }}
                      </b-form-radio>
                      <b-form-radio :value="true"
                        >{{ $t("common.yes") }}
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row align-items-center">
                    <div class="col-12 col-md-4">
                      <label class="pull-right"
                        >{{ $t("page_edit_company.form.percentage") }}:</label
                      >
                    </div>
                    <div class="col-12 col-md-8">
                      <b-form-input
                        type="number"
                        name="vat_shifted"
                        :disabled="!gAccountEnabled"
                        class="custom-input"
                        v-model="model.GAccount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_edit_company.form.terms_of_payment") }}:
              </label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-3"
                  v-model="model.termOfPayment"
                  :options="termsOfPayment"
                  name="term_of_payment"
                  style="outline: none;"
                />
              </b-form-group>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_edit_company.form.automatic_collection") }}:
              </label>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-4"
                  v-model="model.automaticCollection"
                  name="automatic_collection"
                  style="outline: none;"
                >
                  <b-form-radio :value="false" class="mr-5"
                    >{{ $t("common.no") }}
                  </b-form-radio>
                  <b-form-radio :value="true"
                    >{{ $t("common.yes") }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_edit_company.form.charge_travel_expenses") }}:
              </label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-5"
                  v-model="model.chargeTravelExpenses"
                  name="charge_travel_expenses"
                  style="outline: none;"
                >
                  <b-form-radio :value="false" class="mr-5"
                    >{{ $t("common.no") }}
                  </b-form-radio>
                  <b-form-radio :value="true"
                    >{{ $t("common.yes") }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_edit_company.form.charge_other_expenses") }}:
              </label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-6"
                  v-model="model.chargeOtherExpenses"
                  name="charge_other_expenses"
                  style="outline: none;"
                >
                  <b-form-radio :value="false" class="mr-5"
                    >{{ $t("common.no") }}
                  </b-form-radio>
                  <b-form-radio :value="true"
                    >{{ $t("common.yes") }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12">
              <div class="row">
                <div class="col-6 text-left">
                  <button class="btn btn-blue" @click.prevent="update">
                    {{ $t("page_edit_company.button.update") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import companyApi from "@/services/api/companies";
import constantsApi from "@/services/api/constants";

export default {
  name: "CompanyEdit",
  data() {
    return {
      vatShiftedEnabled: false,
      gAccountEnabled: false,
      companyId: this.$route.params.companyId,
      model: {
        name: "",
        email: "",
        phoneNumber: "",
        description: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        postalcode: "",
        kvkNumber: "",
        limitCreditSafe: "",
        VATShifted: null,
        GAccount: null,
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
      isImageLoading: false,
      nameError: "",
      emailError: "",
      kvkNumberError: "",
      limitCreditSafeError: ""
    };
  },
  methods: {
    validate() {
      let valid = true;
      if (!this.model.name) {
        this.nameError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.nameError = "";
      }
      if (!this.model.email) {
        this.emailError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.emailError = "";
      }
      if (!this.model.kvkNumber) {
        this.kvkNumberError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.kvkNumberError = "";
      }
      if (!this.model.limitCreditSafe) {
        this.limitCreditSafeError = "THIS_FIELD_IS_REQUIRED";
        valid = false;
      } else {
        this.limitCreditSafeError = "";
      }
      return valid;
    },
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
    getCompany() {
      companyApi
        .getById({
          companyId: this.companyId
        })
        .then(res => {
          this.model = res;
          this.vatShiftedEnabled = !!res.VATShifted;
          this.gAccountEnabled = !!res.GAccount;

          this.imageData.preview = res.logo ? this.getAppUrl(res.logo) : null;
        });
    },
    getTermsOfPayment() {
      constantsApi.getAll().then(res => {
        this.termsOfPayment = res.termsOfPayments;
        this.model.termOfPayment = this.termsOfPayment[0];
      });
    },
    async update() {
      if (this.validate()) {
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

          if (!this.vatShiftedEnabled) {
            this.model.VATShifted = null;
          }
          if (!this.gAccountEnabled) {
            this.model.GAccount = null;
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
                title: this.$t("page_edit_company.modal.update_success.title"),
                subTitle: this.$t(
                  "page_edit_company.modal.update_success.sub_title"
                ),
                button: this.$t(
                  "page_edit_company.modal.update_success.continue"
                )
              });

              this.editCompany = !this.editCompany;
            })
            .catch(err => {
              // let read = errorReader(err);
              // this.error = read.param + ' is ' + read.msg.toLowerCase();

              this.error = err.response.data?.errors?.msg;

              this.$store.dispatch("updateShowErrorModal", true);
              this.$store.dispatch("updateErrorModalContent", {
                title: this.$t("page_edit_company.modal.update_error.title"),
                subTitle: this.error,
                button: this.$t("page_edit_company.modal.update_error.continue")
              });
            });
        } catch (error) {
          this.isImageLoading = false;
          console.log(error);
        }
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
