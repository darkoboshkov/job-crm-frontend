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
                        />
                        <form-input
                                id="c_password"
                                type="password"
                                field="c_password"
                                label="Confirm Password"
                                icon-class-name="icon-lock"
                        />
                        <div class="d-flex">
                            <button class="btn btn-blue reset">Reset</button>
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
        name: "ResetPassword",
        components: {
            FormInput
        }
    }
</script>

<style scoped>

</style>
