<template>
  <v-container>
    <v-row>
        <v-col align="center">
            <h1 class="text-h1">Account</h1>
            <v-card>
                <v-card-text>
                    <p>Username: {{accountInfo.username}}</p>
                    <p>Email: {{accountInfo.email}}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="updateIt = true" color="teal accent-4">Update Email</v-btn>
                    <v-btn @click="deleteIt = true" color="red">Delete</v-btn>
                </v-card-actions>
                    <v-expand-transition>
                        <v-card
                            v-if="updateIt"
                            class="transition-fast-in-fast-out v-card--reveal"
                            style="height: 100%;"
                        >
                            <v-card-text class="pb-0">
                            <p class="text-h4 text--primary">
                                Update Email
                            </p>
                            <v-form ref="form" @submit.prevent="updateAccount" class="pa-5" enctype="multipart/form-data">
                                <v-text-field label="emails" v-model="accountInfo.email"  prepend-icon="mdi-email" :rules="rules"></v-text-field>
                            <div class="text-center">
                                 <v-btn type="submit" class="mt-3"  color="success">Update</v-btn>
                            </div>
                            </v-form>
                            
                                             
                            </v-card-text>
                            <v-card-actions class="pt-0">
                            <v-btn
                                text
                                color="teal accent-4"
                                @click="updateIt = false"
                            >
                                cancel
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expand-transition>
                    <v-expand-transition>
                        <v-card
                            v-if="deleteIt"
                            class="transition-fast-in-fast-out v-card--reveal"
                            style="height: 100%;"
                        >
                            <v-card-text class="pb-0">
                            <p class="text-h4 text--primary">
                                Are you sure you want to delete your account? 
                            </p>
                            <p class="subtitle-2">This cannot be undone!</p>
                            <v-btn color="red" @click="deleteUserProfile()">Yes!</v-btn>

                            </v-card-text>
                            <v-card-actions class="pt-0">
                            <v-btn
                                text
                                color="teal accent-4"
                                @click="deleteIt = false"
                            >
                                Cancel
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expand-transition>
            </v-card>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '../api'
  export default {
    data: () => ({ 
        loggedIn: false,
        accountInfo: '',
        updateIt: false,
        deleteIt: false,
        rules: [(value)=>!!value || "this field is required!"],
        accountInfo: {
            email: "",
        },
      }),
     async created(){
        if(this.$cookies.get("token")){
            this.loggedIn = true
        }else{
            this.loggedIn = false
            this.$router.push({name: 'signin'})
        }
        let response = await API.getCurrentUser()
        if(response){
            this.accountInfo = response
            response = await API.getUserByID(this.accountInfo._id)
                if(response){
                    this.accountInfo = response

                }
        }

     },methods:{
        async deleteUserProfile(){
            const response = await API.deleteUser(this.accountInfo._id)
            if(response){
                this.$cookies.remove("token")
                this.$router.push({name: 'home'})
                this.$router.go()
            }


        },
        async updateAccount(){
            let user = {
                'email': this.accountInfo.email,
            }
            if(this.$refs.form.validate()){
                let response = await API.updateUser(this.accountInfo._id, user)

             response = await API.getUserByID(this.accountInfo._id)
                if(response){
                    this.accountInfo = response
                    this.$router.push({ name: 'home', params: { message: response.message } })
                    this.$router.go()
                }
            }
        }
     }

  }
</script>
