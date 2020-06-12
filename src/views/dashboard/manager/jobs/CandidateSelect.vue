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
      <div class="select-form mt-5">
        <b-form-group class="mt-3">
          <label>{{
            $t("page_jobs_select_candidate.form.hiring_company")
          }}</label>
          <b-form-select v-model="model.hiringCompanyId">
            <option value="" disabled />
            <option
              v-for="(company, index) in companies"
              :value="company._id"
              :key="index"
            >
              {{ company && company.name }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group class="mt-3">
          <label>{{
            $t("page_jobs_select_candidate.form.hiring_manager")
          }}</label>
          <b-form-select v-model="model.hiringManagerId">
            <option value="" disabled />
            <option
              v-for="(manager, index) in filteredManagers"
              :value="manager._id"
              :key="index"
            >
              {{ manager | fullNameFormatter }}
            </option>
          </b-form-select>
        </b-form-group>

        <div class="search-worker">
          <label>{{ $t("page_jobs_select_candidate.form.search") }}</label>
          <b-form-input
            type="text"
            required
            class="custom-input search-candidate"
            v-model="search"
            @keyup="searchCandidate"
          />
          <ul class="search-result" v-if="users.length">
            <li
              v-for="(user, index) of users"
              :key="index"
              @click="selectCandidate(user)"
            >
              <div class="d-flex align-items-center">
                <div class="avatar-image mr-2">
                  <img v-if="user.image" :src="user.image | appUrlFormatter" />
                </div>
                <div>
                  <strong>
                    {{ user | fullNameFormatter }}
                  </strong>
                  <p>{{ user.city }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
import companiesApi from "@/services/api/companies";
import usersApi from "@/services/api/users";
import jobOffersApi from "@/services/api/joboffers";

export default {
  name: "CandidateSelect",
  data() {
    return {
      search: "",
      model: {
        hiringCompanyId: "",
        hiringManagerId: "",
        selectedUserId: null
      },
      users: [],
      jobId: null,
      selectedUserId: null,
      companies: [],
      managers: []
    };
  },
  computed: {
    companyId() {
      return this.$store.state.user.companyId;
    },
    filteredManagers() {
      return this.managers.filter(
        manager => manager.companyId === this.model.hiringCompanyId
      );
    }
  },

  mounted() {
    this.jobId = this.$route.params.jobId;
    this.fetchManagers();
    this.fetchCompanies();
  },
  methods: {
    fetchCompanies() {
      return companiesApi.getAll().then(res => {
        this.companies = res;
      });
    },
    fetchManagers() {
      return usersApi
        .getAll({
          filter: { and: [{ key: "role", value: "manager", opt: "eq" }] },
          pagination: 0
        })
        .then(res => {
          this.managers = res.docs;
        });
    },
    /* eslint-disable-next-line */
    searchCandidate: _.debounce(function () {
      if (!this.search) {
        this.users = [];
        return;
      }
      usersApi
        .getAvailableCompanyWorkers({
          companyId: this.companyId,
          filter: {
            or: [
              { key: "firstName", value: this.search, opt: "in" },
              { key: "lastName", value: this.search, opt: "in" },
              { key: "middleName", value: this.search, opt: "in" }
            ]
          },
          pagination: 0
        })
        .then(res => {
          this.users = res.docs?.map(item => {
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
      this.search = this.getFullName(user);
      this.model.selectedUserId = user.id;
      this.users = [];
    },
    sendOffer() {
      jobOffersApi
        .create({
          companyId: this.companyId,
          jobId: this.jobId,
          workerId: this.model.selectedUserId,
          hiringCompanyId: this.model.hiringCompanyId,
          hiringManagerId: this.model.hiringManagerId
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
