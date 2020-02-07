<template>
  <b-card id="messages">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("MESSAGES") }}</h2>
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hideMessageCard"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </template>
    <div>
      <ul class="custom-list">
        <li>
          <p>
            Werkgever A
          </p>
          <div class="d-flex">
            <small class="flex-1">
              Je loon gegevens zijn gewijgd. Zie de veranderingen in je
              werkgevers informatie.
            </small>
            <i class="hiway-crm-icon icon-more-vertical" />
          </div>
        </li>
        <li>
          <p>
            Werkgever A
          </p>
          <div class="d-flex">
            <small class="flex-1">
              Je loon gegevens zijn gewijgd. Zie de veranderingen in je
              werkgevers informatie.
            </small>
            <i class="hiway-crm-icon icon-more-vertical" />
          </div>
        </li>
        <li>
          <p>
            Werkgever A
          </p>
          <div class="d-flex">
            <small class="flex-1">
              Je loon gegevens zijn gewijgd. Zie de veranderingen in je
              werkgevers informatie.
            </small>
            <i class="hiway-crm-icon icon-more-vertical" />
          </div>
        </li>
      </ul>
      <div class="mt-3">
        <a href="javascript:void(0)">
          <i class="hiway-crm-icon icon-angle-right mr-2" />
          {{ $t("VIEW_ALL") }}
        </a>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "message",
  methods: {
    hideMessageCard: function() {
      this.$emit("hide-message-card");
    }
  }
};
</script>
