<template>
	<div style="border:20px solid #99CCFF">
		<h2> จัดการข้อมูลร้านทั้งหมด</h2>
		
		<h4>จํานวนร้าน {{ blogs.length }} ร้าน</h4>
		<p align = "right"><button class="button1"  v-on:click="navigateTo('/blog/create')">เพิ่มร้านแนะนำ</button></p><br>
		<div v-for="blog in blogs" v-bind:key="blog.id">
		<center>	
			<table style="border:1px dashed #CD00CD ; background-color: #CD00CD " cellspacing="3" cellpadding="3" width="400"><tr><td> <table style="border:1px dashed #E066FF ; background-color: #E066FF " cellspacing="5" cellpadding="3" width="400"><tr><td style="background-color: #ffffff">
       <center> <div v-for="user in users" v-bind:key="user.id">
        <p>id: {{ user.id }}</p>
        <p>ชื่อ-นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
        <p>Email: {{ user.email }}</p><hr />
      </div></center>
        
</td></tr></table></td></tr></table><br>
		<p>ชื่อร้าน: {{ blog.title }}</p>
			
			<p>ที่อยู่: {{ blog.category }}</p>
			<p>ประเภทร้าน: {{ blog.status }}</p>
			<p align = "right">
				<button class="button1" v-on:click="navigateTo('/blog/' + blog.id)">ดูข้อมูล</button>
				<button class="button2" v-on:click="navigateTo('/blog/edit/' + blog.id)">
					แก้ไข
				</button>
				<button class="button3" v-on:click="deleteBlog(blog)">ลบ</button>
			</p>
			<hr /></center>
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
