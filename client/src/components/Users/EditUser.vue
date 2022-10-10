<template>
<div>
    <h1>แก้ไขผู้ใช้</h1>
    <form v-on:submit.prevent = "editUser">
        <p>ชื่อ: <input type="text" v-model="user.name"></p>
        <p>นามกสุล: <input type="text" v-model="user.lastname"></p>
        <p>email: <input type="text" v-model="user.email"></p>
        <p>password: <input type="text" v-model="user.password"></p>
        <p><button class="button2" type="submit">แก้ไข้</button></p>
    </form>
    <hr>
    <div>
        <p>ชื่อ: {{user.name}}</p>
        <p>นามกสุล: {{user.lastname}}</p>
        <p>email: {{user.email}}</p>
        
    </div>
</div>
</template>
<script>import UsersService from '@/services/UsersService'

export default {
    data(){
        return{
            user:{
                name: '',
                lastname: '',
                email: '',
                password: '',
                status: 'active'
            }
        }
    },
    methods:{
        async editUser(){
            try{
                await UsersService.put(this.user)
                this.$router.push({
                    name: 'users'
                })

            }catch(error){
                console.log(error)
            }
        }
    }, 
    async created(){
        try{
            let userId = this.$route.params.userId
            this.user = (await UsersService.show(userId)).data
        }catch(error){
            console.log(error)
        }
    }
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