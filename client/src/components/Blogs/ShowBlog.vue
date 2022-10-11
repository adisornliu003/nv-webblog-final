<template>
	<div style="border:20px solid #99CCFF">
								<div class="blog-tab">
									<transition name="fade">
										<div
											class="thumbnail-pic"
											v-if="blog.thumbnail != 'null'"
											align="center"
										>
											<img :src="BASE_URL + blog.thumbnail" alt="thumbnail" width="120" />
										</div>
									</transition>
								</div>
		
		<h1>ข้อมูลร้านค้า</h1>
		<p>ชิ่อร้าน: {{ blog.title }}</p>
		
		<p>ที่อยู่: {{ blog.category }}</p>
		<p>ประเภทร้าน: {{ blog.status }}</p>
		<p>
			
			<button class="button1" v-on:click="navigateTo('/blogs')">กลับ</button>
		</p>
		
								<br />
	</div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
export default {
	
	data() {
		return {
			blog: null,
			BASE_URL: "http://localhost:8081/assets/uploads/",
			
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
