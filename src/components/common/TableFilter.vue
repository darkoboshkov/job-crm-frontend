<template>
    <div class="table-filter">
        <div v-b-toggle.collapse_table-filter class="table-filter__title">
            <h5><i class="icon-equalizer mr-2" />{{title}}</h5>
        </div>
        <b-collapse id="collapse_table-filter">
            <div class="table-filter-options">
                <div class="filter-option"
                     v-for="(option, index) in filterOptions" :key="index">
                    <div class="filter-option__title mt-3">
                        {{option.title}}
                    </div>
                    <div class="filter-option__items">
                        <div class="item">
                            <b-form-input
                                    v-if="option.type === 'text'"
                                    :type="option.type"
                                    v-model="option.value"
                            />
                            <b-form-checkbox
                                    v-if="option.type === 'checkbox'"
                                    v-for="(item, itemIndex) in option.options"
                                    :key="itemIndex"
                                    v-model="item.checked"
                            >
                                {{item.label}}
                            </b-form-checkbox>
                            <b-form-select
                                    v-if="option.type === 'select'"
                                    v-model="option.value"
                                    :options="option.options"
                            ></b-form-select>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-blue mt-4" style="width: 150px" @click="applyFilter">{{ $t('APPLY_FILTERS') }}</button>
        </b-collapse>
    </div>
</template>

<script>
    export default {
        name: "TableFilter",
        props: {
            title: {
                type: String,
                default: "Table Filter"
            },
            options: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        computed: {
            filterOptions: {
                get() {
                    return this.options;
                },
            },
        },
        methods: {
            applyFilter() {
              this.$emit('table-filter', this.filterOptions);
            }
        },
    }
</script>

<style scoped>

</style>
