<template>
  <b-card id="open_positions" body-class="pt-0">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("component.position.title") }}</h2>
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hidePositionCard"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </template>
    <div>
      <ul class="custom-list">
        <li
          v-for="(row, index) in rows"
          :key="index"
          @click="
            $router.push({
              name: 'admin-jobs-detail',
              params: {
                companyId: row.company._id,
                jobId: row._id
              }
            })
          "
        >
          <div class="d-flex align-items-center">
            <img
              v-if="row.image"
              :src="row.image"
              style="max-width: 45px; margin-right: 15px;"
            />
            <div v-else class="avatar-placeholder mr-2"></div>
            <div class="flex-1">
              <div>
                {{ row.title }}
              </div>
              <small>
                {{ row.company ? row.company.name : "" }}
              </small>
            </div>
            <i class="hiway-crm-icon icon-angle-right" />
          </div>
        </li>
      </ul>
      <div class="mt-3">
        <a href="#" @click.prevent="$router.push({ name: 'admin-jobs' })">
          <i class="hiway-crm-icon icon-angle-right mr-2" />
          {{ $t("component.position.view_all") }}
        </a>
      </div>
    </div>
  </b-card>
</template>

<script>
import jobsApi from "@/services/api/jobs";

export default {
  name: "positions",
  data() {
    return {
      rows: []
    };
  },
  mounted() {
    this.getActiveJobs();
  },
  methods: {
    getActiveJobs() {
      return jobsApi
        .getAll(
          Object.assign({
            filter: {
              status: "active"
            },
            limit: 3,
            page: 1
          })
        )
        .then(res => {
          this.rows = res.docs;
          this.rows.forEach(row => {
            row.company = row.company[0];
            row.position = row.position[0];
          });
        });
    },
    hidePositionCard: function() {
      this.$emit("hide-position-card");
    }
  }
};
</script>
