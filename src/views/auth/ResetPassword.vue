<template>
    <div id="page_reset_password">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form class="reset-password-form">
                        <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div class="reset-password-form__header-line"></div>
                        <h1 class="title">Reset Password</h1>
                        <form-input
                                id="password"
                                type="password"
                                field="password"
                                label="Password"
                                icon-class-name="icon-lock"
                                v-model="password"
                        />
                        <form-input
                                id="c_password"
                                type="password"
                                field="c_password"
                                label="Confirm Password"
                                icon-class-name="icon-lock"
                                v-model="cPassword"
                        />
                        <div class="d-flex">
                            <button class="btn btn-blue reset" @click.prevent="reset">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import authApi from '@/services/api/auth.js';
    import FormInput from '@/components/common/FormInput.vue';

    export default {
        name: "ResetPassword",
        components: {
            FormInput
        },
        data() {
            return {
                password: '',
                cPassword: '',
            }
        },
        methods: {
            reset() {
                let code = this.$route.params.code

                authApi.reset({
                    id: code,
                    password: this.password,
                    c_password: this.cPassword,
                }).then(res => {
                    // console.log('res', res)
                })
            }
        }
    }
</script>

<style scoped>

</style>
