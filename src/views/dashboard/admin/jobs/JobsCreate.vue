<template>
  <div id="page_job_create" class="dashboard-content">
    <div class="container-fluid">
      <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
      <b-row class="mt-5">
        <b-col md="12">
          <div class="job-create-header">
            <div class="job-create-header__photo">
              <img src="@/assets/image/avatar_nick.png" />
            </div>
            <div class="job-create-header__description">
              <b-input
                class="mb-3"
                v-model="model.title"
                placeholder="Add job title"
              />
              <h3 class="position">{{ userName }}</h3>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <b-col md="6">
          <b-card class="mt-4">
            <template v-slot:header>
              <h5 class="m-0">{{ $t("page_job_detail.form.description") }}</h5>
            </template>
            <b-textarea
              v-model="model.description"
              rows="5"
              placeholder="Please add your job description here."
            />
          </b-card>

          <!--<b-card class="mt-3">-->
          <!--<template v-slot:header>-->
          <!--<div class="d-flex justify-content-between align-items-end">-->
          <!--<h5 class="m-0">{{ $t("page_job_detail.form.questions") }}</h5>-->
          <!--<button-->
          <!--data-v-74cd9a4e=""-->
          <!--class="btn btn-red circle large"-->
          <!--style="width: 50px;"-->
          <!--@click="model.questions = model.questions.concat([''])"-->
          <!--&gt;-->
          <!--<i data-v-74cd9a4e="" class="hiway-crm-icon icon-add"></i>-->
          <!--</button>-->
          <!--</div>-->
          <!--</template>-->
          <!--<ul class="custom-list">-->
          <!--<li-->
          <!--v-for="(question, idx) in model.questions"-->
          <!--:key="idx"-->
          <!--class="d-flex justify-content-between align-items-center"-->
          <!--&gt;-->
          <!--{{ idx + 1-->
          <!--}}<b-input-->
          <!--v-model="model.questions[idx]"-->
          <!--class="question-input"-->
          <!--/>-->
          <!--</li>-->
          <!--</ul>-->
          <!--</b-card>-->
        </b-col>

        <b-col md="6">
          <b-card class="mt-4">
            <template v-slot:header>
              <h5 class="m-0">
                {{ $t("page_job_detail.form.specifications") }}
              </h5>
            </template>
            <div>
              <ul class="custom-list">
                <li>
                  {{ $t("page_job_detail.form.company") }}
                  <div class="pull-right">
                    <b-form-select
                      v-model="model.company"
                      class="normal-size"
                      style="margin-top:-8px"
                    >
                      <option
                        v-for="(company, index) in companies"
                        :value="company"
                        :key="index"
                      >
                        {{ company && company.name }}
                      </option>
                    </b-form-select>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.manager") }}
                  <div class="pull-right">
                    <b-form-select
                      v-model="model.manager"
                      class="normal-size"
                      style="margin-top:-8px"
                    >
                      <option
                        v-for="(manager, index) in filteredManagers"
                        :value="manager"
                        :key="index"
                      >
                        {{
                          manager && manager.firstName + " " + manager.lastName
                        }}
                      </option>
                    </b-form-select>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.wage") }}
                  <div class="pull-right">
                    <b-input v-model="model.wage" />
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.start_date") }}
                  <div class="pull-right">
                    <b-input type="datetime-local" v-model="model.startDate" />
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.end_date") }}
                  <div class="pull-right">
                    <b-input type="datetime-local" v-model="model.endDate" />
                  </div>
                </li>
              </ul>
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
                  <span>{{ model.manager && model.manager.email }}</span>
                </div>
              </b-card>
            </b-col>

            <b-col md="6" class="mt-4">
              <b-card>
                <div class="d-flex">
                  <img
                    src="@/assets/image/icon/phone-red.svg"
                    style="width: 22px"
                    class="mr-3"
                  />
                  <span>{{ model.manager && model.manager.phone }}</span>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col md="12">
          <b-card>
            <template v-slot:header>
              <div class="d-flex align-items-center">
                <h5 class="m-0 flex-1">{{ $t("page_job_detail.files") }}</h5>
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
                  {{ $t("page_job_detail.button.upload") }}
                  <i class="hiway-crm-icon icon-upload"></i>
                </label>
              </div>
            </template>
            <div class="card-body">
              <div
                class="d-flex justify-content-between"
                v-for="(attachment, idx) in model.attachments"
                :key="idx"
              >
                <div>
                  {{ attachment.name }}
                </div>
                <div>
                  <span class="mr-5"
                    >{{ attachment.uploadedAt | dateFormatter }}
                    {{ attachment.uploadedAt | timeFormatter }}</span
                  >
                  <span class="mr-5">{{ attachment.size }} B</span>
                  <span class="mr-4"
                    ><i class="hiway-crm-icon icon-more-vertical"></i
                  ></span>
                  <span><i class="hiway-crm-icon icon-bin"></i></span>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <div class="text-right">
        <button class="btn btn-red mt-3 text-right" @click="createJob">
          {{ $t("page_job_detail.button.create") }}
        </button>
      </div>
    </div>

    <b-modal
      ref="modal-success"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-success"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/success.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_job_detail.modal.create_success.title") }}
        </p>
        <p class="alert-sub-title">
          {{ $t("page_job_detail.modal.create_success.sub_title") }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-success'].hide()">
          {{ $t("page_job_detail.modal.create_success.continue") }}
        </button>
      </div>
    </b-modal>

    <b-modal
      ref="modal-alert"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-alert"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/alert.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_job_detail.modal.create_error.title") }}
        </p>
        <p class="alert-sub-title">
          {{ error }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-alert'].hide()">
          {{ $t("page_job_detail.modal.create_error.continue") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import jobsApi from "@/services/api/jobs";
import companiesApi from "@/services/api/companies";
import usersApi from "@/services/api/users";
import errorReader from "@/helpers/ErrorReader";
import dateFormatter from "@/helpers/DateFormatter.js";
import timeFormatter from "@/helpers/TimeFormatter.js";

export default {
  name: "JobsCreate",
  data() {
    return {
      model: {
        title: "",
        companyId: 0,
        managerId: 0,
        positionId: 0,
        rate: "",
        status: "available",
        skillIds: [],
        description: "",
        questions: [],
        image: null,
        startDate: new Date().toISOString().substring(0, 16),
        endDate: null,
        company: null,
        manager: null,
        position: null
      },
      companies: [],
      managers: [],
      levels: [],
      state: [],
      error: "",
      imageData: {},
      attachments: []
    };
  },
  mounted() {
    this.getCompanies();
    this.getManagers();
  },
  computed: {
    userName() {
      return (
        this.$store.state.user.firstName + " " + this.$store.state.user.lastName
      );
    },
    filteredManagers() {
      return [null].concat(
        this.managers.filter(
          manager => manager.companyId === this.model.company?._id
        )
      );
    }
  },
  methods: {
    getCompanies() {
      companiesApi.getAll().then(res => {
        this.companies = [null].concat(res);
      });
    },
    getManagers() {
      usersApi
        .getAll({
          filter: {
            role: "manager"
          },
          limit: 100
        })
        .then(res => {
          this.managers = res.docs;
        });
    },
    createJob() {
      this.model.companyId = this.model.company?._id;
      this.model.managerId = this.model.manager?._id;
      if (!this.model.endDate) {
        delete this.model.endDate;
      }
      if (!this.model.image) {
        delete this.model.image;
      }

      jobsApi
        .create(this.model)
        .then(res => {
          this.model = res;
          this.model.companyId = res.company[0]._id;
          this.model.company = res.company[0];
          this.model.managerId = res.manager[0]._id;
          this.model.manager = res.manager[0];

          this.$refs["modal-success"].show();
        })
        .catch(err => {
          let read = errorReader(err);
          this.error = read.param + " is " + read.msg.toLowerCase();

          this.$refs["modal-alert"].show();
        });
    },
    onFileChange(e) {
      // let files = e.target.files || e.dataTransfer.files;
      // if (!files.length) {
      //   return;
      // }
      //
      // if (window.File && window.FileList && window.FileReader) {
      //   if (files.length !== 1) return;
      //   let file = files[0];
      //
      //   this.imageData = {
      //     file: file,
      //     name: file.name,
      //     size: file.size.toString()
      //   };
      //
      //   this.upload();
      // } else {
      //   console.error("Your browser does not support File API");
      // }
    },
    upload() {
      // const data = new FormData();
      // data.append("file", this.imageData.file);
      //
      // this.$store.dispatch("updateLoading", true);
      //
      // jobsApi.upload(this.companyId, this.jobId, data).then(response => {
      //   this.imageData.path = response.path;
      //
      //   jobsApi
      //     .addAttachment(
      //       Object.assign(
      //         {
      //           companyId: this.companyId,
      //           _id: this.jobId
      //         },
      //         this.imageData
      //       )
      //     )
      //     .then(res => {
      //       this.$store.dispatch("updateLoading", false);
      //
      //       this.attachments = res.attachments;
      //     });
      // });
    }
  }
};
</script>
