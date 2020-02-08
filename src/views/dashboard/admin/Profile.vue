<template>
  <div id="page_profile" class="dashboard-content">
    <div class="container-fluid">
      <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("BACK") }}</span>
      </a>
      <b-row class="mt-5">
        <b-col md="12">
          <div class="profile-header">
            <div class="profile-header__photo">
              <img src="@/assets/image/avatar_nick.png" />
            </div>
            <div class="profile-header__description">
              <h2 class="fullName">{{ model.fullName }}</h2>
              <h3 class="position">{{ model.position }}</h3>
            </div>
          </div>
          <div class="profile-edit">
            <a href="javascript:void(0);" @click.prevent="onEditProfile">
              {{ editProfile ? $t("SAVE_PROFILE") : $t("EDIT_PROFILE") }}
            </a>
            <i class="hiway-crm-icon icon-pencil ml-2" />
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <b-col md="6">
          <b-card class="mt-4">
            <template v-slot:header>
              <h5 class="m-0">{{ $t("BODY_TEXT") }}</h5>
            </template>
            <b-textarea v-if="editProfile" v-model="model.overview" rows="5" />
            <div v-else>
              {{ model.overview }}
            </div>
          </b-card>
          <b-row>
            <b-col md="6">
              <b-card class="mt-4">
                <div class="d-flex">
                  <img
                    src="@/assets/image/icon/mail-red.svg"
                    style="width:31px"
                    class="mr-3"
                  />
                  <span>{{ model.email }}</span>
                </div>
              </b-card>
            </b-col>
            <b-col md="6" class="mt-4">
              <b-card>
                <div class="d-flex">
                  <img
                    src="@/assets/image/icon/phone-red.svg"
                    style="width: 22px"
                    class="mr-3"
                  />
                  <span>{{ model.phone }}</span>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-card class="mt-4">
            <template v-slot:header>
              <h5 class="m-0">{{ $t("SPECIFICATIONS") }}</h5>
            </template>
            <div>
              <ul class="custom-list">
                <li>
                  {{ $t("REGISTERED_SINCE") }}
                  <span class="pull-right">{{ model.registeredAt }}</span>
                </li>
                <li>
                  {{ $t("AGE") }}
                  <span class="pull-right">{{ model.age }} jaar</span>
                </li>
                <li>
                  {{ $t("STATUS") }}
                  <div class="pull-right">
                    <b-form-select
                      v-if="editProfile"
                      v-model="model.status"
                      class="normal-size"
                      style="margin-top:-8px"
                    >
                      <option
                        v-for="(status, index) in userStates"
                        :value="status.value"
                        :key="index"
                      >
                        {{ status.label }}
                      </option>
                    </b-form-select>
                    <span v-else>{{ $t(model.status) }}</span>
                  </div>
                </li>
                <li>
                  {{ $t("PLACE") }}
                  <span class="pull-right">{{ model.location }}</span>
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col md="12">
          <b-card>
            <template v-slot:header>
              <div class="d-flex">
                <h5 class="m-0 flex-1">{{ $t("FILES") }}</h5>
                <div>
                  <div class="float-right">
                    <button
                      class="btn btn-blue upload"
                      style="width:100px;justify-content:center;"
                    >
                      {{ $t("UPLOAD") }}
                      <i class="hiway-crm-icon icon-upload ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <ul class="custom-list">
                <li class="d-flex">
                  <div class="flex-3">
                    CV-magalie-2019.pdf
                  </div>
                  <div class="flex-2">
                    Geupload op 23 juli 2019 om 15:09
                  </div>
                  <div class="flex-1">
                    2,3mb
                  </div>
                  <div>
                    <i class="hiway-crm-icon icon-more-vertical mr-2" />
                    <i class="hiway-crm-icon icon-bin" />
                  </div>
                </li>
                <li class="d-flex">
                  <div class="flex-3">
                    Motivatie.docx
                  </div>
                  <div class="flex-2">
                    Geupload op 23 juli 2019 om 15:09
                  </div>
                  <div class="flex-1">
                    2,3mb
                  </div>
                  <div>
                    <i class="hiway-crm-icon icon-more-vertical mr-2" />
                    <i class="hiway-crm-icon icon-bin" />
                  </div>
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal
      ref="modal-alert"
      :hide-footer="true"
      :hide-header="true"
      centered
      modal-class="modal-alert"
    >
      <div class="text-center">
        <img class="success-image" src="@/assets/image/icon/success.svg">
        <p class="alert-title color-blue">{{ $t("CHANGE_PROFILE_MODAL_TITLE") }}</p>
        <p class="alert-sub-title">{{ $t("CHANGE_PROFILE_MODAL_SUB_TITLE") }}</p>
        <button class="btn btn-blue" @click="$refs['modal-alert'].hide()">{{ $t("CONTINUE") }}</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import profileApi from "@/services/api/profile";

export default {
  name: "ProfileView",
  data() {
    return {
      editProfile: false,
      userStates: [
        {
          value: "available",
          label: "Available"
        },
        {
          value: "unavailable",
          label: "Unavailable"
        }
      ],
      model: {
        fullName: "",
        position: "",
        overview: "",
        email: "",
        phone: "",
        age: 29,
        registeredAt: "08-09-2019",
        location: "Arhem",
        status: "available"
      },
      userId: null,
      companyId: null
    };
  },
  mounted() {
    this.companyId = this.$route.params.companyId;
    this.userId = this.$route.params.id;
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      profileApi
        .get({ companyId: this.companyId, id: this.$route.params.id })
        .then(res => {
          this.model.fullName = res.firstName + " " + res.lastName;
          if (res.position && res.position.length) {
            this.model.position = res.position[0].name;
          }
          this.model.overview = res.overview ? res.overview : "";
          this.model.email = res.email;
          this.model.phone = res.phone;
          this.model.status = res.status;
          if (res.birthday) {
            const thisYear = new Date().getFullYear();
            const birthYear = res.birthday.split("-")[0];
            this.model.age = thisYear - birthYear;
          } else {
            this.model.age = "-";
          }
          this.model.registeredAt = new Date(res.createdAt).toDateString();
        });
    },
    onEditProfile() {
      this.editProfile = !this.editProfile;
      if (!this.editProfile) {
        this.updateProfile();
      }
    },
    updateProfile() {
      const data = {
        id: this.userId,
        companyId: this.companyId,
        status: this.model.status,
        overview: this.model.overview
      };
      profileApi.patchById(data).then(res => {
        this.$refs["modal-alert"].show();
        this.fetchProfile();
      });
    }
  }
};
</script>
