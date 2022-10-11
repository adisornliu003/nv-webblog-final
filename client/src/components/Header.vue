<template>
	
	<div >
		
		<div class="nv-navbar">
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
			
			<ul class="nav">
				
				<li><router-link :to="{ name: 'blogs' }">เพิ่มข้อมูล</router-link></li>
				<li><router-link :to="{ name: 'users' }">ผู้ใช้</router-link></li>
				<li><router-link :to="{ name: 'login' }">ล็อกอิน</router-link></li>
				
				
			</ul>
			<div class="clearfix" />
		</div>
	</div>
</template>
<script>
export default {};
</script>
<style scoped>
.nv-navbar {
	background-color: rgb(255, 116, 130);
	width: 100%;
	padding: 10px 0px 10px 0px;
}
.nv-navbar .nav {
	list-style: none;
	margin: 0;
	padding: 0;
	float: left;
}
.nv-navbar .nav li {
	float: left;
}
.nv-navbar .nav li a {
	padding: 10px;
	text-decoration: none;
	color: rgb(0, 0, 0);
	font-weight: bold;
}
.nv-navbar .nav li a:hover {
	padding: 10px;
	text-decoration: none;
	color: darkslategrey;
}
.nv-navbar .nav li a.router-link-active {
	background-color: rgb(250, 185, 196);
	color: darkslategrey;
}
.clearfix {
	clear: left;
}
</style>

