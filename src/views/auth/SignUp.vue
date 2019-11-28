<template>
    <div id="page_signup">
        <div class="form-container">
            <form class="signup-form">
                <picture>
                    <source media="(min-width: 1200px)" srcset="@/assets/image/hiway_crm@3x.png">
                    <source media="(min-width: 768px)" srcset="@/assets/image/hiway_crm@2x.png">
                    <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM" style="width:auto;max-width: 100%;">
                </picture>
                <h1>Sign Up</h1>
                <form-input
                        class="mb-30"
                        id="email"
                        type="email"
                        name="email"
                        label="Email address"
                        icon-class-name="icon-shape"
                ></form-input>
                <form-input
                        class="mb-30"
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        icon-class-name="icon-lock"
                ></form-input>
                <div style="display: flex;">
                    <div class="mr-1" style="flex: 1;">
                        <button class="btn btn-red w-100 p-1 mr-1">Signup</button>
                    </div>
                    <div class="ml-1" style="flex: 1;">
                        <button class="btn btn-blue w-100 p-1 ml-1">Login</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import FormInput from '@/components/common/FormInput.vue';

  export default {
    name: "SignUp",
    components: {
      FormInput
    }
  }
</script>

<style scoped>

</style>
