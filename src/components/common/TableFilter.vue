<template>
    <div class="table-filter">
        <div v-b-toggle.collapse_table-filter class="table-filter__title">
            <h5><i class="icon-equalizer mr-2" />{{title}}</h5>
        </div>
        <b-collapse id="collapse_table-filter">
            <div class="table-filter-options">
                <div class="filter-option"
                     v-for="(option, index) in filterOptions" :key="index">
                    <div class="filter-option__title">
                        {{option.title}}
                    </div>
                    <div class="filter-option__items">
                        <div class="item"
                             v-for="(item, itemIndex) in option.items"
                             :key="itemIndex">
                            <b-form-input
                                    v-if="item.el && item.el === 'input'"
                                    :type="item.type"
                                    v-model="item.value"
                            />
                            <b-form-checkbox
                                    v-if="item.el && item.el === 'checkbox'"
                                    v-model="item.value"
                            >
                                {{item.label}}
                            </b-form-checkbox>
                        </div>
                    </div>
                </div>
            </div>
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
                set(value) {
                    this.$emit('table:filter', value);
                },
            },
        }
    }
</script>

<style scoped>

</style>