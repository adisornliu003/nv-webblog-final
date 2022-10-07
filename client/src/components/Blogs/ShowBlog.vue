<template>
	<div>
		<h1>ร้านที่แสดง</h1>
		<p>id: {{ blog.id }}</p>
		<p>ชิ่อร้าน: {{ blog.title }}</p>
		<p>ข้อมูล: {{ blog.content }}</p>
		<p>หมวดหมู่: {{ blog.category }}</p>
		<p>สถานะ: {{ blog.status }}</p>
		<p>
			<button v-on:click="navigateTo('/blog/edit/' + blog.id)">
				แก้ไขร้านแนะนำ
			</button>
			<button v-on:click="navigateTo('/blogs')">กลับ</button>
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
