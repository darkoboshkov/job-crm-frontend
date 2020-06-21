<template>
  <div id="page_company_create" class="dashboard-content">
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
      <div class="company-create__header text-center">
        <h1>
          {{ $t("page_detail_company.create_title") }}
        </h1>
      </div>
      <div class="company-create__description">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 col-md-4">
              <div class="company-create__photo">
                <div class="image-wrapper upload">
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
                {{ $t("page_detail_company.create_description") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <form class="company-create__form mt-5" ref="company-create-form">
        <div class="container">
          <div class="row mt-5 align-items-center">
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
              />
            </div>
          </div>
          <div class="row mt-5 align-items-center">
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
              />
            </div>
          </div>
          <div class="row mt-5 align-items-center">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.type") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-select class="normal-size" v-model="model.type">
                <option
                  v-for="companyType in companyTypes"
                  :value="companyType.type"
                  :key="companyType.type"
                >
                  {{ companyType.type }}
                </option>
              </b-form-select>
            </div>
          </div>
          <div class="row row mt-5 align-items-center">
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
              />
            </div>
          </div>
          <div class="row mt-5 align-items-center">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_detail_company.form.limit_credit_safe") }}:
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
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.country") }}:</label>
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
              <label>{{ $t("page_detail_company.form.city") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="city"
                class="custom-input"
                v-model="model.city"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.street") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="street"
                class="custom-input"
                v-model="model.street"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.houseNumber") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="houseNumber"
                class="custom-input"
                v-model="model.houseNumber"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.postalCode") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-input
                name="postalCode"
                class="custom-input"
                v-model="model.postalCode"
              />
            </div>
          </div>
          <div class="row align-items-center mt-5">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.phone") }}:</label>
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
              <label>{{ $t("page_detail_company.form.description") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <b-form-textarea
                rows="10"
                class="custom-input"
                v-model="model.description"
              />
            </div>
          </div>
          <div class="row mt-5 align-items-center">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.vat_shifted") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <div class="row align-items-center">
                <div class="col-12 col-md-4">
                  <b-form-group class="mb-2">
                    <b-form-radio-group
                      id="radio-group-1"
                      v-model="model.vatShiftedEnabled"
                      name="vat_shifted"
                      style="outline: none;"
                    >
                      <b-form-radio :value="false" class="mr-5">
                        {{ $t("common.no") }}
                      </b-form-radio>
                      <b-form-radio :value="true">
                        {{ $t("common.yes") }}
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row align-items-center">
                    <div class="col-12 col-md-4">
                      <label class="pull-right">
                        {{ $t("page_detail_company.form.number") }}:
                      </label>
                    </div>
                    <div class="col-12 col-md-8">
                      <b-form-input
                        type="text"
                        name="vat_shifted"
                        :disabled="!model.vatShiftedEnabled"
                        class="custom-input"
                        v-model="model.VATShifted"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5 align-items-center">
            <div class="col-12 col-md-4">
              <label>{{ $t("page_detail_company.form.g_account") }}:</label>
            </div>
            <div class="col-12 col-md-8">
              <div class="row align-items-center">
                <div class="col-12 col-md-4">
                  <b-form-group>
                    <b-form-radio-group
                      id="radio-group-2"
                      v-model="model.gAccountEnabled"
                      name="g_account"
                      style="outline: none;"
                    >
                      <b-form-radio :value="false" class="mr-5">
                        {{ $t("common.no") }}
                      </b-form-radio>
                      <b-form-radio :value="true">
                        {{ $t("common.yes") }}
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row align-items-center">
                    <div class="col-12 col-md-4">
                      <label class="pull-right">
                        {{ $t("page_detail_company.form.percentage") }}:
                      </label>
                    </div>
                    <div class="col-12 col-md-8">
                      <b-form-input
                        type="number"
                        name="GAccount"
                        :disabled="!model.gAccountEnabled"
                        class="custom-input"
                        v-model="model.GAccount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5 align-items-center">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_detail_company.form.terms_of_payment") }}:
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
          <div class="row mt-5 align-items-center">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_detail_company.form.automatic_collection") }}:
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
                  <b-form-radio :value="false" class="mr-5">
                    {{ $t("common.no") }}
                  </b-form-radio>
                  <b-form-radio :value="true">
                    {{ $t("common.yes") }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row mt-5 align-items-center">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_detail_company.form.charge_travel_expenses") }}:
              </label>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-5"
                  v-model="model.chargeTravelExpenses"
                  name="charge_travel_expenses"
                  style="outline: none;"
                >
                  <b-form-radio :value="false" class="mr-5">
                    {{ $t("common.no") }}
                  </b-form-radio>
                  <b-form-radio :value="true">
                    {{ $t("common.yes") }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row mt-5 align-items-center">
            <div class="col-12 col-md-4">
              <label>
                {{ $t("page_detail_company.form.charge_other_expenses") }}:
              </label>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group class="mb-2">
                <b-form-radio-group
                  id="radio-group-6"
                  v-model="model.chargeOtherExpenses"
                  name="charge_other_expenses"
                  style="outline: none;"
                >
                  <b-form-radio :value="false" class="mr-5">
                    {{ $t("common.no") }}
                  </b-form-radio>
                  <b-form-radio :value="true">
                    {{ $t("common.yes") }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          <div class="row mt-5 align-items-center">
            <div class="col-12 text-right">
              <button type="submit" class="btn btn-blue">
                {{ $t("page_detail_company.button.create") }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import companiesApi from "@/services/api/companies";
import constantsApi from "@/services/api/constants";

export default {
  name: "CompanyCreate",
  data() {
    return {
      model: {
        name: "",
        email: "",
        phoneNumber: "",
        description: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        kvkNumber: "",
        limitCreditSafe: "",
        vatShiftedEnabled: false,
        VATShifted: "",
        gAccountEnabled: false,
        GAccount: "",
        termOfPayment: "",
        automaticCollection: true,
        chargeTravelExpenses: true,
        chargeOtherExpenses: true,
        active: false,
        members: [],
        type: "normal"
      },
      companyTypes: [
        { id: 1, type: "normal" },
        { id: 2, type: "intermediary" }
      ],
      managers: [],
      termsOfPayment: [],
      errors: null,
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
    getTermsOfPayment() {
      constantsApi.getAll().then(res => {
        this.termsOfPayment = res.termsOfPayments;
        this.model.termOfPayment = this.termsOfPayment[0];
      });
    },
    async create() {
      try {
        if (this.imageData.file) {
          this.isImageLoading = true;
          const data = new FormData();
          data.append("title", this.imageData.title);
          data.append("file", this.imageData.file);
          const response = await companiesApi.uploadLogo(data);
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

        companiesApi
          .create(this.model)
          .then(res => {
            this.$store.dispatch("updateShowSuccessModal", true);
            this.$store.dispatch("updateSuccessModalContent", {
              title: this.$t("page_detail_company.modal.create_success.title"),
              subTitle: this.$t(
                "page_detail_company.modal.create_success.sub_title"
              ),
              button: this.$t(
                "page_detail_company.modal.create_success.continue"
              ),
              onButtonClick: () => {
                this.$router.push({
                  name: "admin-companies-detail",
                  params: { companyId: res._id }
                });
                this.$store.dispatch("updateShowSuccessModal", false);
              }
            });
          })
          .catch(error => {
            this.errors = error.response.data.errors.msg;
            this.$store.dispatch("updateShowErrorModal", true);
            this.$store.dispatch("updateErrorModalContent", {
              title: this.$t("page_detail_company.modal.create_error.title"),
              button: this.$t("page_detail_company.modal.create_error.continue")
            });
          });
      } catch (error) {
        this.isImageLoading = false;
      }
    },
    catchSubmitCreate(e) {
      e.preventDefault();
      this.create();
    }
  },
  mounted() {
    this.getTermsOfPayment();
    this.$refs["company-create-form"].addEventListener(
      "submit",
      this.catchSubmitCreate.bind(this)
    );
  },
  beforeDestroy() {
    this.$refs["company-create-form"].removeEventListener(
      "submit",
      this.catchSubmitCreate
    );
  }
};
</script>
