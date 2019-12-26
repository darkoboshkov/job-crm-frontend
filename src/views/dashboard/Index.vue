<template>
    <div id="page_dashboard" class="dashboard-content">
        <div class="container-fluid">
            <b-row>
                <b-col>
                    <div class="d-flex responsive justify-content-between">
                        <h1 class="title text-center">Your Dashboard</h1>
                        <b-button v-b-modal.adjust_dashboard style="width: auto">Adjust dashboard</b-button>
                    </div>
                </b-col>
            </b-row>

            <b-modal id="adjust_dashboard" centered>
                <template v-slot:modal-header="{ close }">
                    <h2>
                        Dashboard aanpassen
                    </h2>
                    <b-button style="width: auto" @click="close()">
                        Opslaan
                    </b-button>
                </template>

                <p class="my-4">Hello from modal!</p>
            </b-modal>

            <b-row>
                <b-col md="8">
                    <b-row>
                        <b-col md="6">
                            <b-card id="messages">
                                <template v-slot:header>
                                    <h2 class="m-0">Messages</h2>
                                </template>
                                <div>
                                    <ul class="custom-list">
                                        <li>
                                            <p>
                                                Werkgever A
                                            </p>
                                            <div class="d-flex">
                                                <small class="flex-1">
                                                    Je loon gegevens zijn gewijgd. Zie de veranderingen in je werkgevers
                                                    informatie.
                                                </small>
                                                <i class="icon-more-vertical"/>
                                            </div>
                                        </li>
                                        <li>
                                            <p>
                                                Werkgever A
                                            </p>
                                            <div class="d-flex">
                                                <small class="flex-1">
                                                    Je loon gegevens zijn gewijgd. Zie de veranderingen in je werkgevers
                                                    informatie.
                                                </small>
                                                <i class="icon-more-vertical"/>
                                            </div>
                                        </li>
                                        <li>
                                            <p>
                                                Werkgever A
                                            </p>
                                            <div class="d-flex">
                                                <small class="flex-1">
                                                    Je loon gegevens zijn gewijgd. Zie de veranderingen in je werkgevers
                                                    informatie.
                                                </small>
                                                <i class="icon-more-vertical"/>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="mt-3">
                                        <a href="javascript:void(0)">
                                            <i class="icon-angle-right mr-2"/>
                                            View All
                                        </a>
                                    </div>
                                </div>
                            </b-card>
                        </b-col>
                        <b-col md="6">
                            <b-card id="open_positions">
                                <template v-slot:header>
                                    <h2 class="m-0">Open Positions</h2>
                                </template>
                                <div>
                                    <ul class="custom-list">
                                        <li>
                                            <p>
                                                Uitkering 435-2019
                                            </p>
                                            <div class="d-flex">
                                                <small class="flex-1">
                                                    Henry van Loon
                                                </small>
                                                <i class="icon-angle-right"/>
                                            </div>
                                        </li>
                                        <li>
                                            <p>
                                                Uitkering 435-2019
                                            </p>
                                            <div class="d-flex">
                                                <small class="flex-1">
                                                    Henry van Loon
                                                </small>
                                                <i class="icon-angle-right"/>
                                            </div>
                                        </li>
                                        <li>
                                            <p>
                                                Uitkering 435-2019
                                            </p>
                                            <div class="d-flex">
                                                <small class="flex-1">
                                                    Henry van Loon
                                                </small>
                                                <i class="icon-angle-right"/>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="mt-3">
                                        <a href="javascript:void(0)">
                                            <i class="icon-angle-right mr-2"/>
                                            View All
                                        </a>
                                    </div>
                                </div>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-card id="statistics">
                        <template v-slot:header>
                            <h2 class="m-0">Male Statistics</h2>
                        </template>
                        <div>
                            <div class="d-flex">
                                <trend
                                        :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                                        :gradient="['#c9002a', '#ff4b1f', '#ff9068']"
                                        auto-draw
                                        smooth>
                                </trend>
                                <div class="border-left">
                                    <div class="d-flex responsive text-center border-bottom py-4">
                                        <div class="flex-1 px-5">
                                            <p>
                                                Hoogte loon
                                            </p>
                                            <h4>
                                                +29.7%
                                            </h4>
                                        </div>
                                        <div class="flex-1 px-5 border-left">
                                            <p>
                                                Hoogte loon
                                            </p>
                                            <h4>
                                                -54.7%
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="d-flex responsive text-center py-4">
                                        <div class="flex-1 px-5">
                                            <p>
                                                Performance
                                            </p>
                                            <h4>

                                            </h4>
                                        </div>
                                        <div class="flex-1 px-5">
                                            <p>
                                                Export
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-card>
                </b-col>
                <b-col md="4">
                    <b-card id="upcoming_birthdays">
                        <template v-slot:header>
                            <h2 class="m-0">Upcoming birthdays</h2>
                        </template>
                        <div>
                            <ul class="custom-list">
                                <li class="d-flex responsive align-items-center">
                                    <div class="flex-1">
                                        <div class="d-flex responsive align-items-center">
                                            <div class="rounded-circle mr-3">
                                                <img src="@/assets/image/avatar_nick.png"
                                                     style="width:65px"
                                                >
                                            </div>
                                            <div>
                                                Informatie Dag Gemeente
                                                <br>
                                                Kerklaan 12 - 4593CP
                                                <br>
                                                15:00
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        03-08-1960
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </b-card>
                    <b-card id="to_do_list">
                        <template v-slot:header>
                            <h2 class="m-0">To-do list today</h2>
                        </template>
                        <div>
                            <ul class="custom-list">
                                <li class="d-flex responsive align-items-center">
                                    <div class="flex-1">
                                        <b-form-checkbox
                                                value="accepted"
                                                unchecked-value="not_accepted"
                                        >
                                            Vragen lijst 18-05-2019
                                        </b-form-checkbox>
                                    </div>
                                    <i class="icon-more-vertical"/>
                                </li>
                                <li class="d-flex responsive align-items-center">
                                    <div class="flex-1">
                                        <b-form-checkbox
                                                value="accepted"
                                                unchecked-value="not_accepted"
                                        >
                                            Vragen lijst 18-05-2019
                                        </b-form-checkbox>
                                    </div>
                                    <i class="icon-more-vertical"/>
                                </li>
                                <li class="d-flex responsive align-items-center">
                                    <div class="flex-1">
                                        <b-form-checkbox
                                                value="accepted"
                                                unchecked-value="not_accepted"
                                        >
                                            Vragen lijst 18-05-2019
                                        </b-form-checkbox>
                                    </div>
                                    <i class="icon-more-vertical"/>
                                </li>
                            </ul>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import Card from "@/components/common/Card.vue";
    import Trend from "vuetrend"

    export default {
        name: "dashboard",
        components: {
            Card,
            Trend
        }
    }
</script>

<style scoped>

</style>
