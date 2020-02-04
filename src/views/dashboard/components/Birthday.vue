<template>
  <b-card id="upcoming_birthdays">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("UPCOMING_BIRTHDAYS") }}</h2>
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hideBirthdayCard"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </template>
    <div>
      <ul class="custom-list">
        <a href="/admin/dashboard/profile/1">
          <li class="d-flex responsive align-items-center">
            <div class="flex-1">
              <div class="d-flex responsive align-items-center">
                <div class="rounded-circle mr-3">
                  <img
                    src="@/assets/image/avatar_nick.png"
                    style="width:65px"
                  />
                </div>
                <div>
                  Ton Jansen
                  <br />
                  <small>Product owner</small>
                </div>
              </div>
            </div>
            <div>
              03-08-1960
            </div>
          </li>
        </a>
      </ul>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "birthday",
  methods: {
    hideBirthdayCard: function() {
      this.$emit("hide-birthday-card");
    }
  }
};
</script>
