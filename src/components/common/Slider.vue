<template>
  <div>
    <div class="d-flex">
      <label class="slider-label">
        {{ label }}
      </label>
      <input type="text" v-model="inputValue" />
    </div>

    <input type="range" v-model="value" min="1" max="100" />
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: ["label", "value", "unit"],
  computed: {
    inputValue: function() {
      return this.value + this.unit;
    }
  }
};
</script>

<style scoped>
label {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
  min-width: min-content;
  margin-right: 1rem;
}

input[type="text"] {
  width: 50px;
  color: var(--cobalt-blue);
}

input[type="range"] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type="range"]:focus {
  outline: none; /* Removes the blue border. */
}

input[type="range"]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}

/* Special styling for WebKit/Blink */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 5px solid var(--cobalt-blue);
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  margin-top: -2.2px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  /*box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d; !* Add cool effects to your sliders! *!*/
}

/* All the same stuff for Firefox */
input[type="range"]::-moz-range-thumb {
  /*box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;*/
  border: 5px solid var(--cobalt-blue);
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}

/* All the same stuff for IE */
input[type="range"]::-ms-thumb {
  /*box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;*/
  border: 5px solid var(--cobalt-blue);
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  /*box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;*/
  background: #e6e9ee;
  border-radius: 4px;
  border: 0;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #e6e9ee;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  /*box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;*/
  background: #e6e9ee;
  border-radius: 4px;
  border: 0;
}

input[type="range"]::-ms-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #e6e9ee;
  border: 0;
  border-radius: 4px;
  /*box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;*/
}
input[type="range"]:focus::-ms-fill-lower {
  background: #e6e9ee;
}
input[type="range"]::-ms-fill-upper {
  background: #e6e9ee;
  border: 0;
  border-radius: 4px;
  /*box-shadow: 1px 1px 1px #000000, 0 0 1px #0d0d0d;*/
}
input[type="range"]:focus::-ms-fill-upper {
  background: #e6e9ee;
}
</style>
