<template>
	<div style="border:20px solid #99CCFF">
		<h1>ข้อมูลร้านค้า</h1>
		<p>ชิ่อร้าน: {{ blog.title }}</p>
		
		<p>ที่อยู่: {{ blog.category }}</p>
		<p>ประเภทร้าน: {{ blog.status }}</p>
		<p>
			<button class="button2" v-on:click="navigateTo('/blog/edit/' + blog.id)">
				แก้ไขร้านแนะนำ
			</button>
			<button class="button1" v-on:click="navigateTo('/blogs')">กลับ</button>
		</p>
	</div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
export default {
	data() {
		return {
			blog: null,
		};
	},
	async created() {
		try {
			let blogId = this.$route.params.blogId;
			this.blog = (await BlogsService.show(blogId)).data;
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
