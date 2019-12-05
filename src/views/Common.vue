<template>
    <div id="page_common_components">
        <div class="container">
            <h1 class="title">Common Components</h1>
            <section class="common-colors">
                <h2>Colors</h2>
                <div class="items">
                    <div :key="index + '-color'"
                         class="color-box"
                         v-for="(color, index ) in colors">
                        <div class="color-box__label">{{color}}</div>
                        <div class="color-box__block" :style="'background-color: var(--' + color + ')'"></div>
                    </div>
                </div>
            </section>
            <section class="common-buttons">
                <h2>Buttons</h2>
                <div :key="sizeIndex + '-button'"
                     class="items"
                     v-for="(size, sizeIndex ) in buttonSizes"
                >
                    <div :key="colorIndex"
                         class="button-box"
                         v-for="(color, colorIndex ) in buttonColors"
                    >
                        <div class="button-box__label">btn-{{color}} {{size}}</div>
                        <button :class="'btn btn-' + color + ' ' + size">Button</button>
                    </div>
                </div>
                <div :key="sizeIndex + '-rec-button'"
                     class="items"
                     v-for="(size, sizeIndex ) in buttonSizes"
                >
                    <div :key="colorIndex"
                         class="button-box"
                         v-for="(color, colorIndex ) in buttonColors"
                    >
                        <div class="button-box__label">{{size}} rectangle</div>
                        <button :class="'btn btn-' + color + ' ' + size + ' rectangle'">Button</button>
                    </div>
                </div>
            </section>
            <section class="common-form-elements">
                <h2>Form Elements</h2>
                <div class="items">
                    <div class="my-1">
                        <form-input
                                type="text"
                                label="Name"
                        />
                    </div>
                    <div class="my-1">
                        <form-input
                                type="email"
                                label="Email"
                                icon-class-name="icon-monkey"
                        />
                    </div>
                    <div class="my-1">
                        <form-input
                                type="password"
                                label="Password"
                                icon-class-name="icon-lock"
                        />
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>

<script>
    import FormInput from '@/components/common/FormInput.vue';

    export default {
        name: "common",
        components: {
            FormInput
        },
        data() {
            return {
                colors: [
                    "white",
                    "white-two",
                    "pale-grey",
                    "pale-grey-two",
                    "white-four",
                    "pale-grey-four",
                    "light-periwinkle",
                    "pale-grey-three",
                    "white-three",
                    "pinkish-grey",
                    "warm-grey-two",
                    "warm-grey",
                    "greyish",
                    "brownish-grey",
                    "greyish-brown",
                    "black-7",
                    "black",
                    "green",
                    "lipstick-red",
                    "cobalt-blue"
                ],
                buttonColors: [
                    "default",
                    "green",
                    "blue",
                    "red",
                    "black"
                ],
                buttonSizes: [
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ]
            }
        }
    }
</script>

<style scoped>

</style>
