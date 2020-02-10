<template>
  <div id="page_invitation">
    <div class="container">
      <div class="row justify-content-center">
        <div class="form-container">
          <form class="invitation-form">
            <img
              class="logo"
              src="@/assets/image/hiway_crm.png"
              alt="Hiway CRM"
            />
            <div class="invitation-form__header-line"></div>
            <h1 class="title">{{ $t("page_accept.title") }}</h1>
            <div class="name-group d-flex">
              <b-form-input
                id="first_name"
                v-model="firstName"
                type="text"
                required
                :placeholder="$t('page_accept.form.first_name')"
                class="custom-input first-name mt-5"
              />
              <b-form-input
                id="last_name"
                v-model="lastName"
                type="text"
                required
                :placeholder="$t('page_accept.form.last_name')"
                class="custom-input last-name mt-5"
              />
            </div>
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
              :placeholder="$t('page_accept.form.password')"
              class="custom-input mt-5"
            />
            <b-form-input
              id="c_password"
              v-model="cPassword"
              type="password"
              required
              :placeholder="$t('page_accept.form.c_password')"
              class="custom-input mt-5"
            />
            <div class="d-flex">
              <button class="btn btn-blue accept">
                {{ $t("page_accept.button.accept") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AcceptInvitation",
  data() {
    return {
      firstName: null,
      lastName: null,
      password: null,
      cPassword: null
    };
  }
};
</script>

<style scoped></style>
