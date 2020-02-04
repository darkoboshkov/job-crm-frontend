<template>
  <b-card id="to_do_list">
    <template v-slot:header>
      <div class="row">
        <div class="col-md-6">
          <h2 class="m-0">{{ $t("TO_DO_LIST_TODAY") }}</h2>
        </div>
        <div class="col-md-6">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hideTodoCard"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </template>
    <div>
      <ul class="custom-list">
        <li class="d-flex responsive align-items-center">
          <div class="flex-1">
            <b-form-checkbox value="accepted" unchecked-value="not_accepted">
              Vragen lijst 18-05-2019
            </b-form-checkbox>
          </div>
          <i class="icon-more-vertical" />
        </li>
        <li class="d-flex responsive align-items-center">
          <div class="flex-1">
            <b-form-checkbox value="accepted" unchecked-value="not_accepted">
              Vragen lijst 18-05-2019
            </b-form-checkbox>
          </div>
          <i class="icon-more-vertical" />
        </li>
        <li class="d-flex responsive align-items-center">
          <div class="flex-1">
            <b-form-checkbox value="accepted" unchecked-value="not_accepted">
              Vragen lijst 18-05-2019
            </b-form-checkbox>
          </div>
          <i class="icon-more-vertical" />
        </li>
      </ul>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "todo",
  methods: {
    hideTodoCard: function() {
      this.$emit("hide-todo-card");
    }
  }
};
</script>
