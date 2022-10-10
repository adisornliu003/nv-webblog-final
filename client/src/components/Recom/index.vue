<template>
	<div style="border:20px solid #99CCFF">
		<h2> ร้านแนะนำ</h2>
		
		<h4>จํานวน {{ recom.length }} ร้าน</h4>
		<p align = "right"><button class="button1"  v-on:click="navigateTo('/recom/create')">เพิ่มร้านแนะนำ</button></p><br>
		<div v-for="recom in recoms" v-bind:key="recom.id">
			
		<p>ชื่อร้าน: {{ recom.title }}</p>
			
			<p>ที่อยู่: {{ recom.category }}</p>
			<p>ประเภทร้าน: {{ recom.status }}</p>
			<p>
				<button class="button1" v-on:click="navigateTo('/recom/' + recom.id)">ดูข้อมูล</button>
				<button class="button2" v-on:click="navigateTo('/recom/edit/' + recom.id)">
					แก้ไข
				</button>
				<button class="button3" v-on:click="deleteBlog(recom)">ลบ</button>
			</p>
			<hr />
		</div>
	</div>
</template>
<script>
import RecomService from "@/services/RecomService";
export default {
	data() {
		return {
			recom: [],
		};
	},
	async created() {
		this.recom = (await RecomService.index()).data;
	},
	methods: {
		logout() {
			this.$store.dispatch("setToken", null);
			this.$store.dispatch("setBlog", null);
			this.$router.push({
				name: "login",
			});
		},
		navigateTo(route) {
			this.$router.push(route);
		},
		async deleteRecom(recom) {
			let result = confirm("Want to delete?");
			if (result) {
				try {
					await RecomService.delete(recom);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
		async refreshData() {
			this.recom = (await RecomService.index()).data;
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
