<template>
  <div>
    <div class="input-group">
      <input
        :id="id || field"
        :class="{ 'is-invalid': invalid, 'has-value': input }"
        :name="field"
        :type="type"
        :placeholder="label"
        :required="required"
        :autofocus="autofocus"
        autocomplete="off"
        v-model="input"
        @keyup="event => this.$emit('keyup', event)"
        :data-vat="dataVat"
      />
      <label :for="id || field">{{ label }}</label>
      <span class="input-icon " v-if="iconClassName"
        ><i class="hiway-crm-icon" :class="iconClassName"></i
      ></span>
      <div class="invalid-feedback" v-if="invalid">
        {{ $t(error) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: [
    "id",
    "field",
    "label",
    "type",
    "required",
    "error",
    "value",
    "autofocus",
    "dataVat",
    "iconClassName"
  ],
  data() {
    return {
      //
    };
  },
  computed: {
    input: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    invalid() {
      return this.error && this.input === this.value;
    }
  }
};
</script>

<style scoped lang="scss">
.input-group {
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
}

input {
  &::-webkit-input-placeholder {
    color: rgba(104, 104, 104, 0.7);
  }

  /* WebKit, Blink, Edge */
  &:-moz-placeholder {
    color: rgba(104, 104, 104, 0.7);
  }

  /* Mozilla Firefox 4 to 18 */
  &::-moz-placeholder {
    color: rgba(104, 104, 104, 0.7);
  }

  /* Mozilla Firefox 19+ */
  &:-ms-input-placeholder {
    color: rgba(104, 104, 104, 0.7);
  }

  /* Internet Explorer 10-11 */
  &::-ms-input-placeholder {
    color: rgba(104, 104, 104, 0.7);
  }

  /* Microsoft Edge */
  color: var(--cobalt-blue);
  background: white;
  border: none;
  border-bottom: 1px solid var(--white-four);
  box-sizing: border-box;
  font-size: 21px;
  outline: none;
  line-height: 21px;
  padding: 13px 0;
  width: 100%;
}

input::placeholder {
  color: transparent !important;
}

input:not(:placeholder-shown) {
  /*padding: 34px 0 13px;*/
}

label {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 13px 0;
  color: #a3a3a3;
  font-size: 21px;
  line-height: 21px;
  font-weight: 300;
  pointer-events: none;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;

  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

input:not(:placeholder-shown) + label {
  position: absolute;
  top: -34px;
}

.invalid-feedback {
  margin-top: 10px;
  display: block;
  color: var(--lipstick-red);
}

.is-invalid {
  border-color: var(--lipstick-red);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

/* Fallback for Edge */
@supports (-ms-ime-align: auto) {
  label {
    display: none;
  }
  input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  label {
    display: none;
  }
  input:-ms-input-placeholder {
    color: #777;
  }
}

.input-icon {
  position: absolute;
  font-size: 24px;
  line-height: 24px;
  top: 13px;
  right: 0;
  color: var(--cobalt-blue);
}
</style>
