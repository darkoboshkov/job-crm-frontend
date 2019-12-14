<template>
    <div id="page_invitation">
        <div class="container">
            <div class="row justify-content-center">
                <div class="form-container">
                    <form class="invitation-form">
                        <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                        <div class="invitation-form__header-line"></div>
                        <h1 class="title">Accept Invitation</h1>
                        <div class="name-group d-flex">
                            <form-input
                                    id="first_name"
                                    class="first-name flex-1"
                                    type="text"
                                    field="firstName"
                                    label="First Name"
                            />
                            <form-input
                                    id="last_name"
                                    class="last-name flex-1"
                                    type="text"
                                    field="lastName"
                                    label="Last Name"
                            />
                        </div>
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
    import FormInput from '@/components/common/FormInput';

    export default {
        name: "AcceptInvitation",
        components: {
            FormInput
        }
    }
</script>

<style scoped>

</style>
