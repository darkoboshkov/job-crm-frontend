<template>
  <div class="table-filter">
    <div class="table-filter__title d-inline-block" @click="visible = !visible">
      <h5>
        <i class="hiway-crm-icon icon-equalizer mr-2" />
        <span v-if="visible">{{ $t("common.close") }}</span>
        <span v-else>{{ $t("common.open") }}</span>
        {{ $t("common.filters") }}
      </h5>
    </div>
    <b-collapse v-model="visible">
      <div class="table-filter-options flex-wrap">
        <div
          class="filter-option mt-3"
          v-for="(option, index) in filterOptions"
          :key="index"
        >
          <template v-if="option.type === 'group'">
            <div class="filter-option__group">
              <div class="filter-option__group-title">{{ option.title }}</div>
              <div
                class="filter-option__item"
                v-for="(item, itemIndex) in option.items"
                :key="itemIndex"
              >
                <template v-if="item.type === 'text' || item.type === 'number'">
                  <div class="filter-option__item-title">
                    {{ item.title }}
                  </div>
                  <b-form-input
                    :type="item.type"
                    v-model="item.value"
                    :placeholder="item.placeholder || 'Type Here'"
                  />
                </template>
                <template v-else-if="item.type === 'date'">
                  <div class="filter-option__item-title">
                    {{ item.title }}
                  </div>
                  <b-form-datepicker
                    v-model="item.value"
                    :date-format-options="dateStringOptions"
                    :placeholder="item.placeholder || 'Type Here'"
                    hide-header
                    today-button
                    reset-button
                    locale="nl"
                  />
                </template>
              </div>
            </div>
          </template>
          <div
            class="filter-option__item"
            v-else-if="option.type === 'text' || option.type === 'number'"
          >
            <div class="filter-option__item-title">
              {{ option.title }}
            </div>
            <b-form-input
              :type="option.type"
              v-model="option.value"
              :placeholder="option.placeholder || 'Type Here'"
            />
          </div>
          <div class="filter-option__item" v-else-if="option.type === 'date'">
            <div class="filter-option__item-title">
              {{ option.title }}
            </div>
            <b-form-datepicker
              v-model="option.value"
              :date-format-options="dateStringOptions"
              :placeholder="option.placeholder || 'Type Here'"
              hide-header
              today-button
              reset-button
              locale="nl"
            />
          </div>
          <div
            class="filter-option__item"
            v-else-if="option.type === 'checkbox'"
          >
            <div class="filter-option__item-title">
              {{ option.title }}
            </div>
            <b-form-checkbox
              v-for="(item, itemIndex) in option.options"
              :key="itemIndex"
              v-model="item.checked"
            >
              {{ item.label }}
            </b-form-checkbox>
          </div>

          <div class="filter-option__item" v-else-if="option.type === 'radio'">
            <div class="filter-option__item-title">
              {{ option.title }}
            </div>
            <b-form-radio-group class="d-flex flex-column">
              <b-form-radio
                v-for="(item, itemIndex) in option.options"
                :key="itemIndex"
                v-model="option.value"
                :value="item.value"
                class="d-inline-block big-red mr-2"
              >
                {{ item.label }}
              </b-form-radio>
            </b-form-radio-group>
          </div>

          <div class="filter-option__item" v-else-if="option.type === 'select'">
            <div class="filter-option__item-title">
              {{ option.title }}
            </div>
            <b-form-select
              v-model="option.value"
              :options="option.options"
              class="normal-size"
            />
          </div>

          <div class="filter-option__item" v-else-if="option.type === 'slider'">
            <slider
              :label="option.title"
              :value="option.value"
              :unit="option.unit"
            />
          </div>
        </div>
      </div>
      <button class="btn btn-blue mt-4 input-150" @click="applyFilter">
        {{ $t("common.apply_filters") }}
      </button>
    </b-collapse>
  </div>
</template>

<script>
import Slider from "@/components/common/Slider";

export default {
  name: "TableFilter",
  components: {
    Slider
  },
  props: {
    title: {
      type: String,
      default: "Table Filter"
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      visible: false
    };
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
      let filterValues = {}; // todo
      this.$emit("table-filter", this.filterOptions);
    }
  }
};
</script>

<style>
div[role="radiogroup"] {
  outline: none;
}
</style>
