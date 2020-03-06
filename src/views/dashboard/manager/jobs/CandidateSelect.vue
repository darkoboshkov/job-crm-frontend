<template>
  <div id="page_jobs_select_candidate" class="dashboard-content">
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
      <h1 class="title text-center">
        {{ $t("page_jobs_select_candidate.title") }}
      </h1>
      <p class="description text-center mt-5">
        {{ $t("page_jobs_select_candidate.description") }}
      </p>
      <div class="search-form mt-5">
        <b-form-input
          type="text"
          required
          class="custom-input search-candidate"
          :placeholder="$t('page_jobs_select_candidate.form.search')"
          v-model="search"
          @keyup="searchCandidate"
        />
        <ul class="search-result" v-if="users.length">
          <li
            v-for="user of users"
            :key="user._id"
            @click="selectCandidate(user)"
          >
            <div class="d-flex align-items-center">
              <div class="avatar-image mr-2">
                <img v-if="user.image" :src="APP_URL + user.image" />
              </div>
              <div>
                <strong>
                  {{ user.firstName }}
                  {{ user.middleName ? ` ${user.middleName}` : "" }}
                  {{ user.lastName }}
                </strong>
                <p>{{ user.city }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <button
          class="btn btn-red large mr-2"
          style="min-width:260px;"
          @click="sendOffer"
        >
          {{ $t("page_jobs_select_candidate.button.select") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "@/services/api/users";
import jobOfferApi from "@/services/api/joboffers";
import { APP_URL } from "@/constants";

export default {
  name: "CandidateSelect",
  data() {
    return {
      APP_URL,
      search: "",
      users: [],
      jobId: null,
      selectedUserId: null,
      offers: []
    };
  },
  computed: {
    companyId() {
      return this.$store.state.user.companyId;
    }
  },

  mounted() {
    this.jobId = this.$route.params.jobId;
    this.fetchJobOffers();
  },
  methods: {
    fetchJobOffers() {
      jobOfferApi
        .getAllByJobId({
          companyId: this.companyId,
          jobId: this.jobId,
          limit: 10000
        })
        .then(res => {
          this.offers = res.docs;
        });
    },
    /* eslint-disable-next-line */
    searchCandidate: _.debounce(function () {
      if (!this.search) {
        this.users = [];
        return;
      }
      userApi
        .getCompanyWorkers({
          companyId: this.companyId,
          filter: {
            firstName: this.search,
            lastName: this.search,
            middleName: this.search
          },
          limit: 10000
        })
        .then(result => {
          let workers = result.docs;
          workers = workers.filter(worker => {
            return (
              this.offers.findIndex(offer => offer.workerId === worker._id) ===
              -1
            );
          });
          this.users = workers.map(item => {
            return {
              firstName: item.firstName,
              lastName: item.lastName,
              middleName: item.middleName,
              id: item._id,
              city: item.city,
              image: item.image
            };
          });
        });
    }, 500),
    selectCandidate(user) {
      this.search = `${user.firstName}${
        user.middleName ? " " + user.middleName : ""
      } ${user.lastName}`;
      this.selectedUserId = user.id;
      this.users = [];
    },
    sendOffer() {
      jobOfferApi
        .create({
          companyId: this.companyId,
          workerId: this.selectedUserId,
          jobId: this.jobId
        })
        .then(res => {
          this.$router.push({
            name: "manager-offer-details",
            params: {
              offerId: res._id
            }
          });
        });
    }
  }
};
</script>

<style scoped></style>
