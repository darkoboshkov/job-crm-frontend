<template>
  <div id="page_login">
    <div class="form-container">
      <form class="signup-form">
        <picture>
          <source media="(min-width: 1200px)" srcset="@/assets/image/hiway_crm@3x.png">
          <source media="(min-width: 768px)" srcset="@/assets/image/hiway_crm@2x.png">
          <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM" style="width:auto;max-width: 100%;">
        </picture>
        <h1>Sign Up</h1>
        <form-input
          id="email"
          type="email"
          name="email"
          label="Email address"
          icon-class-name="icon-shape"
        ></form-input>
        <form-input
          id="password"
          type="password"
          name="password"
          label="Password"
          icon-class-name="icon-lock"
        ></form-input>
      </form>
    </div>
  </div>
</template>

<script>
  import FormInput from '@/components/common/FormInput.vue';

  export default {
    name: "Login",
    components: {
      FormInput
    }
  }
</script>

<style scoped>

</style>
