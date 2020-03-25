<template>
	<div id="page_language">
		<h1>Languages</h1>
		<hr>
		<div class="container-fluid">
			<b-row>
				<b-col md="6">
					<v-jsoneditor v-model="EnglishJson" height="calc(100vh - 200px)"/>
				</b-col>
				<b-col md="6">
					<v-jsoneditor v-model="DutchJson" height="calc(100vh - 200px)"/>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'
import EnglishJson from '@/plugins/i18n/languages/English'
import DutchJson from '@/plugins/i18n/languages/Dutch'

  export default {
    name: "Language",
    components: {
      VJsoneditor
    },
		data() {
      return {
        EnglishJson,
        DutchJson
			}
		}
  }
</script>

<style scoped>
</style>