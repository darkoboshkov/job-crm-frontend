<template>
	<div id="page_language">
		<h1>Languages</h1>
		<hr>
		<div class="container-fluid">
			<b-row>
				<b-col md="6">
					<p class="text-center color-gray">Current Language</p>
					<vue-json-editor v-model="EnglishJson" height="calc(100vh - 200px)"/>
				</b-col>
				<b-col md="6">
					<p class="text-center color-gray">Current Language</p>
					<vue-json-editor v-model="DutchJson" height="calc(100vh - 200px)"/>
				</b-col>
			</b-row>
			<b-row class="mt-5">
				<b-col md="6">
					<p class="text-center color-gray">Your Language</p>
					<vue-json-editor v-model="oldEnglishData" height="calc(100vh - 200px)"/>
				</b-col>
				<b-col md="6">
					<p class="text-center color-gray">Your Language</p>
					<vue-json-editor v-model="oldDutchData" height="calc(100vh - 200px)"/>
				</b-col>
			</b-row>
			<b-row class="mt-5">
				<b-col md="6">
					<p class="text-center color-gray">Change Status</p>
					<div class="change-box">
						<vue-json-compare
								v-if="Object.keys(oldEnglishData).length > 0"
								:oldData="oldEnglishData"
								:newData="EnglishJson"
						/>
					</div>
				</b-col>
				<b-col md="6">
					<p class="text-center color-gray">Change Status</p>
					<div class="change-box">
						<vue-json-compare
								v-if="Object.keys(oldDutchData).length > 0"
								:oldData="oldDutchData"
								:newData="DutchJson"
						/>
					</div>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script>
import vueJsonEditor from 'v-jsoneditor';
import vueJsonCompare from 'vue-json-compare';
import EnglishJson from '@/plugins/i18n/languages/English';
import DutchJson from '@/plugins/i18n/languages/Dutch';

  export default {
    name: "Language",
    components: {
      vueJsonEditor,
      vueJsonCompare
    },
		data() {
      return {
        EnglishJson,
        DutchJson,
				oldEnglishData: {},
				oldDutchData: {}
			}
		}
  }
</script>

<style scoped>
</style>