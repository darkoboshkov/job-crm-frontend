<template>
  <div id="page_profile" class="dashboard-content">
    <div class="container-fluid">
      <a href="javascript:void(0)" class="back" @click.prevent="$router.go(-1)">
        <i class="icon-angle-left ml-2" />
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
            <i class="icon-pencil ml-2" />
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
                  <b-form-input v-if="editProfile" v-model="model.email" />
                  <span v-else>{{ model.email }}</span>
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
                  <b-form-input v-if="editProfile" v-model="model.phone" />
                  <span v-else>{{ model.phone }}</span>
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
                  <span class="pull-right">08-09-2019</span>
                </li>
                <li>{{ $t("AGE") }} <span class="pull-right">29 jaar</span></li>
                <li>
                  {{ $t("STATUS") }} <span class="pull-right">Beschikbaar</span>
                </li>
                <li>
                  {{ $t("PLACE") }} <span class="pull-right">Arnhem</span>
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
                      style="width: 100px; justify-content: center;"
                    >
                      {{ $t("UPLOAD") }}
                      <i class="icon-upload ml-2" />
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
                    <i class="icon-more-vertical mr-2" />
                    <i class="icon-bin" />
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
                    <i class="icon-more-vertical mr-2" />
                    <i class="icon-bin" />
                  </div>
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
export default {
  name: "ProfileView",
  props: {
    mode: {
      default: function() {
        return "view";
      }
    },
    id: {
      default: function() {
        return "0";
      }
    }
  },
  data() {
    return {
      editProfile: this.mode === "edit",
      model: {
        fullName: this.id !== "0" ? "Magalie Lindeboom" : "",
        position: this.id !== "0" ? "Visual Designer" : "",
        overview:
          this.id !== "0"
            ? "Hanc ego assentior, cum teneam sententiam, quid et iusto odio dignissimos ducimus, qui. Quae fuerit causa, nollem me ab eo est consecutus? laudem et dolore suo. Sed ut summum bonum esse albam, dulce mel quorum facta quem modo ista. Filium morte multavit si sine dubio praeclara sunt, explicabo nemo enim ipsam per. Meer +"
            : "",
        email: this.id !== "0" ? "michael@hotmail.com" : "",
        phone: this.id !== "0" ? "+31 653724131" : ""
      }
    };
  },
  methods: {
    onEditProfile() {
      if (!this.editProfile) {
        this.editProfile = true;
      } else {
        this.editProfile = false;
      }
    }
  }
};
</script>

<style scoped></style>
