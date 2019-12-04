<template>
    <div id="page_signup">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form>
                        <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div></div>
                        <h1>Sign Up</h1>
                        <div class="row">
                            <div class="col-md-6">
                                <form-input
                                        id="first_name"
                                        class="first_name"
                                        type="text"
                                        field="first_name"
                                        label="First Name"
                                        icon-class-name="icon-monkey"
                                        v-model="firstName"
                                />
                            </div>
                            <div class="col-md-6">
                                <form-input
                                        id="last_name"
                                        class="last_name"
                                        type="text"
                                        field="last_name"
                                        label="Last Name"
                                        icon-class-name="icon-monkey"
                                        v-model="lastName"
                                />
                            </div>
                        </div>
                        <form-input
                                id="email"
                                class="email"
                                type="email"
                                field="email"
                                label="Email address"
                                icon-class-name="icon-monkey"
                                v-model="email"
                        />
                        <form-input
                                id="password"
                                class="password"
                                type="password"
                                field="password"
                                label="Password"
                                icon-class-name="icon-lock"
                                v-model="password"
                        />
                        <form-input
                                id="c_password"
                                class="c-password"
                                type="password"
                                field="password"
                                label="Confirm Password"
                                icon-class-name="icon-lock"
                                v-model="cPassword"
                        />
                        <div class="d-flex role-selector">
                            <div>
                                <input type="radio" name="role" id="manager" value="manager" v-model="role" />
                                <label for="manager">Manager</label>
                            </div>

                            <div>
                                <input type="radio" name="role" id="worker" value="worker" v-model="role" />
                                <label for="worker">Worker</label>
                            </div>
                        </div>
                        <div class="buttons d-flex">
                            <div>
                                <button class="btn btn-red" @click.prevent="signup">Signup</button>
                            </div>
                            <div>
                                <button class="btn btn-blue">Login</button>
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
            }
        },
        methods: {
            signup() {
                return authApi.signup({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    role: this.role,
                    password: this.password,
                    c_password: this.cPassword,
                }).then(res => {
                    console.log('res', res)
                    // this.$store.dispatch('updateToken', res.token)
                });
            }
        },
    }
</script>

<style scoped>

</style>
