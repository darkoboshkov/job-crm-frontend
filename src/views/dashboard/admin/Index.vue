<template>
  <div id="page_dashboard" class="dashboard-content">
    <div class="container-fluid">
      <b-row>
        <b-col>
          <div class="d-flex responsive justify-content-between content-header">
            <h1 class="title text-center">{{ $t("page_dashboard.title") }}</h1>
            <b-button v-b-modal.adjust_dashboard>{{
              $t("page_dashboard.button.adjust")
            }}</b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" v-if="positionItem">
          <Positions v-on:hide-position-card="hidePositionCard" />
        </b-col>
        <b-col md="4" v-if="usersItem">
          <Users v-on:hide-users-card="hideUsersCard" />
        </b-col>
        <b-col md="4" v-if="companiesItem">
          <Companies v-on:hide-companies-card="hideCompaniesCard" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" v-if="pendingWorkersItem">
          <PendingWorkers
            v-on:hide-pending-workers-card="hidePendingWorkersCard"
          />
        </b-col>
      </b-row>
    </div>
    <b-modal id="adjust_dashboard" footer-class="d-none" centered>
      <template v-slot:modal-header="{ close }">
        <h2>
          {{ $t("page_dashboard.modal.adjust.title") }}
        </h2>
        <b-button @click="close">{{ $t("common.save") }}</b-button>
      </template>
      <div>
        <ul class="custom-list">
          <li class="d-flex responsive">
            <div>
              <p>{{ $t("page_dashboard.modal.adjust.position_area_title") }}</p>
              <small>{{
                $t("page_dashboard.modal.adjust.position_area_text")
              }}</small>
            </div>
            <b-form-checkbox
              class="rtl"
              size="lg"
              v-model="positionItem"
              name="check-button"
              switch
            >
            </b-form-checkbox>
          </li>
          <li class="d-flex responsive">
            <div>
              <p>{{ $t("page_dashboard.modal.adjust.users_area_title") }}</p>
              <small>{{
                $t("page_dashboard.modal.adjust.users_area_text")
              }}</small>
            </div>
            <b-form-checkbox
              class="rtl"
              size="lg"
              v-model="usersItem"
              name="check-button"
              switch
            >
            </b-form-checkbox>
          </li>
          <li class="d-flex responsive">
            <div>
              <p>
                {{ $t("page_dashboard.modal.adjust.companies_area_title") }}
              </p>
              <small>{{
                $t("page_dashboard.modal.adjust.companies_area_text")
              }}</small>
            </div>
            <b-form-checkbox
              class="rtl"
              size="lg"
              v-model="companiesItem"
              name="check-button"
              switch
            >
            </b-form-checkbox>
          </li>
          <li class="d-flex responsive">
            <div>
              <p>
                {{
                  $t("page_dashboard.modal.adjust.pending_workers_area_title")
                }}
              </p>
              <small>{{
                $t("page_dashboard.modal.adjust.pending_workers_area_text")
              }}</small>
            </div>
            <b-form-checkbox
              class="rtl"
              size="lg"
              v-model="pendingWorkersItem"
              name="check-button"
              switch
            >
            </b-form-checkbox>
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Positions from "./components/Positions.vue";
import Users from "./components/Users.vue";
import Companies from "./components/Companies.vue";
import PendingWorkers from "./components/PendingWorkers";

export default {
  name: "dashboard",
  components: {
    PendingWorkers,
    Positions,
    Users,
    Companies
  },
  data() {
    return {
      positionItem: true,
      usersItem: true,
      companiesItem: true,
      pendingWorkersItem: true
    };
  },
  methods: {
    hidePositionCard() {
      this.positionItem = false;
    },
    hideUsersCard() {
      this.usersItem = false;
    },
    hideCompaniesCard() {
      this.companiesItem = false;
    },
    hidePendingWorkersCard() {
      this.pendingWorkersItem = false;
    }
  }
};
</script>
