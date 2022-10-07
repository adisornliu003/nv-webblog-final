<template>
	<div>
		<h2> ร้านทั้งหมด</h2>
		<p><button v-on:click="logout">ล็อกเอาท์</button></p>
		<h4>จํานวนร้านแนะนำ {{ blogs.length }}</h4>
		<p><button v-on:click="navigateTo('/blog/create')">สร้าง blog</button></p>
		<div v-for="blog in blogs" v-bind:key="blog.id">
			<p>id: {{ blog.id }}</p>
			<p>ชื่อร้าน: {{ blog.title }}</p>
			<p>ข้อมูล: {{ blog.content }}</p>
			<p>หมวดหมู่: {{ blog.category }}</p>
			<p>สถานะ: {{ blog.status }}</p>
			<p>
				<button v-on:click="navigateTo('/blog/' + blog.id)">ดู blog</button>
				<button v-on:click="navigateTo('/blog/edit/' + blog.id)">
					แก้ไขร้าน
				</button>
				<button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
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
