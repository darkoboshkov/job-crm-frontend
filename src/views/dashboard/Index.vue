<template>
    <div id="page_dashboard" class="dashboard-content">
        <h1 class="title">Your Dashboard</h1>
        <div class="d-flex">
            <div class="left-pane flex-2">
                <div class="d-flex">
                    <card id="messages">
                        <div slot="header">
                            <h3>Messages</h3>
                        </div>
                        <div></div>
                    </card>
                    <card id="open_positions">
                        <div slot="header">
                            <h3>Open Positions</h3>
                        </div>
                        <div></div>
                    </card>
                </div>
                <card id="statistics">
                    <div slot="header">
                        <h3>Male Statistics</h3>
                    </div>
                    <div></div>
                </card>
            </div>
            <div class="right-pane flex-1">
                <card id="upcoming_birthdays">
                    <div slot="header">
                        <h3>Upcoming birthdays</h3>
                    </div>
                    <div></div>
                </card>
                <card id="to_do_list">
                    <div slot="header">
                        <h3>To-do list today</h3>
                    </div>
                    <div></div>
                </card>
            </div>
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
