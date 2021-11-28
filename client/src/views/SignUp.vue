<template>
    <v-container class="pt-16">
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>
                        Sign Up for DOGGO!
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="login" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Username" v-model="user.username"  prepend-icon="mdi-account" :rules="rules"></v-text-field>
                        <v-text-field label="Email" v-model="user.email"  prepend-icon="mdi-mail" :rules="rules"></v-text-field>
                        
                        <v-text-field  type="password" v-model="user.password" label="Password"  prepend-icon="mdi-lock" :rules="rules"></v-text-field>
                     <div class="text-center">
                            <v-btn type="submit" class="mt-3"  color="success">Register</v-btn>
                       </div>
                    </v-form>
                    <div class="text-center">
                        <v-btn  href="/signin" text  class="mt-3 text-center" color="primary" >Go to Login</v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    import API from '../api'
    export default {
        data(){
            return{
                rules: [(value)=>!!value || "this field is required!"],
                user: {
                    username: "",
                    email: "",
                    password: "",
                },
            }
        },
        methods: {

            async login(){
                let user = {
                    'username': this.user.username,
                    'email': this.user.email,
                    'password': this.user.password
                }
                if(this.$refs.form.validate()){
                    const response = await API.addUser(user)
                    this.$router.push({ name: 'signin', params: { message: response.message } })
                }
            }
        }
    }
</script>
