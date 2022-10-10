<template>
	<div>
		<h2> ร้านทั้งหมด</h2>
		
		<h4>จํานวนร้านแนะนำ {{ blogs.length }}</h4>
		<p><button class="button1"  v-on:click="navigateTo('/blog/create')">เพิ่มร้านแนะนำ</button></p>
		<div v-for="blog in blogs" v-bind:key="blog.id">
			
			<p>ชื่อร้าน: {{ blog.title }}</p>
			
			<p>ที่อยู่: {{ blog.category }}</p>
			<p>ประเภทร้าน: {{ blog.status }}</p>
			<p>
				<button class="button1" v-on:click="navigateTo('/blog/' + blog.id)">ดูข้อมูล</button>
				<button class="button2" v-on:click="navigateTo('/blog/edit/' + blog.id)">
					แก้ไข
				</button>
				<button class="button3" v-on:click="deleteBlog(blog)">ลบ</button>
			</p>
			<hr />
		</div>
	</div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
export default {
	data() {
		return {
			blogs: [],
		};
	},
	async created() {
		this.blogs = (await BlogsService.index()).data;
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
		async deleteBlog(blog) {
			let result = confirm("Want to delete?");
			if (result) {
				try {
					await BlogsService.delete(blog);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
		async refreshData() {
			this.blogs = (await BlogsService.index()).data;
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
