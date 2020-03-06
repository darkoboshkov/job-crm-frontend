<template>
  <div id="page_timesheets" class="dashboard-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 d-flex">
          <b-card
            title="Worked Hours this month"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <i class="card-icon hiway-crm-icon icon-watch"></i>
              <span class="card-value">156</span>
            </b-card-text>
          </b-card>
        </div>
        <div class="col-md-3 d-flex">
          <b-card
            title="Approved Hours this month"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <i class="card-icon hiway-crm-icon icon-list"></i>
              <span class="card-value">123</span>
            </b-card-text>
          </b-card>
        </div>
        <div class="col-md-3 d-flex">
          <b-card
            title="Hours to be approved"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <i class="card-icon hiway-crm-icon icon-hourglass"></i>
              <span class="card-value">33</span>
            </b-card-text>
          </b-card>
        </div>
        <div class="col-md-3 d-flex">
          <b-card
            title="Total Expenses this month"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <i class="card-icon hiway-crm-icon icon-euro"></i>
              <span class="card-value">€2350.36</span>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "timesheets",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
