<template>
    <div class="setting-system">
        <div class="setting-system__form">
            <div class="form-element">
                <label>{{ $t('BACKGROUND_COLOR') }}:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('FONT_FAMILY') }}:</label>
                <b-form-select>
                    <option >{{ $t('SELECT_OPTION') }}</option>
                    <option value="a">{{ $t('OPTION') }} A</option>
                    <option value="b">{{ $t('OPTION') }} B</option>
                </b-form-select>
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('NOTIFICATIONS') }}:</label>
                <div class="d-flex w-100" style="margin-bottom: 0.5rem">
                    <b-form-checkbox class="rtl" switch size="lg">{{ $t('MAIL_NOTIFICATIONS') }}</b-form-checkbox>
                    <b-form-checkbox class="rtl" switch size="lg">{{ $t('PHONE_MESSAGE') }}</b-form-checkbox>
                </div>
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('TIMEZONE') }}:</label>
                <b-form-select>
                    <option >{{ $t('SELECT_OPTION') }}</option>
                    <option value="a">{{ $t('OPTION') }} A</option>
                    <option value="b">{{ $t('OPTION') }} B</option>
                </b-form-select>
            </div>
            <div class="form-element mt-3">
                <label>{{ $t('WEEK') }}:</label>
                <b-form-select>
                    <option >{{ $t('SELECT_OPTION') }}</option>
                    <option value="a">{{ $t('OPTION') }} A</option>
                    <option value="b">{{ $t('OPTION') }} B</option>
                </b-form-select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SettingSystem",
        data() {
            return {
                selected: [],
                options: [
                    { text: 'Mail notifications', value: 'red' },
                    { text: 'Phone message', value: 'green' },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
