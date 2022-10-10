<template>
	<div style="border:20px solid #99CCFF">
		<h1>ข้อมูลร้านค้า</h1>
		<p>ชิ่อร้าน: {{ recom.title }}</p>
		
		<p>ที่อยู่: {{ recom.category }}</p>
		<p>ประเภทร้าน: {{ recom.status }}</p>
		<p>
			
			<button class="button1" v-on:click="navigateTo('/recom')">กลับ</button>
		</p>
	</div>
</template>
<script>
import RecomService from "@/services/RecomService";
export default {
	data() {
		return {
			recom: null,
		};
	},
	async created() {
		try {
			let recomId = this.$route.params.recomId;
			this.recom = (await RecomService.show(recomId)).data;
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route);
		},
	},
};
</script>
<style scoped>
</style>
<style>

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50; /* Green */
}
.button2 {
  background-color: white;
  color: black;
  border: 2px solid #e1ff34; /* Green */
}
.button3 {
  background-color: white;
  color: black;
  border: 2px solid #ff0000; /* Green */
}
.button1:hover {
  background-color: #caffd2; /* Green */
  color: white;
}
.button2:hover {
  background-color: #faffb7; /* Green */
  color: white;
}
.button3:hover {
  background-color: #ff6c6c; /* Green */
  color: white;
}
</style>
