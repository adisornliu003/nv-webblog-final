<template>
  <div style="border:20px solid #99CCFF">
    <h1> ผู้ใช้ทั้งหมด</h1>
    <div v-if="users.length">
      <h4>จำนวนผู้ใช้งาน {{ users.length }}</h4>
      <p>
        <button class="button1" v-on:click="navigateTo('/user/create')">
            สร้างผู้ใช้งาน
          </button>
      </p>
      <div v-for="user in users" v-bind:key="user.id">
        <p>id: {{ user.id }}</p>
        <p>ชื่อ-นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
        <p>Email: {{ user.email }}</p>
        
        
        <hr />
      </div>
      <p><button class="button3" v-on:click="logout">ล็อกเอาท์</button></p>
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user){
      let result = confirm("Want to delete")
      if(result){
        try{
          await UsersService.delete(user)
          this.refreshData()
        }catch(error){
          console.log(error)
        }
      }
    },
    async refreshData(){
      this.users = (await UsersService.index()).data
    },
    logout(){
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setUser',null)

      this.$router.push({
        name: 'login'
      })
    }
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