<template>
    <div id="page_dashboard" class="dashboard-content">
        <div class="container-fluid">
            <b-row>
                <b-col>
                    <div class="d-flex responsive justify-content-between content-header">
                        <h1 class="title text-center">{{ $t('YOUR_DASHBOARD') }}</h1>
                        <b-button v-b-modal.adjust_dashboard>{{ $t('ADJUST_DASHBOARD') }}</b-button>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="8">
                    <Statistics v-if="statisticsItem" v-on:hide-statistics-card="hideStatisticsCard"/>
                    <b-row>
                        <b-col md="6">
                            <Position v-if="positionItem" v-on:hide-position-card="hidePositionCard"/>
                        </b-col>
                        <b-col md="6">
                            <message v-if="messageItem" v-on:hide-message-card="hideMessageCard"/>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col md="4">
                    <Birthday v-if="birthdayItem" v-on:hide-birthday-card="hideBirthdayCard"/>
                    <Todo v-if="todoItem" v-on:hide-todo-card="hideTodoCard"/>
                </b-col>
            </b-row>
        </div>
        <b-modal id="adjust_dashboard" centered>
            <template v-slot:modal-header="{ close }">
                <h2>
                    {{ $t('ADJUST_DASHBOARD') }}
                </h2>
            </template>
            <div>
                <ul class="custom-list">
                    <li class="d-flex responsive">
                        <div>
                            <p>Message area</p>
                            <small>
                                Curabitur luctus sit amet nunc et commodo. Phasellus tincidunt, metus eu maximus
                                interdum, dui purus cursus elit.
                            </small>
                        </div>
                        <b-form-checkbox
                                class="rtl"
                                size="lg"
                                v-model="messageItem"
                                name="check-button" switch>
                        </b-form-checkbox>
                    </li>
                    <li class="d-flex responsive">
                        <div>
                            <p>Position area</p>
                            <small>
                                Curabitur luctus sit amet nunc et commodo. Phasellus tincidunt, metus eu maximus
                                interdum, dui purus cursus elit.
                            </small>
                        </div>
                        <b-form-checkbox
                                class="rtl"
                                size="lg"
                                v-model="positionItem"
                                name="check-button" switch>
                        </b-form-checkbox>
                    </li>

                    <li class="d-flex responsive">
                        <div>
                            <p>Birthday area</p>
                            <small>
                                Curabitur luctus sit amet nunc et commodo. Phasellus tincidunt, metus eu maximus
                                interdum, dui purus cursus elit.
                            </small>
                        </div>
                        <b-form-checkbox
                                class="rtl"
                                size="lg"
                                v-model="birthdayItem"
                                name="check-button" switch>
                        </b-form-checkbox>
                    </li>
                    <li class="d-flex responsive">
                        <div>
                            <p>Todo area</p>
                            <small>
                                Curabitur luctus sit amet nunc et commodo. Phasellus tincidunt, metus eu maximus
                                interdum, dui purus cursus elit.
                            </small>
                        </div>
                        <b-form-checkbox
                                class="rtl"
                                size="lg"
                                v-model="todoItem"
                                name="check-button"
                                switch>
                        </b-form-checkbox>
                    </li>
                    <li class="d-flex responsive">
                        <div>
                            <p>Statistics area</p>
                            <small>
                                Curabitur luctus sit amet nunc et commodo. Phasellus tincidunt, metus eu maximus
                                interdum, dui purus cursus elit.
                            </small>
                        </div>
                        <b-form-checkbox
                                class="rtl"
                                size="lg"
                                v-model="statisticsItem"
                                name="check-button"
                                switch>
                        </b-form-checkbox>
                    </li>
                </ul>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Card from "@/components/common/Card.vue";
    import Message from "@/views/dashboard/components/Message.vue";
    import Position from "@/views/dashboard/components/Position.vue";
    import Statistics from "@/views/dashboard/components/Statistics.vue";
    import Birthday from "@/views/dashboard/components/Birthday.vue";
    import Todo from "@/views/dashboard/components/Todo.vue";
    import Trend from "vuetrend";

    export default {
        name: "dashboard",
        components: {
            Card,
            Trend,
            Message,
            Position,
            Statistics,
            Birthday,
            Todo
        },
        data() {
            return {
                messageItem: true,
                positionItem: true,
                birthdayItem: true,
                todoItem: true,
                statisticsItem: true,
            }
        },
        methods: {
            hideMessageCard: function () {
                this.messageItem = false;
            },
            hideStatisticsCard: function () {
                this.statisticsItem = false;
            },
            hidePositionCard: function () {
                this.positionItem = false;
            },
            hideBirthdayCard: function () {
                this.birthdayItem = false;
            },
            hideTodoCard: function () {
                this.todoItem = false;
            }
        }
    }
</script>

<style scoped>

</style>
