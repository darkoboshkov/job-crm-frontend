<template>
	<div id="page_statistics" class="dashboard-content">
		<user-accesses />
		<email-histories class="mt-5"/>
	</div>
</template>

<script>
  import UserAccesses from "./UserAccesses"
  import EmailHistories from "./EmailHistories"

  export default {
    name: "Index",
    components: {
      EmailHistories,
      UserAccesses
    }
  }
</script>

<style scoped>

</style>
