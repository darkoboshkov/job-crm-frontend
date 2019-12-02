<template>
  <div id="page_forgot_password">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="forgot-password-form">
            <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
            <div class="forgot-password-form__header-line"></div>
            <h1 class="title">Forgot your password</h1>
            <form-input
              id="email"
              type="email"
              field="email"
              label="E-mail address"
              icon-class-name="icon-shape"
              class="email"
            ></form-input>
            <div style="display: flex">
              <button class="btn btn-blue send">Send Reset Email</button>
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
    name: "ForgotPassword",
    components: {
      FormInput
    }
  }
</script>

<style scoped>

</style>
