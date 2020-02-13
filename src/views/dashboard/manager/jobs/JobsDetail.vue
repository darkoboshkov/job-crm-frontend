<template>
  <div id="page_job_detail" class="dashboard-content">
    <div class="container-fluid">
      <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
      <b-row class="mt-5">
        <b-col md="12">
          <div class="job-detail-header">
            <div class="job-detail-header__photo">
              <img src="@/assets/image/avatar_nick.png" />
            </div>
            <div class="job-detail-header__description">
              <div>
                <b-input v-if="editJob" v-model="model.title" />
                <h2 v-else class="fullName">{{ model.title }}</h2>
              </div>
              <h3 class="position">{{ userName }}</h3>
            </div>
          </div>
          <div class="job-detail-edit">
            <a href="javascript:void(0);" @click.prevent="onEditJob">
              {{
              editJob
              ? $t("page_job_detail.save")
              : $t("page_job_detail.edit")
              }}
            </a>
            <i class="hiway-crm-icon icon-pencil ml-2" />
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <b-col md="6">
          <b-card class="mt-4">
            <template v-slot:header>
              <h5 class="m-0">{{ $t("page_job_detail.form.description") }}</h5>
            </template>
            <b-textarea v-if="editJob" v-model="model.description" rows="5" />
            <div v-else>
              {{ model.description }}
            </div>
          </b-card>

          <b-card class="mt-3">
            <template v-slot:header>
              <div v-if="editJob" class="d-flex justify-content-between align-items-end">
                <h5 class="m-0">{{ $t("page_job_detail.form.questions") }}</h5>
                <button
                        data-v-74cd9a4e=""
                        class="btn btn-red circle large"
                        style="width: 50px;"
                        @click="model.questions = model.questions.concat([''])"
                >
                  <i data-v-74cd9a4e="" class="hiway-crm-icon icon-add"></i>
                </button>
              </div>
              <h5 class="m-0" v-else>{{ $t("page_job_detail.form.questions") }}</h5>
            </template>
            <ul class="custom-list">
              <li
                      v-for="(question, idx) in model.questions"
                      :key="idx"
                      class="d-flex justify-content-between align-items-center"
              >
                {{ idx + 1
                }}<b-input
                      v-if="editJob"
                      v-model="model.questions[idx]"
                      class="question-input"
              />
                <div v-else>
                  {{ question }}
                </div>
              </li>
            </ul>
          </b-card>
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
                    <span>{{ model.company && model.company.name }}</span>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.manager") }}
                  <div class="pull-right">
                    <span>{{
                      userName
                    }}</span>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.level") }}
                  <div class="pull-right">
                    <b-form-select
                            v-if="editJob"
                            v-model="model.level"
                            class="normal-size"
                            style="margin-top:-8px"
                    >
                      <option
                              v-for="(level, index) in levels"
                              :value="level"
                              :key="index"
                      >
                        {{ level }}
                      </option>
                    </b-form-select>
                    <div v-else>
                      {{ model.level }}
                    </div>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.rate") }}
                  <div class="pull-right">
                    <b-input v-if="editJob" v-model="model.rate" />
                    <div v-else>
                      {{ model.rate }}
                    </div>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.start_date") }}
                  <div class="pull-right">
                    <b-input
                            type="datetime-local"
                            v-if="editJob"
                            v-model="model.startDate"
                    />
                    <div v-else>
                      {{ model.startDate }}
                    </div>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.end_date") }}
                  <div class="pull-right">
                    <b-input
                            type="datetime-local"
                            v-if="editJob"
                            v-model="model.endDate"
                    />
                    <div v-else>
                      {{ model.endDate }}
                    </div>
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
                  <span>{{ user.email }}</span>
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
                  <span>{{ user.phone }}</span>
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
              <div class="d-flex">
                <h5 class="m-0 flex-1">
                  {{ $t("page_job_detail.job_offers") }}
                </h5>
                <div>
                  <div class="float-right">
                    <button class="btn btn-blue">
                      {{ $t("page_job_detail.button.create_new_job_offer") }}
                      <i class="hiway-crm-icon icon-pencil ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <ul class="custom-list">
                <li class="d-flex">
                  <div class="flex-3">
                    Offer - John Simons
                  </div>
                  <div class="flex-2">
                    Added on 10th of july 2019 at 15:09
                  </div>
                  <div class="flex-1">
                    Locked & sent
                  </div>
                  <div>
                    <i class="hiway-crm-icon icon-more-vertical mr-2" />
                    <i class="hiway-crm-icon icon-bin" />
                  </div>
                </li>
                <li class="d-flex">
                  <div class="flex-3">
                    Offer - Frank Jameson
                  </div>
                  <div class="flex-2">
                    Added on 10th of july 2019 at 15:09
                  </div>
                  <div class="flex-1">
                    Cancelled
                  </div>
                  <div>
                    <i class="hiway-crm-icon icon-more-vertical mr-2" />
                    <i class="hiway-crm-icon icon-bin" />
                  </div>
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col md="12">
          <b-card>
            <template v-slot:header>
              <div class="d-flex">
                <h5 class="m-0 flex-1">{{ $t("page_job_detail.files") }}</h5>
                <div>
                  <div class="float-right">
                    <button
                            class="btn btn-blue upload"
                            style="width:100px;justify-content:center;"
                    >
                      {{ $t("page_job_detail.button.upload") }}
                      <i class="hiway-crm-icon icon-upload ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <ul class="custom-list">
                <li class="d-flex">
                  <div class="flex-3">
                    Kruidvat General Practice Document.pdf
                  </div>
                  <div class="flex-2">
                    Geupload op 23 juli 2019 om 15:09
                  </div>
                  <div class="flex-1">
                    2,3mb
                  </div>
                  <div>
                    <i class="hiway-crm-icon icon-more-vertical mr-2" />
                    <i class="hiway-crm-icon icon-bin" />
                  </div>
                </li>
                <li class="d-flex">
                  <div class="flex-3">
                    Kruidvat Benefits Policy.docx
                  </div>
                  <div class="flex-2">
                    Geupload op 23 juli 2019 om 15:09
                  </div>
                  <div class="flex-1">
                    2,3mb
                  </div>
                  <div>
                    <i class="hiway-crm-icon icon-more-vertical mr-2" />
                    <i class="hiway-crm-icon icon-bin" />
                  </div>
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>
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
          {{ $t("page_job_detail.modal.update_success.title") }}
        </p>
        <p class="alert-sub-title">
          {{ $t("page_job_detail.modal.update_success.sub_title") }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-success'].hide()">
          {{ $t("page_job_detail.modal.update_success.continue") }}
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
          {{ $t("page_job_detail.modal.update_error.title") }}
        </p>
        <p class="alert-sub-title">
          {{ error }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-alert'].hide()">
          {{ $t("page_job_detail.modal.update_error.continue") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import jobsApi from "@/services/api/jobs";
  import companiesApi from "@/services/api/companies";
  import usersApi from "@/services/api/users";
  import constantsApi from "@/services/api/constants";
  import errorReader from "@/helpers/ErrorReader";

  export default {
    name: "JobsDetail",
    data() {
      return {
        editJob: false,
        model: {
          title: "",
          companyId: 0,
          managerId: 0,
          positionId: 0,
          rate: "",
          level: null,
          status: "",
          skillIds: [],
          description: "",
          questions: [],
          image: null,
          startDate: null,
          endDate: null,

          company: null,
          manager: null,
          position: null
        },

        /*
           title: {
        type: String,
        required: true
      },
           companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
      },
           managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
           positionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        default: '5aa1c2c35ef8a4e97b5e995a'
      },
           rate: {
        type: Number
      },
           level: {
        type: String,
        enum: levels,
        default: levels[0]
      },
           status: {
        type: String,
        enum: jobStates,
        default: jobStates[0]
      },
           skillIds: [
           {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Skill'
           }
           ],
           description: {
        type: String
      },
           questions: [
           {
             type: String
           }
           ],
           image: {
        type: String
      },
      startDate: {
        type: Date,
        default: Date.now,
        select: false
      },
      endDate: {
        type: Date,
        default: Date.now,
        select: false
      }
           */
        companies: [],
        managers: [],
        levels: [],
        state: [],
        error: ''
      };
    },
    mounted() {
      this.jobId = this.$route.params.id;
      this.fetchJobDetails();
      this.getLevels();
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      userName() {
        return (this.$store.state.user.firstName + " " + this.$store.state.user.lastName);
      },
    },
    methods: {
      getLevels() {
        constantsApi.getAll().then(res => {
          this.levels = [null].concat(res.levels);
        });
      },
      fetchJobDetails() {
        jobsApi
          .get({ companyId: this.user.companyId, id: this.$route.params.jobId })
          .then(res => {
            this.model = res;
            this.model.company = res.company[0];
            this.model.manager = res.manager[0];
            this.model.position = res.position[0];
          });
      },
      onEditJob() {
        this.editJob = !this.editJob;
        if (!this.editJob) {
          this.updateJob();
        }
      },
      updateJob() {
        this.model.companyId = this.model.company?._id;
        this.model.managerId = this.model.manager?._id;
        this.model.positionId = this.model.position?._id;
        if (!this.model.endDate) {
          delete this.model.endDate;
        }
        if (!this.model.image) {
          delete this.model.image;
        }
        delete this.model.skillIds; // todo: support later

        jobsApi.update(this.model).then(res => {
          this.$refs["modal-success"].show();
        }).catch(err => {
          let read = errorReader(err);
          this.error = read.param + ' is ' + read.msg.toLowerCase();

          this.$refs["modal-alert"].show();
        });
      }
    }
  };
</script>
