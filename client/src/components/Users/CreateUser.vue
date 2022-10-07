<template>
<div>
    <h1>สร้างผู้ใช้</h1>
    <form v-on:submit.prevent = "createUser">
        <p>ชื่อ: <input type="text" v-model="user.name"></p>
        <p>นามสกุล: <input type="text" v-model="user.lastname"></p>
        <p>email: <input type="text" v-model="user.email"></p>
        <p>password: <input type="text" v-model="user.password"></p>
        <p><button type="submit">สร้าง</button></p>
    </form>
    <hr>
    <div>
        <p>ชื่อ: {{user.name}}</p>
        <p>นามกสุล: {{user.lastname}}</p>
        <p>email: {{user.email}}</p>
        <p>password: {{user.password}}</p>
    </div>
</div>
</template>
<script>
import UsersService from '@/services/UsersService'

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
        async createUser(){
            try{
                await UsersService.post(this.user)
                this.$router.push({
                    name: 'users'
                })
            }catch(error){
                console.log(error)
            }
        }
    }    
}
</script>
<style scoped>


</style>