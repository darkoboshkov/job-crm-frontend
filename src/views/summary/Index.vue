<template>
    <div id="page_summary">
        <div class="container">
            <div>
                <h1 class="title">
                    Welkom terug Henry,
                </h1>
                <p class="sub-title">
                    Curabitur luctus sit amet nunc et commodo. Phasellus tincidunt, metus eu maximus interdum, dui purus
                    cursus elit, nec bibendum tellus erat a libero. Morbi et auctor sapien, nec dignissim mi.
                </p>
            </div>
            <b-row class="card-list">
                <b-col md="4">
                    <b-card id="frontoffice">
                        <template v-slot:header>
                            <div class="d-flex align-items-center">
                                <img class="icon" src="@/assets/image/icon/front-office.svg">
                                <h2 class="m-0">Frontend Office</h2>
                            </div>
                        </template>
                        <div>
                            <ul>
                                <li>Kandidaat</li>
                                <li>Klant</li>
                                <li>Aanvraag & Matching</li>
                                <li>Todo / dag / weekplanning</li>
                            </ul>
                        </div>
                        <button class="btn btn-red large" @click="goToDashboard">Continue</button>
                    </b-card>
                </b-col>
                <b-col md="4">
                    <b-card id="backoffice">
                        <template v-slot:header>
                            <div class="d-flex align-items-center">
                                <img class="icon" src="@/assets/image/icon/back-office.svg">
                                <h2 class="m-0">Back Office</h2>
                            </div>
                        </template>
                        <div>
                            <ul>
                                <li>Urendeclaraties</li>
                                <li>Facturatie</li>
                                <li>Verloning</li>
                                <li>Debiteurenbeheer</li>
                            </ul>
                        </div>
                        <button class="btn btn-red large" @click="goToDashboard">Continue</button>
                    </b-card>
                </b-col>
                <b-col md="4">
                    <b-card id="manage_portal">
                        <template v-slot:header>
                            <div class="d-flex align-items-center">
                                <img class="icon" src="@/assets/image/icon/management-portal.svg">
                                <h2 class="m-0">Management Portal</h2>
                            </div>
                        </template>
                        <div>
                            <ul>
                                <li>Totaal aanvragen / Vacatures per account</li>
                                <li>Totaal urendeclaratie</li>
                                <li>Plaatsingen per acc tov voorgaande weken</li>
                                <li>Totaal urendeclaratie</li>
                            </ul>
                        </div>
                        <button class="btn btn-red large" @click="goToDashboard">Continue</button>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "summary-page",
        methods: {
            goToDashboard() {
                this.$router.push('/dashboard')
            }
        }
    }
</script>

<style scoped>

</style>