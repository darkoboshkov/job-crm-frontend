<template>
  <div id="page_job_offer_details" class="dashboard-content">
    <a
      href="javascript:void(0)"
      class="back mb-3"
      @click.prevent="$router.go(-1)"
    >
      <i class="hiway-crm-icon icon-angle-left mr-2" />
      <span>{{ $t("common.back") }}</span>
    </a>
    <h1 class="title">
      {{ $t("page_offer_detail.title") }}
    </h1>
    <div class="mt-5 row">
      <div class="matching-list col-6">
        <div class="card matching-item">
          <div class="up d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <img
                src="@/assets/image/avatar_nick.png"
                class="rounded-circle border mr-2"
                style="width:65px"
              />
              <div>
                <div>
                  <strong>{{ job.title }}</strong>
                </div>
                <div>{{ company.name }}</div>
              </div>
            </div>
            <div class="icon-group">
              <div class="icon">
                <img src="@/assets/image/phone.svg" />
              </div>
              <div class="icon">
                <img src="@/assets/image/message.svg" />
              </div>
            </div>
          </div>
          <div class="down">
            <ul>
              <li>Detail 1</li>
              <li>Detail 2</li>
              <li>Detail 3</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-1 d-flex justify-content-center">
        <img src="@/assets/image/matching.svg" />
      </div>

      <div class="matching-list col-5">
        <div class="card matching-item">
          <div class="up d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <img
                src="@/assets/image/avatar_nick.png"
                class="rounded-circle border mr-2"
                style="width:65px"
              />
              <div>
                <div>
                  <strong>{{ worker.firstName }} {{ worker.lastName }}</strong>
                </div>
                <div>{{ worker.location }}</div>
              </div>
            </div>
            <div class="icon-group">
              <div class="icon">
                <img src="@/assets/image/phone.svg" />
              </div>
              <div class="icon">
                <img src="@/assets/image/message.svg" />
              </div>
            </div>
          </div>
          <div class="down">
            <ul>
              <li>Detail 1</li>
              <li>Detail 2</li>
              <li>Detail 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header d-flex justify-content-between">
        <span>{{ $t("page_offer_detail.status_actions") }}</span>
        <span class="d-flex align-items-center contract-status">
          <i
            class="hiway-crm-icon icon-dot color-yellow mr-2"
            style="font-size: 0.1em;"
          ></i>
          {{ $t("page_offer_detail.offer_states." + model.status) }}
        </span>
      </div>
      <div class="card-body d-flex justify-content-between">
        <div>
          <div class="mb-3">
            <img
              src="@/assets/image/avatar_nick.png"
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            <i
              class="hiway-crm-icon icon-dot color-yellow mr-2"
              style="font-size: 0.1em;"
            ></i>
            {{ managerState }}
          </div>
          <div>
            <img
              src="@/assets/image/avatar_nick.png"
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            <i
              class="hiway-crm-icon icon-dot color-blue mr-2"
              style="font-size: 0.1em;"
            ></i>
            {{ workerState }}
          </div>
        </div>
        <div>
          <button
            v-if="!edit"
            class="btn btn-red mr-2"
            @click="adjust"
            style="min-width:160px;"
          >
            Adjust
          </button>

          <button
            v-if="edit"
            class="btn btn-blue ml-2"
            @click="lockSignSend"
            style="min-width:160px;"
          >
            Lock, Sign and Send
          </button>

          <button
            class="btn btn-secondary ml-2"
            @click="exportContract"
            style="min-width:160px;"
          >
            Export Contract
          </button>

          <button
            class="btn btn-secondary ml-2"
            @click="openViewOffer = !openViewOffer"
            style="min-width:160px;"
          >
            View Contract
          </button>
        </div>
      </div>
    </div>

    <div class="card mt-4 contract-specifications">
      <div class="card-header">
        Specifications
      </div>
      <div class="card-body">
        <div class="item">
          <div>CAO</div>
          <div v-if="edit">
            <select v-model="model.collectiveAgreement">
              <option
                v-for="caoOption in caoOptions"
                :value="caoOption._id"
                :key="caoOption._id"
                >{{ caoOption.name }}</option
              >
            </select>
          </div>
          <div v-else>{{ selectedCaoOption.name }}</div>
        </div>
        <div class="item">
          <div>Position</div>
          <div v-if="edit">
            <input value="position of who?" />
          </div>
          <div v-else>
            position of who?
          </div>
        </div>
        <div class="item">
          <div>Status</div>
          <div v-if="edit">
            <input value="status of what?" />
          </div>
          <div v-else>
            status of what?
          </div>
        </div>
        <div class="item">
          <div>Level</div>
          <div>CAO voor Senior Managers</div>
        </div>
        <div class="item">
          <div>Hourly Wage</div>
          <div v-if="edit">
            <input v-model="model.hourlyWage" />
          </div>
          <div v-else>
            {{ model.hourlyWage }}
          </div>
        </div>
        <div class="item">
          <div>Pay Rate</div>
          <div v-if="edit">
            <input v-model="model.payRate" />
          </div>
          <div v-else>
            {{ model.payRate }}
          </div>
        </div>
        <div class="item">
          <div>Travel Expenses</div>
          <div v-if="edit">
            <input v-model="model.travelExpenses" />
          </div>
          <div v-else>
            {{ model.travelExpenses }}
          </div>
        </div>
        <div class="item">
          <div>Travel Hours</div>
          <div v-if="edit">
            <input v-model="model.travelHours" />
          </div>
          <div v-else>
            {{ model.travelHours }}
          </div>
        </div>
        <div class="item">
          <div>Other Expenses</div>
          <div v-if="edit">
            <input v-model="model.otherExpenses" />
          </div>
          <div v-else>
            {{ model.otherExpenses }}
          </div>
        </div>
        <div class="item">
          <div>Contract Signed{{ contractSigned.signDate }}</div>
          <div v-if="edit">
            <textarea v-model="contractSigned.autograph" />
          </div>
          <div v-else>
            {{ contractSigned.autograph }}
          </div>
        </div>
        <div class="item">
          <div>Online / Offline</div>
        </div>
        <div class="item">
          <div>Location</div>
        </div>
      </div>
    </div>

    <div class="card mt-4 contract-files">
      <div class="card-header">
        <span>Files</span>
        <button
          class="btn btn-blue ml-2"
          @click="upload"
          style="min-width:160px;"
        >
          Upload
          <i class="hiway-crm-icon icon-upload"></i>
        </button>
      </div>
      <div class="card-body">
        <div class="item">
          <div>
            <img
              src="@/assets/image/avatar_nick.png"
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            Kruidvat General Practice Document.pdf
          </div>
          <div>
            <span class="mr-5">Geupload op 23 juli 2019 om 15:09</span>
            <span class="mr-5">2.3m</span>
            <span class="mr-4"
              ><i class="hiway-crm-icon icon-more-vertical"></i
            ></span>
            <span><i class="hiway-crm-icon icon-bin"></i></span>
          </div>
        </div>
        <div class="item">
          <div>
            <img
              src="@/assets/image/avatar_nick.png"
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            Kruidvat Benefits Policy.docx
          </div>
          <div>
            <span class="mr-5">Geupload op 23 juli 2019 om 15:09</span>
            <span class="mr-5">2.3m</span>
            <span class="mr-4"
              ><i class="hiway-crm-icon icon-more-vertical"></i
            ></span>
            <span><i class="hiway-crm-icon icon-bin"></i></span>
          </div>
        </div>
        <div class="item">
          <div>
            <img
              src="@/assets/image/avatar_nick.png"
              class="rounded-circle border mr-4"
              style="width:45px"
            />
            Motivation Letter.docx
          </div>
          <div>
            <span class="mr-5">Geupload op 23 juli 2019 om 15:09</span>
            <span class="mr-5">2.3m</span>
            <span class="mr-4"
              ><i class="hiway-crm-icon icon-more-vertical"></i
            ></span>
            <span><i class="hiway-crm-icon icon-bin"></i></span>
          </div>
        </div>
      </div>
    </div>
    <view-offer
      :open="openViewOffer"
      :offer="model"
      :company="company"
      :manager="manager"
      :worker="worker"
    ></view-offer>
  </div>
