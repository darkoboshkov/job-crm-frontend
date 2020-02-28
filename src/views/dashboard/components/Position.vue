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
        <li>
          <div class="d-flex align-items-center">
            <img
              src="@/assets/image/kuidvat.png"
              style="max-width: 45px; margin-right: 15px;"
            />
            <div class="flex-1">
              <div>
                Parttime Magazijnmedewerker
              </div>
              <small>
                Kruidvat
              </small>
            </div>
            <i class="hiway-crm-icon icon-angle-right" />
          </div>
        </li>
        <li>
          <div class="d-flex align-items-center">
            <img
              src="@/assets/image/kuidvat.png"
              style="max-width: 45px; margin-right: 15px;"
            />
            <div class="flex-1">
              <div>
                Fulltime Servicemedewerker
              </div>
              <small>
                Tele2 marketing
              </small>
            </div>
            <i class="hiway-crm-icon icon-angle-right" />
          </div>
        </li>
        <li>
          <div class="d-flex align-items-center">
            <img
              src="@/assets/image/kuidvat.png"
              style="max-width: 45px; margin-right: 15px;"
            />
            <div class="flex-1">
              <div>
                Parttime Magazijnmedewerker
              </div>
              <small>
                ING
              </small>
            </div>
            <i class="hiway-crm-icon icon-angle-right" />
          </div>
        </li>
        <template v-if="!collapsed">
          <li>
            <div class="d-flex align-items-center">
              <img
                src="@/assets/image/kuidvat.png"
                style="max-width: 45px; margin-right: 15px;"
              />
              <div class="flex-1">
                <div>
                  Parttime Magazijnmedewerker
                </div>
                <small>
                  Kruidvat
                </small>
              </div>
              <i class="hiway-crm-icon icon-angle-right" />
            </div>
          </li>
          <li>
            <div class="d-flex align-items-center">
              <img
                src="@/assets/image/kuidvat.png"
                style="max-width: 45px; margin-right: 15px;"
              />
              <div class="flex-1">
                <div>
                  Fulltime Servicemedewerker
                </div>
                <small>
                  Tele2 marketing
                </small>
              </div>
              <i class="hiway-crm-icon icon-angle-right" />
            </div>
          </li>
        </template>
      </ul>
      <div class="mt-3" v-if="collapsed">
        <a @click="viewAll">
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
  name: "position",
  data() {
    return {
      collapsed: true,
      rows: []
    };
  },
  computed: {
    companyId() {
      return this.$store.state.user.companyId;
    },
    role() {
      return this.$store.state.user.role;
    }
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
          this.rows = res.docs.map(row => {
            row.company = row.company[0];
            row.position = row.position[0];
            return row;
          });
        });
    },
    hidePositionCard: function() {
      this.$emit("hide-position-card");
    },
    viewAll() {
      this.collapsed = false;
    }
  }
};
</script>
