<template>
  <div id="page_company_detail" class="dashboard-content">
    <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("common.back") }}</span>
    </a>
    <b-row class="mt-5">
      <b-col md="12">
        <div class="company-detail__header">
          <div class="avatar-image size-112">
            <img v-if="model.logo" :src="model.logo | appUrlFormatter" />
          </div>
          <div class="company-detail__header__description">
            <div>
              <h2 class="fullName">{{ model.name }}</h2>
            </div>
            <h3 class="profession mt-3">
              {{ model.city }}
            </h3>
          </div>
        </div>
        <div class="company-detail__edit">
          <a href="javascript:void(0);" @click.prevent="onEditDetail">
            {{ $t("page_detail_company.edit") }}
          </a>
          <i class="hiway-crm-icon icon-pencil ml-2" />
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-1">
      <b-col md="6" class="d-flex flex-column justify-content-between">
        <b-card class="mt-4 h-100">
          <template v-slot:header>
            <h5 class="m-0">{{ $t("page_detail_company.description") }}</h5>
          </template>
          <div>
            {{ model.description }}
          </div>
        </b-card>
        <b-row>
          <b-col md="6">
            <b-card class="mt-4">
              <div class="d-flex">
                <img
                  src="@/assets/image/icon/mail-red.svg"
                  class="mr-3 mail-red"
                />
                <span>
                  <a v-if="model.email" :href="'mailto:' + model.email">
                    {{ model.email }}
                  </a>
                </span>
              </div>
            </b-card>
          </b-col>

          <b-col md="6">
            <b-card class="mt-4">
              <div class="d-flex">
                <img
                  src="@/assets/image/icon/phone-red.svg"
                  class="mr-3 phone-red"
                />
                <span>{{ model.phoneNumber }}</span>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="6" class="mt-4">
        <b-card>
          <template v-slot:header>
            <h5 class="m-0">
              {{ $t("page_job_detail.form.specifications") }}
            </h5>
          </template>
          <div>
            <ul class="custom-list">
              <li>
                {{ $t("page_detail_company.form.name") }}
                <span class="pull-right">{{ model.name }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.kvk") }}
                <span class="pull-right">{{ model.kvkNumber }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.country") }}
                <span class="pull-right">{{ model.country }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.city") }}
                <span class="pull-right">{{ model.city }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.address") }}
                <span class="pull-right">{{ model.address }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.postalCode") }}
                <span class="pull-right">{{ model.postalCode }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.vat_shifted") }}
                <span class="pull-right">
                  {{ vatShiftedEnabled ? model.VATShifted : $t("common.no") }}
                </span>
              </li>
              <li>
                {{ $t("page_detail_company.form.g_account") }}
                <span class="pull-right">
                  {{ gAccountEnabled ? `${model.GAccount}%` : $t("common.no") }}
                </span>
              </li>
              <li>
                {{ $t("page_detail_company.form.terms_of_payment") }}
                <span class="pull-right">{{ model.termOfPayment }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.automatic_collection") }}
                <span class="pull-right">
                  {{
                    model.automaticCollection
                      ? $t("common.yes")
                      : $t("common.no")
                  }}
                </span>
              </li>
              <li>
                {{ $t("page_detail_company.form.limit_credit_safe") }}
                <span class="pull-right">{{ model.limitCreditSafe }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.charge_travel_expenses") }}
                <span class="pull-right">
                  {{
                    model.chargeTravelExpenses
                      ? $t("common.yes")
                      : $t("common.no")
                  }}
                </span>
              </li>
              <li>
                {{ $t("page_detail_company.form.charge_other_expenses") }}
                <span class="pull-right">
                  {{
                    model.chargeOtherExpenses
                      ? $t("common.yes")
                      : $t("common.no")
                  }}
                </span>
              </li>
            </ul>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col md="12">
        <b-card body-class="p-0">
          <template v-slot:header>
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="m-0">
                {{ $t("page_detail_company.manager_table.title") }}
              </h5>
              <div>
                <button
                  class="btn btn-blue"
                  @click.prevent="
                    $router.push({ name: 'manager-users-create' })
                  "
                >
                  {{ $t("page_detail_company.button.add_manager") }}
                  <i class="hiway-crm-icon icon-pencil ml-2" />
                </button>
              </div>
            </div>
          </template>
          <div>
            <ul class="custom-list interaction">
              <li class="d-flex color-gray px-3">
                <div class="flex-2">
                  {{ $t("page_detail_company.manager_table.name") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_detail_company.manager_table.city") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_detail_company.manager_table.email") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_detail_company.manager_table.phone_number") }}
                </div>
                <div class="flex-2" />
              </li>
              <li
                class="d-flex align-items-center px-3"
                v-for="(manager, index) in this.managers"
                :key="index"
              >
                <div
                  class="flex-2 d-flex flex-row align-items-center"
                  @click="goToProfile(manager._id)"
                >
                  <div class="avatar-image mr-3">
                    <img
                      v-if="manager.image"
                      :src="manager.image | appUrlFormatter"
                    />
                  </div>
                  <div>
                    {{ manager | fullNameFormatter }}
                  </div>
                </div>
                <div class="flex-2">
                  {{ manager.city }}
                </div>
                <div class="flex-2">
                  {{ manager.email }}
                </div>
                <div class="flex-2">
                  {{ manager.phone }}
                </div>
                <div class="flex-2 d-flex">
                  <b-dropdown
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                    offset="0"
                    class="icon-dropdown m-2"
                  >
                    <template v-slot:button-content>
                      <i
                        class="hiway-crm-icon icon-more-vertical color-black"
                      />
                    </template>
                    <b-dropdown-item
                      href="#"
                      @click="selectManager(manager._id)"
                    >
                      {{ $t("page_detail_company.manager_table.delete") }}
                    </b-dropdown-item>
                  </b-dropdown>

                  <button
                    class="btn btn-transparent"
                    @click="selectManager(manager._id)"
                  >
                    <i class="hiway-crm-icon icon-bin" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-5" v-if="showAccessCompanies">
      <b-col md="12">
        <b-card body-class="p-0">
          <template v-slot:header>
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="m-0">
                {{ $t("page_detail_company.access_table.title") }}
              </h5>
            </div>
          </template>
          <div>
            <ul class="custom-list interaction">
              <li class="d-flex color-gray px-3">
                <div class="flex-2">
                  {{ $t("page_detail_company.access_table.name") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_detail_company.access_table.city") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_detail_company.access_table.email") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_detail_company.access_table.postal_code") }}
                </div>
                <div class="flex-2">
                  {{ $t("page_detail_company.access_table.status") }}
                </div>
                <div class="flex-2" />
              </li>
              <li
                class="d-flex align-items-center px-3"
                v-for="(company, index) in this.accessCompanies"
                :key="index"
              >
                <div class="flex-2 d-flex flex-row align-items-center">
                  <div class="avatar-image mr-3">
                    <img
                      v-if="company.logo"
                      :src="company.logo | appUrlFormatter"
                    />
                  </div>
                  <div>
                    {{ company.name | fullNameFormatter }}
                  </div>
                </div>
                <div class="flex-2">
                  {{ company.city }}
                </div>
                <div class="flex-2">
                  {{ company.email }}
                </div>
                <div class="flex-2">
                  {{ company.postalCode }}
                </div>
                <div class="flex-2">
                  {{ $t(`status.${company.status}`) }}
                </div>
                <div class="flex-2 d-flex">
                  <b-dropdown
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                    offset="0"
                    class="icon-dropdown m-2"
                  >
                    <template v-slot:button-content>
                      <i
                        class="hiway-crm-icon icon-more-vertical color-black"
                      />
                    </template>
                    <b-dropdown-item
                      href="#"
                      @click="selectCompanyAccept(company._id)"
                    >
                      {{ $t("page_detail_company.access_table.accept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      href="#"
                      @click="selectCompanyDecline(company._id)"
                    >
                      {{ $t("page_detail_company.access_table.decline") }}
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </li>
            </ul>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col md="12">
        <b-card body-class="p-0">
          <template v-slot:header>
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="m-0">
                <span>{{ $t("page_detail_company.documents") }}</span>
              </h5>
              <input
                type="file"
                id="attachment"
                class="d-none"
                name="attachment"
                accept=".doc,.docx,.pdf"
                @change="onFileChange"
              />
              <label for="attachment" class="btn btn-blue m-0 min-width-160">
                {{ $t("page_detail_company.button.upload") }}
                <i class="hiway-crm-icon icon-upload" />
              </label>
            </div>
          </template>
          <div>
            <ul class="custom-list interaction">
              <li
                class="d-flex align-items-center justify-content-between px-3"
                v-for="(attachment, idx) in model.attachments"
                :key="idx"
              >
                <div class="avatar-image mr-3 ml-3">
                  <img v-if="model.logo" :src="model.logo | appUrlFormatter" />
                </div>
                <div class="flex-1" @click="downloadFile(attachment)">
                  {{ attachment.name }}
                </div>
                <div>
                  <span class="mr-5" @click="downloadFile(attachment)"
                    >{{ attachment.uploadedAt | dateTimeFormatter }}
                  </span>
                  <span class="mr-5" @click="downloadFile(attachment)"
                    >{{ attachment.size | fileSizeFormatter }}
                  </span>
                  <span>
                    <b-dropdown
                      variant="link"
                      toggle-class="text-decoration-none"
                      no-caret
                      offset="0"
                      class="icon-dropdown mx-2"
                    >
                      <template v-slot:button-content>
                        <i
                          class="hiway-crm-icon icon-more-vertical color-black"
                        />
                      </template>
                      <b-dropdown-item @click="downloadFile(attachment)">
                        {{ $t("page_detail_company.download_file") }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </span>
                  <button
                    class="btn btn-transparent"
                    @click="showDeleteAttachmentModal(attachment._id)"
                  >
                    <i class="hiway-crm-icon icon-bin" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import companiesApi from "@/services/api/companies";
import usersApi from "@/services/api/users";
import { downloadFile } from "@/utils";

export default {
  name: "JobsDetail",
  data() {
    return {
      model: {
        name: "",
        description: "",
        email: "",
        phoneNumber: "",
        kvkNumber: "",
        country: "",
        city: "",
        address: "",
        postalCode: "",
        VATShifted: "",
        GAccount: "",
        termOfPayment: "",
        automaticCollection: true,
        limitCreditSafe: "",
        chargeTravelExpenses: true,
        chargeOtherExpenses: true,
        active: false,
        companyMembers: [],
        attachments: []
      },
      showAccessCompanies:
        this.$route.params.companyId === this.$store.state.user.companyId,
      managers: [],
      accessCompanies: [],
      errors: null,
      companyId: this.$route.params.companyId,
      imageData: {},
      selectedAttachmentId: null,
      vatShiftedEnabled: false,
      gAccountEnabled: false,
      selectedManager: null,
      selectedCompanyId: null,
      role: this.$store.state.user.role
    };
  },
  async mounted() {
    await this.getCompany();
    await this.getManagers();
    if (this.showAccessCompanies) {
      await this.getIntermediaryCompanies();
    }
  },
  methods: {
    async getManagers() {
      return usersApi
        .getAllowedCompanyUsers({
          filter: {
            and: [
              { key: "companyId", value: this.companyId, opt: "eq" },
              { key: "role", value: "manager", opt: "eq" }
            ]
          },
          pagination: 0,
          companyId: this.companyId
        })
        .then(res => {
          this.managers = res.docs;
        });
    },
    getCompany() {
      companiesApi
        .getById({
          companyId: this.companyId
        })
        .then(res => {
          this.model = res;
          this.model.address = res.street + " " + res.houseNumber;
          this.vatShiftedEnabled = !!res.VATShifted;
          this.gAccountEnabled = !!res.GAccount;
          this.imageData.preview = res.logo ? this.getAppUrl(res.logo) : null;
        });
    },
    getIntermediaryCompanies() {
      companiesApi
        .getIntermediaryCompanies({
          companyId: this.companyId
        })
        .then(res => {
          this.accessCompanies = res.docs?.map(row => {
            row.status = row.allowedCompanies[0]?.status;
            return row;
          });
        });
    },
    selectCompanyAccept(id) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_detail_company.modal.accept_company.title"),
        subTitle: this.$t("page_detail_company.modal.accept_company.sub_title"),
        button: this.$t("page_detail_company.modal.accept_company.continue"),
        onButtonClick: () => {
          this.companyAccept();
          this.$store.dispatch("updateShowErrorModal", false);
        }
      });
      this.selectedCompanyId = id;
    },
    companyAccept() {
      companiesApi
        .acceptCompanyAccess({
          companyId: this.companyId,
          intermediaryCompanyId: this.selectedCompanyId
        })
        .then(res => {
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_offer_end.modal.success.title"),
            button: this.$t("page_offer_end.modal.success.continue"),
            onButtonClick: () => {
              this.$store.dispatch("updateShowSuccessModal", false);
              this.showModal = false;
            }
          });
          this.getIntermediaryCompanies();
        })
        .catch(e => {
          this.errors = e.response.data.errors.msg;
          this.$store.dispatch("updateLoading", false);
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_end.modal.fail.title"),
            button: this.$t("page_offer_end.modal.fail.continue")
          });
        });
    },
    selectCompanyDecline(id) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_detail_company.modal.decline_company.title"),
        subTitle: this.$t(
          "page_detail_company.modal.decline_company.sub_title"
        ),
        button: this.$t("page_detail_company.modal.decline_company.continue"),
        onButtonClick: () => {
          this.companyDecline();
          this.$store.dispatch("updateShowErrorModal", false);
        }
      });
      this.selectedCompanyId = id;
    },
    companyDecline() {
      companiesApi
        .declineCompanyAccess({
          companyId: this.companyId,
          intermediaryCompanyId: this.selectedCompanyId
        })
        .then(res => {
          this.$store.dispatch("updateShowSuccessModal", true);
          this.$store.dispatch("updateSuccessModalContent", {
            title: this.$t("page_offer_end.modal.success.title"),
            button: this.$t("page_offer_end.modal.success.continue"),
            onButtonClick: () => {
              this.$store.dispatch("updateShowSuccessModal", false);
              this.showModal = false;
            }
          });
          this.getIntermediaryCompanies();
        })
        .catch(e => {
          this.errors = e.response.data.errors.msg;
          this.$store.dispatch("updateLoading", false);
          this.$store.dispatch("updateShowErrorModal", true);
          this.$store.dispatch("updateErrorModalContent", {
            title: this.$t("page_offer_end.modal.fail.title"),
            button: this.$t("page_offer_end.modal.fail.continue")
          });
        });
    },
    onEditDetail() {
      this.$router.push({
        name: "manager-companies-edit",
        params: {
          companyId: this.companyId
        }
      });
    },
    selectManager(id) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_detail_company.modal.remove_manager.title"),
        subTitle: this.$t("page_detail_company.modal.remove_manager.sub_title"),
        button: this.$t("page_detail_company.modal.remove_manager.continue"),
        onButtonClick: () => {
          this.removeManager();
        }
      });

      this.selectedManager = id;
    },
    removeManager() {
      usersApi
        .delete({
          companyId: this.companyId,
          id: this.selectedManager
        })
        .then(res => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.getManagers();
        })
        .catch(err => {});
    },
    goToProfile(userId) {
      // if (userId) {
      //   this.$router.push(
      //     `/${this.role}/dashboard/profile/${this.companyId}/${userId}`
      //   );
      // }
    },
    downloadFile(attachment) {
      companiesApi
        .downloadAttachment({
          companyId: this.companyId,
          attachmentId: attachment._id
        })
        .then(res => {
          downloadFile(res, attachment.name);
        });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      if (window.File && window.FileList && window.FileReader) {
        if (files.length !== 1) return;
        let file = files[0];

        this.imageData = {
          file: file,
          name: file.name,
          size: file.size.toString()
        };

        this.upload();
      } else {
        console.error("Your browser does not support File API");
      }
    },
    upload() {
      const data = new FormData();
      data.append("file", this.imageData.file);
      this.$store.dispatch("updateLoading", true);

      companiesApi
        .upload(data)
        .then(response => {
          this.imageData.path = response.path;
          companiesApi
            .addAttachment(
              Object.assign(
                {
                  companyId: this.companyId
                },
                this.imageData
              )
            )
            .then(res => {
              this.$store.dispatch("updateLoading", false);
              this.getCompany();
            })
            .catch(e => {
              this.$store.dispatch("updateLoading", false);
            });
        })
        .catch(e => {
          this.$store.dispatch("updateLoading", false);
        });
    },
    showDeleteAttachmentModal(attachmentId) {
      this.$store.dispatch("updateShowErrorModal", true);
      this.$store.dispatch("updateErrorModalContent", {
        title: this.$t("page_detail_company.modal.confirm_delete_attach.title"),
        subTitle: this.$t(
          "page_detail_company.modal.confirm_delete_attach.sub_title"
        ),
        button: this.$t(
          "page_detail_company.modal.confirm_delete_attach.continue"
        ),
        onButtonClick: () => {
          this.deleteAttachment();
        }
      });
      this.selectedAttachmentId = attachmentId;
    },
    deleteAttachment() {
      companiesApi
        .deleteAttachment({
          companyId: this.companyId,
          attachmentId: this.selectedAttachmentId
        })
        .then(res => {
          this.$store.dispatch("updateShowErrorModal", false);
          this.getCompany();
        });
    }
  }
};
</script>

<style scoped>
.mail-red {
  width: 31px;
}
.phone-red {
  width: 22px;
}
</style>
