<template>
    <b-card id="open_positions">
        <template v-slot:header>
            <div class="row">
                <div class="col-md-6">
                    <h2 class="m-0">{{ $t('OPEN_POSITIONS') }}</h2>
                </div>
                <div class="col-md-6">
                    <button type="button" class="close" aria-label="Close" @click="hidePositionCard">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            </div>
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
                    {{ $t('VIEW_ALL') }}
                </a>
            </div>
        </div>
    </b-card>
</template>

<script>
    export default {
        name: 'position',
        methods: {
            hidePositionCard: function () {
                this.$emit('hide-position-card');
            }
        }
    }
</script>