<template>
    <div id="page_signup">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form>
                        <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div></div>
                        <h1>Sign Up</h1>
                        <div class="name-group d-flex">
                            <form-input
                                    id="first_name"
                                    class="first-name flex-1"
                                    type="text"
                                    field="first_name"
                                    label="First Name"
                                    icon-class-name="icon-monkey"
                                    v-model="firstName"
                                    :error="firstNameError"
                            />
                            <form-input
                                    id="last_name"
                                    class="last-name flex-1"
                                    type="text"
                                    field="last_name"
                                    label="Last Name"
                                    icon-class-name="icon-monkey"
                                    v-model="lastName"
                                    :error="lastNameError"
                            />
                        </div>

                        <form-input
                                id="email"
                                class="email"
                                type="email"
                                field="email"
                                label="Email address"
                                icon-class-name="icon-monkey"
                                v-model="email"
                                :error="emailError"
                        />
                        <form-input
                                id="password"
                                class="password"
                                type="password"
                                field="password"
                                label="Password"
                                icon-class-name="icon-lock"
                                v-model="password"
                                :error="passwordError"
                        />
                        <form-input
                                id="c_password"
                                class="c-password"
                                type="password"
                                field="password"
                                label="Confirm Password"
                                icon-class-name="icon-lock"
                                v-model="cPassword"
                                :error="cPasswordError"
                        />
                        <div class="d-flex role-selector">
                            <div>
                                <input type="radio" name="role" id="manager" value="manager" v-model="role"/>
                                <label for="manager">Manager</label>
                            </div>

                            <div>
                                <input type="radio" name="role" id="worker" value="worker" v-model="role"/>
                                <label for="worker">Worker</label>
                            </div>
                        </div>
                        <div class="buttons d-flex">
                            <div>
                                <button class="btn btn-red" @click.prevent="signup">Signup</button>
                            </div>
                            <div>
                                <button class="btn btn-blue" @click.prevent="goToLogin">Login</button>
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
    import FormInput from '@/components/common/FormInput.vue';
    import { Toast } from '@/utiles';

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
                        this.$store.dispatch('updateToken', res.token)

                        this.$store.dispatch('user/updateEmail', res.user.email)
                        this.$store.dispatch('user/updateFirstName', res.user.firstName)
                        this.$store.dispatch('user/updateLastName', res.user.lastName)
                        this.$store.dispatch('user/updateRole', res.user.role)
                        this.$store.dispatch('user/updateVerificationCode', res.user.verification)
                        this.$store.dispatch('user/updateVerificationExpires', res.user.verificationExpires)
                        this.$store.dispatch('user/updateVerified', res.user.verified)

                        if (res.user && res.user.verified) {
                            Toast('Registered in successfully!', 'success')
                            this.$router.push('/dashboard')
                        } else {
                            Toast('Please verify your email!', 'warning')
                            this.$router.push('/verify')
                        }
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
