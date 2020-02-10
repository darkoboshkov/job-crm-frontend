<template>
  <div id="page_verify_email">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="verify-email-form">
            <img
              class="logo"
              src="@/assets/image/hiway_crm.png"
              alt="Hiway CRM"
            />
            <div class="verify-email-form__header-line"></div>
            <div class="notification-container d-flex">
              <div class="mailbox">
                <img src="@/assets/image/img-mailbox.png" alt="Mailbox" />
              </div>
              <div class="flex-1">
                <h4>{{ $t("page_verify.note") }}</h4>
                <p>
                  {{ $t("page_verify.text1") }}
                  <strong>{{ email }}</strong> <br />
                  {{ $t("page_verify.text2") }} <br />
                  {{ $t("page_verify.text3") }}
                  <a
                    href="javascript:void(0)"
                    @click="() => requestResendEmail()"
                    >{{ $t("page_verify.resend") }}</a
                  >
                  {{ $t("page_verify.here") }}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authApi from "@/services/api/auth";

export default {
  name: "VerifyEmail",
  data() {
    return {};
  },
  computed: {
    email() {
      return this.$store.state.user.email;
    }
  },
  mounted() {
    const code = this.$route.params.code;

    if (code) {
      authApi
        .verify({
          id: code
        })
        .then(res => {
          if (res.verified) {
            this.$store.dispatch("user/updateVerified", res.verified);
            this.$router.push("/dashboard");
          } else {
            alert("verification code has issue");
          }
        });
    }
  },
  methods: {
    requestResendEmail() {}
  }
};
</script>

<style scoped></style>
