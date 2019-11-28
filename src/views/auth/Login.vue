<template>
  <div id="page_login">
    <div class="container">
      <div class="row align-items-center">
        <div class="form-container">
          <form class="login-form">
            <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
            <div class="login-form__header-line"></div>
            <h1>Login</h1>
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
