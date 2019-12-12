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
            <div class="card-list">
                <card id="frontoffice">
                    <div slot="header">
                        <div class="d-flex">
                            <img class="icon" src="@/assets/image/icon/front-office.svg">
                            <h2>Frontend Office</h2>
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li>Kandidaat</li>
                            <li>Klant</li>
                            <li>Aanvraag & Matching</li>
                            <li>Todo / dag / weekplanning</li>
                        </ul>
                    </div>
                    <button class="btn btn-red medium">Continue</button>
                </card>
                <card id="backoffice">
                    <div slot="header">
                        <div class="d-flex">
                            <img class="icon" src="@/assets/image/icon/back-office.svg">
                            <h2>Back Office</h2>
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li>Urendeclaraties</li>
                            <li>Facturatie</li>
                            <li>Verloning</li>
                            <li>Debiteurenbeheer</li>
                        </ul>
                    </div>
                    <button class="btn btn-red medium">Continue</button>
                </card>
                <card id="manageportal">
                    <div slot="header">
                        <div class="d-flex">
                            <img class="icon" src="@/assets/image/icon/management-portal.svg">
                            <h2>Management Portal</h2>
                        </div>
                    </div>
                    <div>
                        <ul>
                            <li>Totaal aanvragen / Vacatures per account</li>
                            <li>Totaal urendeclaratie</li>
                            <li>Plaatsingen per acc tov voorgaande weken</li>
                        </ul>
                    </div>
                    <button class="btn btn-red medium">Continue</button>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from "@/components/common/Card.vue";

    export default {
        name: "summary-page",
        components: {
            Card
        }
    }
</script>

<style scoped>

</style>