</template>

<script>
import jobsApi from "@/services/api/jobs";
import usersApi from "@/services/api/users";
import companyApi from "@/services/api/companies";
import jobOfferApi from "@/services/api/joboffers";
import ViewJobOffer from "./ViewJobOffer";

export default {
  name: "Details",
  components: {
    "view-offer": ViewJobOffer
  },
  computed: {
    edit() {
      return this.model.status === "open";
    },
    selectedCaoOption() {
      return this.caoOptions.find(
        option => option._id === this.model.collectiveAgreement
      );
    },
    managerState() {
      let managerState = "";

      switch (this.model.status) {
        case "open":
          managerState = "pending";
          break;
        case "pending-worker":
          managerState = "signed";
          break;
        case "active":
          managerState = "signed";
          break;
        case "completed":
          managerState = "completed";
          break;
      }

      return managerState;
    },
    workerState() {
      let workerState = "";
      switch (this.model.status) {
        case "open":
          workerState = "not able to see";
          break;
        case "pending-worker":
          workerState = "pending";
          break;
        case "active":
          workerState = "signed";
          break;
        case "completed":
          workerState = "completed";
          break;
      }

      return workerState;
    }
  },
  data() {
    return {
      // companyId: this.$route.params.companyId,
      companyId: "5aa1c2c35ef7a4e97b5e995e",
      // offerId: this.$route.params.offerId,
      offerId: "5df9f6e42b8d59733a96d5af",

      model: {
        name: "name",
        companyId: "companyId",
        jobId: "jobId",
        managerId: "managerId",
        workerId: "workerId",
        collectiveAgreement: "collectiveAgreement",
        status: "open",
        paymentAmount: "paymentAmount",
        hourlyWage: "hourlyWage",
        payRate: "payRate",
        travelExpenses: "travelExpenses",
        travelHours: "travelHours",
        otherExpenses: "otherExpenses",
        substantiationForWage: "substantiationForWage",
        paymentType: "paymentType",
        startDate: "startDate",
        endDate: "endDate",
        completionDate: "completionDate"
      },
      contractSigned: {},
      company: {
        name: "Kruidvat"
      },
      job: {
        title: "Senior Operations Manager"
      },
      manager: {},
      worker: {
        firstName: "John",
        lastName: "Simons",
        location: "Amsterdam"
      },

      /*      {
        name: {
          type: String,
            required: true
        },
        companyId: {
          type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true
        },
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: true
        },
        managerId: {
          type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        workerId: {
          type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        collectiveAgreement: {
          type: mongoose.Schema.Types.ObjectId,
            ref: 'CollectiveAgreement'
        },
        status: {
          type: String,
        enum: offerStates,
        default: offerStates[0],
            required: true
        },
        paymentAmount: [
          {
            type: Number,
            required: true,
            min: 1,
            max: 9999999
          }
        ],
          hourlyWage: {
        type: Number
      },
        payRate: {
          type: Number
        },
        travelExpenses: {
          type: Number
        },
        travelHours: {
          type: Number
        },
        otherExpenses: {
          type: Number
        },
        substantiationForWage: {
          type: String,
            min: 1,
            max: 10000
        },
        paymentType: [
          {
            type: String,
            enum: paymentType,
            default: paymentType[0],
            required: true
          }
        ],
          contractSigned: [
        {
          userID: {
            type: mongoose.Schema.Types.ObjectId
          },
          role: {
            type: String,
            enum: roles,
            default: roles[0]
          },
          signDate: {
            type: Date,
            default: Date.now
          },
          autograph: {
            type: String
          }
        }
      ],
        startDate: {
        type: Date,
      default: Date.now,
          select: false,
          required: true
      },
        endDate: {
          type: Date,
        default: Date.now,
            select: false
        },
        completionDate: {
          type: Date,
            select: false
        }
      },*/
      openViewOffer: false,
      caoOptions: [
        {
          _id: "5e4eab5aa308b5e9503fb5e1",
          name: "CAO 1 Test",
          documentFilePath: "Test.docx"
        },
        {
          _id: "5e4eab5efa19b59622bba86c",
          name: "CAO 2 Test",
          documentFilePath: "Tes2t.docx"
        }
      ]
    };
  },
  mounted() {
    this.getOfferDetails();
  },
  methods: {
    lockSignSend() {
      return jobOfferApi
        .update(
          Object.assign(this.model, {
            status: "pending-worker"
          })
        )
        .then(res => {
          console.log("res", res);
          this.model = Object.assign({}, this.model, {
            status: "pending-worker"
          });
        });
    },
    adjust() {
      return jobOfferApi
        .update(
          Object.assign(this.model, {
            status: "open"
          })
        )
        .then(res => {
          console.log("res", res);
          this.model = Object.assign({}, this.model, {
            status: "open"
          });
        });
    },
    update() {
      return jobOfferApi.update(this.model).then(res => {
        console.log("res", res);
        this.model = res;
        this.company = res.company[0];
        this.job = res.job[0];
        this.worker = res.worker[0];
        this.company = res.company[0];
        this.manager = res.manager[0];
      });
    },
    exportContract() {},
    upload() {},
    getOfferDetails() {
      const { companyId, offerId } = this;

      return jobOfferApi.get({ companyId, offerId }).then(res => {
        console.log("res", res);
        this.model = res;
        // this.model.status = 'open';
        this.company = res.company[0];
        this.job = res.job[0];
        this.worker = res.worker[0];
        this.company = res.company[0];
        this.manager = res.manager[0];
        this.contractSigned = res.contractSigned[0];
      });
    },
    lockOffer() {
      const { companyId, offerId } = this;

      return jobOfferApi.lock({ companyId, offerId }).then(res => {
        console.log("res", res);
        this.model = res;
        this.company = res.company[0];
        this.job = res.job[0];
        this.worker = res.worker[0];
        this.company = res.company[0];
        this.manager = res.manager[0];
      });
    }
  }
};
</script>

<style scoped></style>
