<template>
    <div id="page_invitation">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form class="invitation-form">
                        <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div class="invitation-form__header-line"></div>
                        <h1 class="title">Accept Invitation</h1>
                        <form-input
                                id="first_name"
                                type="text"
                                field="firstName"
                                label="First Name"
                                icon-class-name="icon-monkey"
                        />
                        <form-input
                                id="last_name"
                                type="text"
                                field="lastName"
                                label="Last Name"
                                icon-class-name="icon-monkey"
                        />
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
                            <button class="btn btn-blue accept">Accept</button>
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
        name: "AcceptInvitation",
        components: {
            FormInput
        }
    }
</script>

<style scoped>

</style>
