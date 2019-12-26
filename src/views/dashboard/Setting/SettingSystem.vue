<template>
    <div class="setting-system">
        <div class="setting-system__form">
            <div class="form-element">
                <label>Background Color:</label>
                <b-form-input
                        type="text"
                        required
                        class="custom-input"
                />
            </div>
            <div class="form-element mt-3">
                <label>Font Family:</label>
                <b-form-select>
                    <option >Please select an option</option>
                    <option value="a">Option A</option>
                    <option value="b">Option B</option>
                </b-form-select>
            </div>
            <div class="form-element mt-3">
                <label>Notifications:</label>
                <div class="d-flex w-100" style="margin-bottom: 0.5rem">
                    <b-form-checkbox class="rtl" switch size="lg">Mail notifications</b-form-checkbox>
                    <b-form-checkbox class="rtl" switch size="lg">Phone message</b-form-checkbox>
                </div>
            </div>
            <div class="form-element mt-3">
                <label>Timezone:</label>
                <b-form-select>
                    <option >Please select an option</option>
                    <option value="a">Option A</option>
                    <option value="b">Option B</option>
                </b-form-select>
            </div>
            <div class="form-element mt-3">
                <label>Week:</label>
                <b-form-select>
                    <option >Please select an option</option>
                    <option value="a">Option A</option>
                    <option value="b">Option B</option>
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