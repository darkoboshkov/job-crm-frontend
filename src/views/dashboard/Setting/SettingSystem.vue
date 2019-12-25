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
        name: "SettingSystem"
    }
</script>

<style scoped>

</style>