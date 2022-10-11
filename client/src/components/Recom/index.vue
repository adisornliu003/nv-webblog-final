<template>
	<div style="border:20px solid #99CCFF">
		<h2> ร้านแนะนำ</h2>
		
		<h4>จํานวน {{ recom.length }} ร้าน</h4>
			
		<p>ชื่อร้าน: {{ recom.title }}</p>
			
			<p>ที่อยู่: {{ recom.category }}</p>
			<p>ประเภทร้าน: {{ recom.status }}</p>
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
}
	
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
