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
              <h5 class="m-0">{{ $t("page_job_detail.form.questions") }}</h5>
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
                    <b-form-select
                      v-if="editJob"
                      v-model="model.company"
                      class="normal-size"
                      style="margin-top:-8px"
                    >
                      <option
                        v-for="(company, index) in companies"
                        :value="company"
                        :key="index"
                      >
                        {{ company.name }}
                      </option>
                    </b-form-select>
                    <span v-else>{{ $t(model.company.name) }}</span>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.manager") }}
                  <div class="pull-right">
                    <b-form-select
                      v-if="editJob"
                      v-model="model.managerId"
                      class="normal-size"
                      style="margin-top:-8px"
                    >
                      <option
                        v-for="(manager, index) in managers"
                        :value="manager.id"
                        :key="index"
                      >
                        {{ manager.firstName + " " + manager.lastName }}
                      </option>
                    </b-form-select>
                    <span v-else>{{
                      model.manager.firstName + " " + model.manager.lastName
                    }}</span>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.rate") }}
                  <div class="pull-right">
                    <b-textarea
                      v-if="editJob"
                      v-model="model.description"
                      rows="5"
                    />
                    <div v-else>
                      {{ model.description }}
                    </div>
                  </div>
                </li>

                <li>
                  {{ $t("page_job_detail.form.start_date") }}
                  <div class="pull-right">
                    <b-input
                      type="datetime"
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
                      type="datetime"
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
                  <span>{{ model.manager.email }}</span>
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
                  <span>{{ model.manager.phone }}</span>
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
      ref="modal-alert"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-alert"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/success.svg" />
        <p class="alert-title color-blue">
          {{ $t("page_profile.modal.change.title") }}
        </p>
        <p class="alert-sub-title">
          {{ $t("page_profile.modal.change.sub_title") }}
        </p>
        <button class="btn btn-blue" @click="$refs['modal-alert'].hide()">
          {{ $t("page_profile.modal.change.continue") }}
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import profileApi from "@/services/api/profile";
import jobsApi from "@/services/api/jobs";

export default {
  name: "JobsDetail",
  data() {
    return {
      editJob: false,
      userStates: [
        {
          value: "available",
          label: "Available"
        },
        {
          value: "unavailable",
          label: "Unavailable"
        }
      ],
      model: {
        title: "",
        companyId: 0,
        managerId: 0,
        positionId: 0,
        rate: 0,
        level: "",
        status: "available",
        skillIds: [],
        description: "",
        questions: [],
        image: "",
        startDate: "",
        endDate: "",

        company: {},
        manager: {},
        position: {}
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
      userId: null,
      companyId: null,
      companies: [],
      managers: []
    };
  },
  mounted() {
    this.companyId = this.$route.params.companyId;
    this.jobId = this.$route.params.id;
    this.fetchJobDetails();
  },
  computed: {
    userName() {
      return (
        this.$store.state.user.firstName + " " + this.$store.state.user.lastName
      );
    }
  },
  methods: {
    fetchJobDetails() {
      jobsApi
        .get({ companyId: this.companyId, id: this.$route.params.jobId })
        .then(res => {
          console.log("res", res);
          this.model = res;
          this.model.companyId = res.company[0]._id;
          this.model.company = res.company[0];
          this.model.managerId = res.manager[0]._id;
          this.model.manager = res.manager[0];
          // if (res.position && res.position.length) {
          //   this.model.position = res.position[0].name;
          // }
          // this.model.overview = res.overview ? res.overview : "";
          // this.model.email = res.email;
          // this.model.phone = res.phone;
          // this.model.status = res.status;
          // if (res.birthday) {
          //   const thisYear = new Date().getFullYear();
          //   const birthYear = res.birthday.split("-")[0];
          //   this.model.age = thisYear - birthYear;
          // } else {
          //   this.model.age = "-";
          // }
          // this.model.registeredAt = new Date(res.createdAt).toDateString();
        });
    },
    onEditJob() {
      this.editJob = !this.editJob;
      if (!this.editJob) {
        this.updateProfile();
      }
    },
    updateProfile() {
      const data = {
        id: this.userId,
        companyId: this.companyId,
        status: this.model.status,
        overview: this.model.overview
      };
      profileApi.patchById(data).then(res => {
        this.$refs["modal-alert"].show();
        this.fetchProfile();
      });
    }
  }
};
</script>
