<template>
  <b-card id="statistics">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("MALE_STATISTICS") }}</h2>
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hideStatisticsCard"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </template>
    <div>
      <div class="d-flex responsive">
        <trend
          :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
          :gradient="['#c9002a', '#ff4b1f', '#ff9068']"
          auto-draw
          smooth
        >
        </trend>
        <div class="border-left">
          <div class="d-flex responsive text-center border-bottom py-4">
            <div class="flex-1 px-5">
              <p>
                {{ $t("WAGE_LEVEL") }}
              </p>
              <h4>
                +29.7%
              </h4>
            </div>
            <div class="flex-1 px-5 border-left">
              <p>
                {{ $t("WAGE_LEVEL") }}
              </p>
              <h4>
                -54.7%
              </h4>
            </div>
          </div>
          <div class="d-flex responsive text-center py-4">
            <div class="flex-1 px-5">
              <p>
                {{ $t("PERFORMANCE") }}
              </p>
              <h4></h4>
            </div>
            <div class="flex-1 px-5">
              <p>
                {{ $t("EXPORT") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import Trend from "vuetrend";

export default {
  name: "statistics",
  methods: {
    hideStatisticsCard: function() {
      this.$emit("hide-statistics-card");
    }
  },
  components: {
    Trend
  }
};
</script>

<style>
button.close {
  font-size: 1rem;
  font-weight: 100;
  line-height: 0.6;
  padding: 5px !important;
  background-color: #a8a8a8;
  border-radius: 50% !important;
  opacity: 0.22;
}
</style>
