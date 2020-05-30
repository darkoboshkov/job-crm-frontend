<template>
	<div id="page_statistics" class="dashboard-content">
		<user-accesses />
	</div>
</template>

<script>
  import UserAccesses from "./UserAccesses"

  export default {
    name: "Index",
    components: {
      UserAccesses
    }
  }
</script>

<style scoped>

</style>
