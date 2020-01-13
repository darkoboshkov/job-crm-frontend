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

            <b-modal id="adjust_dashboard" centered>
                <template v-slot:modal-header="{ close }">
                    <h2>
                        {{ $t('ADJUST_DASHBOARD') }}
                    </h2>
                    <b-button @click="close()">
                        {{ $t('SAVE') }}
                    </b-button>
                </template>
                <div>
                    <b-form-checkbox v-model="messageItem" name="check-button" switch>
                        Message area
                    </b-form-checkbox>
                    <b-form-checkbox v-model="positionItem" name="check-button" switch>
                        Position area
                    </b-form-checkbox>
                    <b-form-checkbox v-model="birthdayItem" name="check-button" switch>
                        Birthday area
                    </b-form-checkbox>
                    <b-form-checkbox v-model="todoItem" name="check-button" switch>
                        Todo area
                    </b-form-checkbox>
                    <b-form-checkbox v-model="statisticsItem" name="check-button" switch>
                        Statistics area
                    </b-form-checkbox>
                </div>
            </b-modal>
            <b-row>
                <b-col md="8">
                    <Statistics v-if="statisticsItem" v-on:hide-statistics-card="hideStatisticsCard"></Statistics>
                    <b-row>
                        <b-col md="6">
                            <Position v-if="positionItem" v-on:hide-position-card="hidePositionCard"></Position>
                        </b-col>
                        <b-col md="6">
                            <message v-if="messageItem" v-on:hide-message-card="hideMessageCard"></message>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col md="4">
                    <Birthday v-if="birthdayItem" v-on:hide-birthday-card="hideBirthdayCard"></Birthday>
                    <Todo v-if="todoItem" v-on:hide-todo-card="hideTodoCard"></Todo>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import Card from "@/components/common/Card.vue";
    import Message from "@/views/dashboard/Home/Message.vue";
    import Position from "@/views/dashboard/Home/Position.vue";
    import Statistics from "@/views/dashboard/Home/Statistics.vue";
    import Birthday from "@/views/dashboard/Home/Birthday.vue";
    import Todo from "@/views/dashboard/Home/Todo.vue";
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
