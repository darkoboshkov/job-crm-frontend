<template>
  <div id="page_profile" class="dashboard-content">
    <div class="container-fluid">
      <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
        <i class="hiway-crm-icon icon-angle-left mr-2" />
        <span>{{ $t("common.back") }}</span>
      </a>
      <b-row class="mt-5">
        <b-col md="12">
          <div class="profile-header">
            <div class="profile-header__photo">
              <img v-if="model.image" :src="model.image | appUrlFormatter" />
            </div>
            <div class="profile-header__description">
              <h2 class="fullName">{{ model.fullName }}</h2>
              <h3 class="profession">{{ model.profession }}</h3>
            </div>
          </div>
          <div class="profile-edit">
            <a href="javascript:void(0);" @click.prevent="onEditProfile">
              {{
                editProfile ? $t("page_profile.save") : $t("page_profile.edit")
              }}
            </a>
            <i class="hiway-crm-icon icon-pencil ml-2" />
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-1">
        <b-col md="6">
          <b-card class="mt-4">
            <template v-slot:header>
              <h5 class="m-0">{{ $t("page_profile.form.overview") }}</h5>
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
                  <span
                    ><a :href="'mailto:' + model.email">{{
                      model.email
                    }}</a></span
                  >
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
              <h5 class="m-0">{{ $t("page_profile.form.specifications") }}</h5>
            </template>
            <div>
              <ul class="custom-list">
                <li>
                  {{ $t("page_profile.form.since") }}
                  <span class="pull-right">{{ model.registeredAt }}</span>
                </li>
                <li>
                  {{ $t("page_profile.form.age") }}
                  <span class="pull-right"
                    >{{ model.age }} {{ $t("page_profile.form.years") }}</span
                  >
                </li>
                <li>
                  {{ $t("page_profile.form.status") }}
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
                    <span v-else>{{ $t("status." + model.status) }}</span>
                  </div>
                </li>
                <li>
                  {{ $t("page_profile.form.location") }}
                  <span class="pull-right">{{ model.city }}</span>
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
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
        profession: "",
        overview: "",
        email: "",
        phone: "",
        age: null,
        registeredAt: "",
        location: "",
        status: "available",
        image: ""
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
          this.model.fullName = this.getFullName(res);
          this.model.profession =
            res.profession && res.profession[0] ? res.profession[0].name : "";
          this.model.overview = res.overview ? res.overview : "";
          this.model.email = res.email;
          this.model.phone = res.phone;
          this.model.status = res.status;
          this.model.age = this.getAge(res.birthday);
          this.model.registeredAt = this.getDateString(res.createdAt);
          this.model.image = res.image;
          this.model.city = res.city;
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
        this.$store.dispatch("updateShowSuccessModal", true);
        this.$store.dispatch("updateSuccessModalContent", {
          title: this.$t("page_profile.modal.change.title"),
          subTitle: this.$t("page_profile.modal.change.sub_title"),
          button: this.$t("page_profile.modal.change.continue")
        });

        this.fetchProfile();
      });
    }
  }
};
</script>
