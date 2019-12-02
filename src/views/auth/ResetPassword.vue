<template>
  <div id="page_reset_password">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="reset-password-form">
            <img class="logo" src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
            <div class="reset-password-form__header-line"></div>
            <h1 class="title">Reset your password</h1>
            <form-input
              id="email"
              type="email"
              field="email"
              label="E-mail address"
              icon-class-name="icon-shape"
              class="email"
            ></form-input>
            <div style="display: flex">
              <button class="btn btn-blue accept">Send Reset Email</button>
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
    name: "ResetPassword",
    components: {
      FormInput
    }
  }
</script>

<style scoped>

</style>
