<template>
    <div id="page_privacy" class="dashboard-content">
        <div class="container">
            <h1 class="title">{{ $t('PRIVACY_STATEMENT') }}</h1>
            <b-card id="privacy">
                <h3>1. {{ $t('PRIVACY1') }}</h3>
                <p>{{ $t('PRIVACY1_DESCRIPTION1') }}</p>

                <h3>2. {{ $t('PRIVACY2') }}</h3>
                <p>{{ $t('PRIVACY2_DESCRIPTION1') }}</p>

                <h3>3. {{ $t('PRIVACY3') }}</h3>
                <p>{{ $t('PRIVACY3_DESCRIPTION1') }}</p>

                <h3>4. {{ $t('PRIVACY4') }}</h3>
                <p>{{ $t('PRIVACY4_DESCRIPTION1') }}</p>

                <h3>5. {{ $t('PRIVACY5') }}</h3>
                <p>{{ $t('PRIVACY5_DESCRIPTION1') }}</p>
                <p>{{ $t('PRIVACY5_DESCRIPTION2') }}</p>
                <p>{{ $t('PRIVACY5_DESCRIPTION3') }}</p>
                <p>{{ $t('PRIVACY5_DESCRIPTION4') }}</p>

                <h3>6. {{ $t('PRIVACY6') }}</h3>
                <p>{{ $t('PRIVACY6_DESCRIPTION1') }}</p>

                <h3>7. {{ $t('PRIVACY7') }}</h3>
                <p>{{ $t('PRIVACY7_DESCRIPTION1') }}</p>
                <p>{{ $t('PRIVACY7_DESCRIPTION2') }}</p>

                <h3>8. {{ $t('PRIVACY8') }}</h3>
                <p>{{ $t('PRIVACY8_DESCRIPTION1') }}</p>
                <p>{{ $t('PRIVACY8_DESCRIPTION2') }}</p>
                <p>{{ $t('PRIVACY8_DESCRIPTION3') }}</p>
            </b-card>
        </div>
    </div>
</template>

<script>
    import Card from "@/components/common/Card.vue";

    export default {
        name: "Privacy",
        components: {
            Card
        }
    }
</script>

<style scoped>

</style>
