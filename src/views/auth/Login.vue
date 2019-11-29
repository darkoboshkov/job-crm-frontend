<template>
  <div id="page_login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="login-form">
            <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
            <div class="login-form__header-line"></div>
            <h1 class="title">Login</h1>
            <form-input
              id="email"
              type="email"
              name="email"
              label="E-mail address"
              icon-class-name="icon-shape"
              class="email"
            ></form-input>
            <div class="input-wrapper">
              <form-input
                id="password"
                type="password"
                name="password"
                label="Password"
                icon-class-name="icon-lock"
              ></form-input>
              <a href="/forgot" class="forgot-pass">Forgot?</a>
            </div>
            <div class="btn-group">
              <div style="flex: 1">
                <button class="btn btn-red login">Login</button>
              </div>
              <div style="flex: 1">
                <button class="btn btn-blue signup">Signup</button>
              </div>
            </div>
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
