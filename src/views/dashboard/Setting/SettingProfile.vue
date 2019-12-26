<template>
    <div class="setting-profile">
        <div class="setting-profile__form">
            <div class="form-element">
                <label>{{ $t('FIRST_NAME') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('MIDDLE_NAME') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('LAST_NAME') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('GENDER') }}:</label>
                <div class="gender">
                    <b-form-radio name="gender" value="male">{{ $t('MAN') }}</b-form-radio>
                    <b-form-radio name="gender" value="female">{{ $t('WOMAN') }}</b-form-radio>
                </div>
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('DATE_OF_BIRTH') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('BANK_ACCOUNT_NUMBER') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('ADDRESS') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('POSTAL_CODE') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('CITY') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('EMAIL') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('PASSWORD') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('PASSPORT') }}:</label>
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
