<template>
    <div id="page_verify_email">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form class="verify-email-form">
                        <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div class="verify-email-form__header-line"></div>
                        <div class="notification-container d-flex">
                            <div class="mailbox">
                                <img src="@/assets/image/img-mailbox.png" alt="Mailbox">
                            </div>
                            <div class="flex-1">
                                <h4>Please verify your email address to login to Hiway CRM!</h4>
                                <p>
                                    We've just sent an email to your address <strong>{{ email }}</strong> <br>
                                    Please check your email and click on the link provided to verify your address. <br>
                                    If you haven't received email, request
                                    <a href="javascript:;" @click="() => requestResendEmail()">resend</a> here.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import authApi from '@/services/api/auth.js';
    export default {
        name: "VerifyEmail",
        data() {
            return {

            }
        },
        computed: {
            email() {
                return this.$store.state.user.email
            },
        },
        mounted() {
            let code = this.$route.params.code

            if (code) {
                authApi.verify({
                    id: code
                }).then(res => {
                    if (res.verified) {
                        this.$store.dispatch('user/updateVerified', res.verified)
                        this.$router.push('/dashboard')
                    } else {
                        alert('verification code has issue')
                    }
                })
            }
        },
        methods: {
            requestResendEmail() {
            }
        }
    }
</script>

<style scoped>

</style>
