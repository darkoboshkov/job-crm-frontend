<template>
  <div class="table-filter">
    <div v-b-toggle.collapse_table-filter class="table-filter__title">
      <h5>
        <i class="hiway-crm-icon icon-equalizer mr-2" />
        <span class="when-opened">Close</span
        ><span class="when-closed">Open</span> Filters
      </h5>
    </div>
    <b-collapse id="collapse_table-filter" visible>
      <div class="table-filter-options">
        <div
          class="filter-option"
          v-for="(option, index) in filterOptions"
          :key="index"
        >
          <div class="filter-option__items mt-3">
            <div class="item">
              <template v-if="option.type === 'text'">
                <div class="filter-option__title ">
                  {{ option.title }}
                </div>
                <b-form-input :type="option.type" v-model="option.value" />
              </template>

              <template v-if="option.type === 'checkbox'">
                <div class="filter-option__title ">
                  {{ option.title }}
                </div>
                <b-form-checkbox
                  v-for="(item, itemIndex) in option.options"
                  :key="itemIndex"
                  v-model="item.checked"
                >
                  {{ item.label }}
                </b-form-checkbox>
              </template>

              <template v-if="option.type === 'select'">
                <div class="filter-option__title ">
                  {{ option.title }}
                </div>
                <b-form-select
                  v-model="option.value"
                  :options="option.options"
                  class="normal-size"
                />
              </template>

              <template v-if="option.type === 'slider'">
                <slider
                  :label="option.title"
                  :value="option.value"
                  :unit="option.unit"
                ></slider>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <button
          class="btn btn-red large mt-5 d-flex m-auto align-items-center justify-content-around"
          style="width: 200px"
          @click="applyFilter"
        >
          {{ $t("APPLY_FILTERS") }}<i class="hiway-crm-icon icon-search"></i>
        </button>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import Slider from "@/components/common/Slider";

export default {
  name: "MatchingFilter",
  components: {
    Slider
  },
  props: {
    title: {
      type: String
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    filterOptions: {
      get() {
        return this.options;
      }
    }
  },
  methods: {
    applyFilter() {
      this.$emit("match-filter", this.filterOptions);
    }
  }
};
</script>

<style>
.table-filter__title.collapsed .when-opened,
.table-filter__title:not(.collapsed) .when-closed {
  display: none;
}
</style>
<style scoped>
.filter-option {
  flex: 1;
}
.filter-option:last-child {
  border-right: unset;
}
</style>
