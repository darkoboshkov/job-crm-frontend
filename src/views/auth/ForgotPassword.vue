<template>
    <div id="page_forgot_password">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form class="forgot-password-form">
                        <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div class="forgot-password-form__header-line"></div>
                        <h1 class="title">Forgot my password</h1>
                        <form-input
                                id="email"
                                type="email"
                                field="email"
                                label="E-mail address"
                                icon-class-name="icon-monkey"
                                class="email"
                                v-model="email"
                                :error="error"
                        />
                        <div class="d-flex">
                            <button class="btn btn-blue send" @click.prevent="forgot">Send Reset Email</button>
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
        name: "ForgotPassword",
        components: {
            FormInput
        },
        data() {
            return {
                email: '',
                error: '',
            }
        },
        methods: {
            forgot() {
                if (this.email) {
                    authApi.forgot({
                        email: this.email
                    }).then(res => {
                        console.log('res', res)
                        // if (res.verification) {
                        //     this.$router.push('/reset/' + res.verification)
                        // }
                    })
                } else {
                    this.error = 'Please feel this input'
                }
            }
        }
    }
</script>

<style scoped>

</style>
