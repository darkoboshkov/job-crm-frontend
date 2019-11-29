<template>
    <div id="page_signup">
        <div class="form-container">
            <form>
                <img src="@/assets/image/hiway_crm.png" alt="Hiway CRM">
                <div></div>
                <h1>Sign Up</h1>
                <form-input
                        id="email"
                        type="email"
                        field="email"
                        label="Email address"
                        icon-class-name="icon-shape"
                ></form-input>
                <form-input
                        id="password"
                        type="password"
                        field="password"
                        label="Password"
                        icon-class-name="icon-lock"
                ></form-input>
                <div style="display: flex;">
                    <div>
                        <button class="btn btn-red">Signup</button>
                    </div>
                    <div>
                        <button class="btn btn-blue">Login</button>
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
