<template>
  <div id="page_matching" class="dashboard-content">
    <h1 class="title">
      {{ $t("page_matching.title") }}
    </h1>
    <div class="mt-5">
      <div class="matching-list">
        <div class="matching-item">
          <img
            src="@/assets/image/company-flooop-logo.png"
            class="rounded-circle border mr-5"
            style="width:65px;"
          />
          <div>{{ job.title }}</div>
          <div>{{ job.company ? job.company[0].name : " " }}</div>
          <div>12-24 uur</div>
          <div>Regio Amsterdam</div>
          <div class="icon-group"></div>
        </div>
      </div>
    </div>
    <matching-filter
      class="candidate-filters"
      style="margin-top: 24px;"
      @match-filter="startMatch"
      title="Filter Options"
      :options="filterOptions"
    />

    <div v-if="matchedWorkers.length" class="mt-5">
      <div class="matching-list">
        <div class="matching-item header">
          {{
            $t("page_matching.match_result", {
              candidates: matchedWorkers.length
            })
          }}
          “{{ job.title }}”
        </div>
        <div
          class="matching-item"
          v-for="(item, index) in matchedWorkers"
          :key="index"
        >
          <img
            src="@/assets/image/avatar_nick.png"
            class="rounded-circle border mr-2"
            style="width:65px"
          />
          <div>{{ item.fullName }}</div>
          <div>{{ item.profession }}</div>
          <div>{{ item.birthday }}</div>
          <div>{{ item.age }} {{ $t("common.years") }}</div>
          <div>{{ item.status }}</div>
          <div>{{ item.location }}</div>
          <div>
            <a
              class="underline red"
              href="javascript:void(0);"
              @click.prevent="goToMatchDetails(item)"
              >{{ $t("page_matching.match_detail") }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatchingFilter from "@/components/common/MatchingFilter";
import jobsApi from "@/services/api/jobs";

const dummyItems = [
  {
    _id: "123456567",
    fullName: "Magalie Lindeboom",
    profession: "Visual Designer",
    birthday: "12-06-2018",
    age: 28,
    status: "Not Available",
    location: "Arnhem"
  },
  {
    _id: "123456567",
    fullName: "Magalie Lindeboom",
    profession: "Visual Designer",
    birthday: "12-06-2018",
    age: 28,
    status: "Not Available",
    location: "Arnhem"
  },
  {
    _id: "123456567",
    fullName: "Magalie Lindeboom",
    profession: "Visual Designer",
    birthday: "12-06-2018",
    age: 28,
    status: "Not Available",
    location: "Arnhem"
  },
  {
    _id: "123456567",
    fullName: "Magalie Lindeboom",
    profession: "Visual Designer",
    birthday: "12-06-2018",
    age: 28,
    status: "Not Available",
    location: "Arnhem"
  },
  {
    _id: "123456567",
    fullName: "Magalie Lindeboom",
    profession: "Visual Designer",
    birthday: "12-06-2018",
    age: 28,
    status: "Not Available",
    location: "Arnhem"
  }
];

export default {
  name: "Matches",
  components: { MatchingFilter },
  data() {
    return {
      showTable: false, // temporary variable for MVP
      filterOptions: [
        {
          title: "Woon - werk afstand",
          type: "slider",
          value: "15",
          unit: "km"
        },
        {
          title: "Ervaring",
          type: "slider",
          value: "3",
          unit: "jaar"
        },
        {
          title: "Opleidingsniveau",
          type: "slider",
          value: "",
          unit: "n.v.t"
        },
        {
          title: "Leeftijd",
          type: "slider",
          value: "18",
          unit: "jaar"
        }
      ],
      jobId: null,
      companyId: null,
      job: {},
      matchedWorkers: []
    };
  },
  computed: {
    role() {
      return this.$store.state.user.role;
    }
  },
  mounted() {
    this.companyId = this.$route.params.companyId;
    this.jobId = this.$route.params.jobId;
    this.getJob();
  },
  methods: {
    startMatch() {
      this.matchedWorkers = dummyItems;
    },
    getJob() {
      jobsApi
        .get({
          companyId: this.companyId,
          id: this.jobId
        })
        .then(res => {
          this.job = res;
        });
    },
    goToMatchDetails(item) {
      if (item && item._id) {
        this.$router.push(
          `/${this.role}/dashboard/jobs/${this.companyId}/${this.jobId}/${item._id}/matching-details`
        );
      }
    }
  }
};
</script>
