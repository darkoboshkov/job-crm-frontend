<template>
    <div :id="id" class="card">
        <div class="card-header">
            <div class="card-header__title">
                <slot name="header"/>
            </div>
            <div class="card-header__tool">
            </div>
        </div>
        <div class="card-body">
            <slot/>
        </div>
        <div class="card-footer">
            <slot name="footer"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
            id: {
                type: String
            }
        },
        data() {
            return {
                showCollapse: true
            }
        }
    }
</script>

<style scoped>

</style>