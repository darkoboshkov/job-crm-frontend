<template>
  <div class="search-bar">
    <i class="hiway-crm-icon icon-search" />
    <input v-model="search" placeholder="Search..." />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style scoped lang="scss">
.search-bar {
  align-items: center;
  display: flex;
}

.icon-search {
  font-size: 20px;
  color: #c5c5c5;
}

input {
  &::-webkit-input-placeholder {
    color: var(--white-two);
  }

  /* WebKit, Blink, Edge */
  &:-moz-placeholder {
    color: var(--white-two);
  }

  /* Mozilla Firefox 4 to 18 */
  &::-moz-placeholder {
    color: var(--white-two);
  }

  /* Mozilla Firefox 19+ */
  &:-ms-input-placeholder {
    color: var(--white-two);
  }

  /* Internet Explorer 10-11 */
  &::-ms-input-placeholder {
    color: var(--white-two);
  }

  border: none;
  color: var(--cobalt-blue);
  font-size: 18px;
  margin-left: 20px;
  outline: none;
  padding: 13px 0;
  width: 100%;
}
</style>
