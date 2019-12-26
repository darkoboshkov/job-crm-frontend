<template>
    <div id="page_login">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form class="login-form">
                        <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div class="login-form__header-line"></div>
                        <h1 class="title">{{ $t('LOGIN') }}</h1>
                        <b-form-input
                                id="email"
                                v-model="email"
                                type="email"
                                :placeholder="$t('EMAIL_ADDRESS')"
                                class="custom-input mt-5"
                        />
                        <b-form-invalid-feedback class="d-block">
                            {{ $t(emailError) }}
                        </b-form-invalid-feedback>
                        <div class="input-wrapper mt-5">
                            <b-form-input
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    required
                                    :placeholder="$t('PASSWORD')"
                                    class="custom-input"
                            />
                            <b-form-invalid-feedback class="d-block">
                                {{ $t(passwordError) }}
                            </b-form-invalid-feedback>
                            <a href="/forgot" class="forgot-pass">{{ $t('FORGOT') }}?</a>
                        </div>
                        <b-form-invalid-feedback class="d-block mt-4">
                            {{ $t(error) }}
                        </b-form-invalid-feedback>
                        <div class="buttons d-flex">
                            <div>
                                <button class="btn btn-red login" @click.prevent="login">{{ $t('LOGIN') }}</button>
                            </div>
                            <div>
                                <button
                                        class="btn btn-blue signup"
                                        @click.prevent="goToSignup">{{ $t('CREATE_ACCOUNT') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import authApi from '@/services/api/auth';
    import {Toast, handleLogin} from '@/utils';

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                emailError: '',
                passwordError: '',
                error: '',
            }
        },
        methods: {
            isError(str) {
                return str && str.length > 0;
            },
            validate() {
                let valid = true;
                this.error = '';

                if (!this.email) {
                    this.emailError = "THIS_FIELD_IS_REQUIRED";
                    valid = false;
                } else {
                    this.emailError = '';
                }
                if (!this.password) {
                    this.passwordError = "THIS_FIELD_IS_REQUIRED";
                    valid = false;
                } else {
                    this.passwordError = '';
                }

                return valid;
            },
            login() {
                if (this.validate()) {
                    return authApi.login({
                        email: this.email,
                        password: this.password,
                    }).then(res => {
                        handleLogin(
                            {
                                jwt: res.token,
                                expiresIn: res.tokenExpiresIn
                            },
                            res.user
                        );
                        Toast('Signed in successfully!', 'success')
                        this.$router.push('/summary')
                    }).catch((data) => {
                        let messages = data.response.data.errors.msg
                        if(Array.isArray(messages)) {
                            messages.forEach(msg => {
                                if (msg.param === 'email') {
                                    this.emailError = msg.msg
                                }
                                if (msg.param === 'password') {
                                    this.passwordError = msg.msg
                                }
                            })
                        } else {
                          this.error = messages
                        }
                    });
                }
            },
            goToSignup() {
                this.$router.push('/signup')
            }
        },
    }
</script>

<style scoped>

</style>
