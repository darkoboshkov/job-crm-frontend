<template>
    <div id="page_login">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form class="login-form">
                        <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div class="login-form__header-line"></div>
                        <h1 class="title">Login</h1>
                        <form-input
                                id="email"
                                type="email"
                                field="email"
                                label="E-mail address"
                                icon-class-name="icon-monkey"
                                class="email"
                                v-model="email"
                                :error="emailError"
                        />
                        <div class="input-wrapper">
                            <form-input
                                    id="password"
                                    type="password"
                                    field="password"
                                    label="Password"
                                    icon-class-name="icon-lock"
                                    class="password"
                                    v-model="password"
                                    :error="passwordError"
                            />
                            <a href="/forgot" class="forgot-pass">Forgot?</a>
                        </div>
                        <div class="buttons d-flex">
                            <div>
                                <button class="btn btn-red login" @click.prevent="login">Login</button>
                            </div>
                            <div>
                                <button class="btn btn-blue signup" @click.prevent="goToSignup">Signup</button>
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
    import FormInput from '@/components/common/FormInput.vue';

    export default {
        name: "Login",
        components: {
            FormInput
        },
        data() {
            return {
                email: '',
                password: '',
                emailError: '',
                passwordError: '',
            }
        },
        methods: {
            validate() {
                let valid = true;

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
                        this.$store.dispatch('updateToken', res.token)

                        if (res.user && res.user.verified) {
                            this.$router.push('/dashboard')
                        } else {
                            this.$router.push('/verify')
                        }
                    }).catch((data) => {
                        let messages = data.response.data.errors.msg

                        messages.forEach(msg => {
                            if (msg.param === 'email') {
                                this.emailError = msg.msg
                            }
                            if (msg.param === 'password') {
                                this.passwordError = msg.msg
                            }
                        })
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
