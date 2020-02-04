<template>
  <b-card id="open_positions" body-class="pt-0">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("OPEN_POSITIONS") }}</h2>
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
            <i class="icon-angle-right" />
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
            <i class="icon-angle-right" />
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
            <i class="icon-angle-right" />
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
              <i class="icon-angle-right" />
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
              <i class="icon-angle-right" />
            </div>
          </li>
        </template>
      </ul>
      <div class="mt-3" v-if="collapsed">
        <a @click="viewAll">
          <i class="icon-angle-right mr-2" />
          {{ $t("VIEW_ALL") }}
        </a>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "position",
  data() {
    return {
      collapsed: true
    };
  },
  methods: {
    hidePositionCard: function() {
      this.$emit("hide-position-card");
    },
    viewAll() {
      this.collapsed = false;
    }
  }
};
</script>
