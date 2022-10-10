<template>
  <div style="border:20px solid #99CCFF">
    <h1>แสดงผู้ใช้</h1>
    <p>id: {{ user.id }}</p>
    <p>ชื่อ - นามสกุล {{ user.name }} - {{ user.lastname }}</p>
    <p>email: {{ user.email }}</p>
  </div>
</template>
<script>
import UserService from "@/services/UsersService";
export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UserService.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
</style>