<template>
    <v-container class="pt-16">
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>
                        Create a Poll
                    </v-card-title>
                    <v-card-subtitle>Add an image for other users to vote on if they love, like, or dislike the doggy</v-card-subtitle>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="addpoll" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Add image URL" v-model="poll.image"  prepend-icon="mdi-image" :rules="rules"></v-text-field>                        
                     <div class="text-center">
                            <v-btn type="submit" class="mt-3"  color="success">Add Poll</v-btn>
                       </div>
                    </v-form>
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
                poll: {
                    image: "",
                },
            }
        },
        methods: {

            async addpoll(){
                let poll = {
                    image: this.poll.image,
                }
                if(this.$refs.form.validate()){
                    const response = await API.addPoll(poll)
                    this.$router.push({ name: 'polling', params: { message: response.message } })
                }
            }
        }
    }
</script>
