<template>
  <div id="page_company_detail" class="dashboard-content">
    <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("common.back") }}</span>
    </a>
    <b-row class="mt-5">
      <b-col md="12">
        <div class="company-detail__header">
          <div class="company-detail__header__photo">
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
                  style="width:31px"
                  class="mr-3"
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
                  style="width: 22px"
                  class="mr-3"
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
                <span class="pull-right">{{
                  model.automaticCollection ? $t("common.yes") : $t("common.no")
                }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.limit_credit_safe") }}
                <span class="pull-right">{{ model.limitCreditSafe }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.charge_travel_expenses") }}
                <span class="pull-right">{{
                  model.chargeTravelExpenses
                    ? $t("common.yes")
                    : $t("common.no")
                }}</span>
              </li>
              <li>
                {{ $t("page_detail_company.form.charge_other_expenses") }}
                <span class="pull-right">{{
                  model.chargeOtherExpenses ? $t("common.yes") : $t("common.no")
                }}</span>
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
              <label
                for="attachment"
                class="btn btn-blue m-0"
                style="min-width:160px;"
              >
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
      managers: [],
      errors: null,
      companyId: "",
      imageData: {},
      selectedAttachmentId: null,
      vatShiftedEnabled: false,
      gAccountEnabled: false,
      selectedManager: null
    };
  },
  async mounted() {
    this.companyId = this.$route.params.companyId;
    await this.getCompany();
    await this.getManagers();
  },
  computed: {
    role() {
      return this.$store.state.user.role;
    }
  },
  methods: {
    async getManagers() {
      return usersApi
        .getAll({
          filter: {
            and: [
              { key: "companyId", value: this.companyId, opt: "eq" },
              { key: "role", value: "manager", opt: "eq" }
            ]
          },
          pagination: 0
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
    viewFile(attachment) {},
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
