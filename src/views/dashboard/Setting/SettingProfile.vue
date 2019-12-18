<template>
    <div class="setting-profile">
        <div class="setting-profile__form">
            <div class="form-element">
                <label>First Name:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Middle Name:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Last Name:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Gender:</label>
                <div class="gender">
                    <b-form-radio name="gender" value="male">Man</b-form-radio>
                    <b-form-radio name="gender" value="female">Woman</b-form-radio>
                </div>
            </div>
            <div class="form-element mt-3">
                <label>Date of birth:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Bank account number:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Address:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Postal code:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>City:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Email:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Password:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Passport:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
        </div>
        <div class="setting-profile__photo">
            <div class="image-wrapper">
                <img src="@/assets/image/avatar_nick.png"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SettingProfile"
    }
</script>

<style scoped>

</style>