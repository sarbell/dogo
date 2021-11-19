<template>
    <v-container class="pt-16">
        <v-alert class="mt-16" border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
            {{this.$route.params.message}}
        </v-alert>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>
                        You're almost to more dogs! Sign in here!
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="login" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Username" v-model="user.username"  prepend-icon="mdi-account" :rules="rules"></v-text-field>
                        <v-text-field  type="password" v-model="user.password" label="Password"  prepend-icon="mdi-lock" :rules="rules"></v-text-field>
                       <div class="text-center">
                            <v-btn type="submit" class="mt-3"  color="success">Sign in</v-btn>
                       </div>
                    </v-form>
                    <div class="text-center">
                        <v-btn  href="/signup" text  class="mt-3 text-center" color="primary" >Need to Sign up?</v-btn>
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
                    password: "",
                },
            }
        },
        methods: {

            async login(){
                let user = {
                    'username': this.user.username,
                    'password': this.user.password
                }
                if(this.$refs.form.validate()){
                    const response = await API.loginUser(user)
                    this.$router.push({ name: 'home', params: { message: response.message } })
                    this.$router.go()
                }
            }
        }
    }
</script>
