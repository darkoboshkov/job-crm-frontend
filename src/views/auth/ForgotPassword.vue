<template>
    <div id="page_forgot_password">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form class="forgot-password-form">
                        <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div class="forgot-password-form__header-line"></div>
                        <h1 class="title">{{ $t('FORGOT_MY_PASSWORD') }}</h1>
                        <b-form-input
                                id="email"
                                v-model="email"
                                type="email"
                                required
                                :placeholder="$t('EMAIL_ADDRESS')"
                                class="custom-input mt-5"
                        />
                        <b-form-invalid-feedback class="d-block">
                            {{ $t(error) }}
                        </b-form-invalid-feedback>
                        <div class="d-flex">
                            <button class="btn btn-blue send" @click.prevent="forgot">{{ $t('SEND_RESET_EMAIL') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import authApi from '@/services/api/auth';
    import FormInput from '@/components/common/FormInput';

    export default {
        name: "ForgotPassword",
        data() {
            return {
                email: '',
                error: '',
            }
        },
        methods: {
            validate() {
                let valid = true;

                if (!this.email) {
                    this.error = "THIS_FIELD_IS_REQUIRED";
                    valid = false;
                } else {
                    this.error = '';
                }

                return valid;
            },
            forgot() {
                if (this.validate()) {
                    this.error = ''

                    authApi.forgot({
                        email: this.email
                    }).then(res => {
                        /* eslint-disable-next-line */
                        console.log('res', res)
                        // if (res.verification) {
                        //     this.$router.push('/reset/' + res.verification)
                        // }
                    }).catch((data) => {
                        let messages = data.response.data.errors.msg
                        if (Array.isArray(messages)) {
                            messages.forEach(msg => {
                                if (msg.param === 'email') {
                                    this.error = msg.msg
                                }
                            })
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
