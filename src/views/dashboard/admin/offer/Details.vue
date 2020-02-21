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

      <div class="col-2 d-flex justify-content-center">
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
            Locked & Send
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
            Received
          </div>
        </div>
        <div>
          <button
            class="btn btn-red mr-2"
            @click="adjust"
            style="min-width:160px;"
          >
            Adjust
          </button>

          <button
            class="btn btn-blue ml-2"
            @click="lockSignSend"
            style="min-width:160px;"
          >
            Lock, Sign and Send
          </button>

          <button
            class="btn btn-secondary ml-2"
            @click="lockSignSend"
            style="min-width:160px;"
          >
            Export Contract
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
          <span>CAO</span><span>CAO voor Senior Managers</span>
        </div>
        <div class="item">
          <span>Position</span><span>Senior Operation Manager</span>
        </div>
        <div class="item">
          <span>Status</span><span>CAO voor Senior Managers</span>
        </div>
        <div class="item">
          <span>Level</span><span>CAO voor Senior Managers</span>
        </div>
        <div class="item">
          <span>Hourly Wage</span><span>CAO voor Senior Managers</span>
        </div>
        <div class="item">
          <span>Pay Rate</span><span>CAO voor Senior Managers</span>
        </div>
        <div class="item">
          <span>Travel Expenses</span><span>CAO voor Senior Managers</span>
        </div>
        <div class="item">
          <span>Travel Hours</span><span>CAO voor Senior Managers</span>
        </div>
        <div class="item">
          <span>Other Expenses</span><span>CAO voor Senior Managers</span>
        </div>
        <div class="item">
          <span>Contract Signed</span
          ><span
            >Hanc ego assentior, cum teneam sententiam, quid et iusto odio
            dignissimos ducimus, qui. Quae fuerit causa, nollem me ab eo est
            consecutus? laudem et dolore suo. Sed ut summum bonum esse albam,
            dulce mel quorum facta quem modo ista. Filium morte multavit si sine
            dubio praeclara sunt, explicabo nemo enim ipsam per. Meer +</span
          >
        </div>
        <div class="item">
          <span>Online / Offline</span>
        </div>
        <div class="item">
          <span>Location</span>
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
  </div>
</template>

<script>
import jobsApi from "@/services/api/jobs";
import usersApi from "@/services/api/users";
import companyApi from "@/services/api/companies";
import jobOfferApi from "@/services/api/joboffers";

export default {
  name: "Details",
  data() {
    return {
      // companyId: this.$route.params.companyId,
      companyId: "5aa1c2c35ef7a4e97b5e995e",
      // offerId: this.$route.params.offerId,
      offerId: "5df9f6e9bd4470a117ac542c",

      model: {
        name: "name",
        companyId: "companyId",
        jobId: "jobId",
        managerId: "managerId",
        workerId: "workerId",
        collectiveAgreement: "collectiveAgreement",
        status: "status",
        paymentAmount: "paymentAmount",
        hourlyWage: "hourlyWage",
        payRate: "payRate",
        travelExpenses: "travelExpenses",
        travelHours: "travelHours",
        otherExpenses: "otherExpenses",
        substantiationForWage: "substantiationForWage",
        paymentType: "paymentType",
        contractSigned: "contractSigned",
        startDate: "startDate",
        endDate: "endDate",
        completionDate: "completionDate"
      },
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
      }

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
    };
  },
  mounted() {
    this.getOfferDetails();
  },
  methods: {
    adjust() {},
    lockSignSend() {},
    getOfferDetails() {
      const { companyId, offerId } = this;

      return jobOfferApi.get({ companyId, offerId }).then(res => {
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
