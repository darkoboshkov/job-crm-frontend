<template>
    <div id="page_signup">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form>
                        <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div></div>
                        <h1>Sign Up</h1>
                        <form-input
                                id="first_name"
                                class="first_name"
                                type="text"
                                field="first_name"
                                label="First Name"
                                icon-class-name="icon-shape"
                        />
                        <form-input
                                id="last_name"
                                class="last_name"
                                type="text"
                                field="last_name"
                                label="Last Name"
                                icon-class-name="icon-shape"
                        />
                        <form-input
                                id="email"
                                class="email"
                                type="email"
                                field="email"
                                label="Email address"
                                icon-class-name="icon-shape"
                        />
                        <form-input
                                id="password"
                                class="password"
                                type="password"
                                field="password"
                                label="Password"
                                icon-class-name="icon-lock"
                        />
                        <div class="buttons" style="display: flex;">
                            <div>
                                <button class="btn btn-red">Signup</button>
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
    import FormInput from '@/components/common/FormInput.vue';

    export default {
        name: "SignUp",
        components: {
            FormInput
        }
    }
</script>

<style scoped>

</style>
