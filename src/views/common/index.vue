<template>
    <div>
        common components
        <div class="my-1">
            <button class="btn btn-red">red button</button>
            <button class="btn btn-blue">blue button</button>
        </div>
        <div class="my-1">
            <form-input
                    label="common form input"
                    icon-class-name="icon-lock"
            ></form-input>
        </div>
    </div>
</template>

<script>
  import FormInput from './FormInput.vue';

  export default {
    name: "index",
    components: {
      FormInput
    }
  }
</script>

<style scoped>

</style>