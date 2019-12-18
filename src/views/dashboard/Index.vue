<template>
    <div id="page_dashboard" class="dashboard-content">
        <div class="container-fluid">
            <h1 class="title">Your Dashboard</h1>
            <b-row>
                <b-col md="8">
                    <b-row>
                        <b-col md="6">
                            <b-card id="messages">
                                <template v-slot:header>
                                    <h2 class="m-0">Messages</h2>
                                </template>
                                <div>
                                </div>
                            </b-card>
                        </b-col>
                        <b-col md="6">
                            <b-card id="open_positions">
                                <template v-slot:header>
                                    <h2 class="m-0">Open Positions</h2>
                                </template>
                                <div></div>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-card id="statistics">
                        <template v-slot:header>
                            <h2 class="m-0">Male Statistics</h2>
                        </template>
                        <div></div>
                    </b-card>
                </b-col>
                <b-col md="4">
                    <b-card id="upcoming_birthdays">
                        <template v-slot:header>
                            <h2 class="m-0">Upcoming birthdays</h2>
                        </template>
                        <div></div>
                    </b-card>
                    <b-card id="to_do_list">
                        <template v-slot:header>
                            <h2 class="m-0">To-do list today</h2>
                        </template>
                        <div></div>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import Card from "@/components/common/Card.vue";

    export default {
        name: "dashboard",
        components: {
            Card
        }
    }
</script>

<style scoped>

</style>
