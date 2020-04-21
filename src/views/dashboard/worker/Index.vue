<template>
  <div id="page_dashboard" class="dashboard-content">
    <div class="d-flex responsive justify-content-between align-items-start">
      <h1 class="title text-center">{{ $t("page_dashboard.title") }}</h1>
      <b-button v-b-modal.adjust_dashboard>{{
        $t("page_dashboard.button.adjust")
      }}</b-button>
    </div>
    <b-row>
      <b-col md="6" v-if="positionItem">
        <Positions v-on:hide-position-card="hidePositionCard" />
      </b-col>
    </b-row>
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
            <div class="content">
              <p>{{ $t("page_dashboard.modal.adjust.position_area_title") }}</p>
              <small>
                {{
                  $t("page_dashboard.modal.adjust.position_area_text")
                }}</small
              >
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
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Positions from "./components/Positions.vue";

export default {
  name: "dashboard",
  components: {
    Positions
  },
  data() {
    return {
      positionItem: true,
      usersItem: true
    };
  },
  methods: {
    hidePositionCard: function() {
      this.positionItem = false;
    }
  }
};
</script>
