<template>
    <div id="page_signup">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form>
                        <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div></div>
                        <h1>{{ $t('SIGNUP') }}</h1>
                        <div class="name-group d-flex">
                            <form-input
                                    id="first_name"
                                    class="first-name flex-1"
                                    type="text"
                                    field="first_name"
                                    :label="$t('FIRST_NAME')"
                                    v-model="firstName"
                                    :error="firstNameError"
                            />
                            <form-input
                                    id="last_name"
                                    class="last-name flex-1"
                                    type="text"
                                    field="last_name"
                                    :label="$t('LAST_NAME')"
                                    v-model="lastName"
                                    :error="lastNameError"
                            />
                        </div>

                        <form-input
                                id="email"
                                class="email"
                                type="email"
                                field="email"
                                :label="$t('EMAIL_ADDRESS')"
                                icon-class-name="icon-monkey"
                                v-model="email"
                                :error="emailError"
                        />
                        <form-input
                                id="password"
                                class="password"
                                type="password"
                                field="password"
                                :label="$t('PASSWORD')"
                                icon-class-name="icon-lock"
                                v-model="password"
                                :error="passwordError"
                        />
                        <form-input
                                id="c_password"
                                class="c-password"
                                type="password"
                                field="password"
                                :label="$t('CONFIRM_PASSWORD')"
                                icon-class-name="icon-lock"
                                v-model="cPassword"
                                :error="cPasswordError"
                        />
                        <div class="d-flex role-selector">
                            <div>
                                <input type="radio" name="role" id="manager" value="manager" v-model="role"/>
                                <label for="manager">{{ $t('MANAGER') }}</label>
                            </div>

                            <div>
                                <input type="radio" name="role" id="worker" value="worker" v-model="role"/>
                                <label for="worker">{{ $t('WORKER') }}</label>
                            </div>
                        </div>
                        <div class="buttons d-flex">
                            <div>
                                <button class="btn btn-red" @click.prevent="signup">{{ $t('SIGNUP') }}</button>
                            </div>
                            <div>
                                <button class="btn btn-blue" @click.prevent="goToLogin">{{ $t('LOGIN') }}</button>
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
    import FormInput from '@/components/common/FormInput';
    import { Toast, handleLogin} from '@/utils';

    export default {
        name: "SignUp",
        components: {
            FormInput
        },
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                role: 'manager',
                password: '',
                cPassword: '',

                firstNameError: '',
                lastNameError: '',
                emailError: '',
                passwordError: '',
                cPasswordError: '',
            }
        },
        methods: {
            validate() {
                let valid = true;

                if (!this.firstName) {
                    this.firstNameError = "THIS_FIELD_IS_REQUIRED";
                    valid = false;
                } else {
                    this.firstNameError = '';
                }
                if (!this.lastName) {
                    this.lastNameError = "THIS_FIELD_IS_REQUIRED";
                    valid = false;
                } else {
                    this.lastNameError = '';
                }
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
                if (!this.cPassword) {
                    this.cPasswordError = "THIS_FIELD_IS_REQUIRED";
                    valid = false;
                } else {
                    this.cPasswordError = '';
                }

                return valid;
            },
            signup() {
                if (this.validate()) {
                    return authApi.signup({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        role: this.role,
                        password: this.password,
                        c_password: this.cPassword,
                    }).then(res => {
                        handleLogin(
                            {
                                jwt: res.token,
                                expiresIn: res.tokenExpiresIn
                            },
                            res.user
                        );
                        Toast('Please verify your email!', 'warning')
                        this.$router.push('/verify')
                    }).catch((data) => {
                        let messages = data.response.data.errors.msg

                        messages.forEach(msg => {
                            if (msg.param === 'firstName') {
                                this.firstNameError = msg.msg
                            }
                            if (msg.param === 'lastName') {
                                this.lastNameError = msg.msg
                            }
                            if (msg.param === 'email') {
                                this.emailError = msg.msg
                            }
                            if (msg.param === 'password') {
                                this.passwordError = msg.msg
                            }
                            if (msg.param === 'c_password') {
                                this.cPasswordError = msg.msg
                            }
                        })
                    });
                }
            },
            goToLogin() {
                this.$router.push('/login')
            },
        },
    }
</script>

<style scoped>

</style>
