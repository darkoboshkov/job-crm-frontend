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
        name: "SettingSystem"
    }
</script>

<style scoped>

</style>
