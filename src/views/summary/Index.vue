<template>
    <div id="page_summary">
        <div class="container">
            <div>
                <h1 class="title">
                    {{ $t('WELCOME_BACK') }}, Henry,
                </h1>
                <p class="sub-title">
                    Curabitur luctus sit amet nunc et commodo. Phasellus tincidunt, metus eu maximus interdum, dui purus
                    cursus elit, nec bibendum tellus erat a libero. Morbi et auctor sapien, nec dignissim mi.
                </p>
            </div>
            <b-row class="card-list">
                <b-col md="4" class="d-flex">
                    <b-card id="frontoffice">
                        <template v-slot:header>
                            <div class="d-flex align-items-center">
                                <img class="icon" src="@/assets/image/icon/front-office.svg">
                                <h2 class="m-0">{{ $t('FRONTEND_OFFICE') }}</h2>
                            </div>
                        </template>
                        <div>
                            <ul>
                                <li>{{ $t('CANDIDATE') }}</li>
                                <li>{{ $t('CUSTOMER') }}</li>
                                <li>{{ $t('REQUEST') }} & {{ $t('MATCHING') }}</li>
                                <li>{{ $t('TODO') }} / {{ $t('DAY') }} / {{ $t('WEEK_PLANNING') }}</li>
                            </ul>
                        </div>
                        <button class="btn btn-red large" @click="goToDashboard">
                            <span class="float-left pl-4">{{ $t('CONTINUE') }}</span>
                            <span class="float-right pr-4">
                                <i class="icon-angle-right" />
                            </span>
                        </button>
                    </b-card>
                </b-col>
                <b-col md="4" class="d-flex">
                    <b-card id="backoffice">
                        <template v-slot:header>
                            <div class="d-flex align-items-center">
                                <img class="icon" src="@/assets/image/icon/back-office.svg">
                                <h2 class="m-0">{{ $t('BACK_OFFICE') }}</h2>
                            </div>
                        </template>
                        <div>
                            <ul>
                                <li>{{ $t('HOURLY_DECLARATIONS') }}</li>
                                <li>{{ $t('INVOICING') }}</li>
                                <li>{{ $t('PAY') }}</li>
                                <li>{{ $t('DEBTOR_MANAGEMENT') }}</li>
                            </ul>
                        </div>
                        <button class="btn btn-red large" @click="goToDashboard">
                            <span class="float-left pl-4">{{ $t('CONTINUE') }}</span>
                            <span class="float-right pr-4">
                                <i class="icon-angle-right" />
                            </span>
                        </button>
                    </b-card>
                </b-col>
                <b-col md="4" class="d-flex">
                    <b-card id="manage_portal">
                        <template v-slot:header>
                            <div class="d-flex align-items-center">
                                <img class="icon" src="@/assets/image/icon/management-portal.svg">
                                <h2 class="m-0">{{ $t('MANAGEMENT_PORTAL') }}</h2>
                            </div>
                        </template>
                        <div>
                            <ul>
                                <li>{{ $t('TOTAL_APPLICATIONS') }} / {{ $t('JOBS_PER_ACCOUNT') }}</li>
                                <li>{{ $t('TOTAL_HOURLY_STATEMENT') }}</li>
                                <li>{{ $t('CONTINUE') }}</li>
                                <li>{{ $t('TOTAL_HOURLY_STATEMENT') }}</li>
                            </ul>
                        </div>
                        <button class="btn btn-red large" @click="goToDashboard">
                            <span class="float-left pl-4">{{ $t('CONTINUE') }}</span>
                            <span class="float-right pr-4">
                                <i class="icon-angle-right" />
                            </span>
                        </button>
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
