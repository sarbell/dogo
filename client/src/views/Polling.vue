<template>
  <v-container>
      <v-row>
          <v-col align="end">
            <v-btn icon v-if="loggedIn" :to="{name: 'vote'}">
                <v-icon  color="success"> mdi-plus</v-icon>
                Add Poll
            </v-btn>
          </v-col>
      </v-row>
    <v-row>
        <v-col align="center">
            <h1 class="text-h1">Polls</h1>
       </v-col>
    </v-row>
    <v-row>
        <v-col v-for="poll in polls" :key="poll._id">
             <v-card 
                
                class="mx-auto"
                max-width="400"
            >
                <v-img
                class="white--text align-end"
                height="300px"
                :src="`${poll.image}`"
                >
                </v-img>

                <v-card-subtitle class="pb-0">
                Created by: <span>{{getUserName(poll.user)}}</span> 
                </v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-text class="text--primary">
                    <h3 class="font-weight-light text-uppercase">Cast your vote</h3>
                </v-card-text>
                <v-card-actions> 
                    <v-row>
                        <v-col>
                            <v-tooltip right>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn icon @click="voteLove(poll._id)">
                                        <v-icon large color="pink" v-bind="attrs" v-on="on">
                                        mdi-heart
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Cutest dog ever!</span>
                            </v-tooltip>
                        </v-col>
                        <v-col>
                            <v-tooltip right>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn icon @click="voteLike(poll._id)">
                                        <v-icon large color="blue" v-bind="attrs" v-on="on">mdi-thumb-up</v-icon> 
                                    </v-btn>
                                </template>
                                <span>Pretty cute dog!</span>
                            </v-tooltip>
                        </v-col>
                        <v-col>
                            <v-tooltip left>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn icon @click="voteDislike(poll._id)">
                                    <v-icon large color="blue-grey darken-3" v-bind="attrs" v-on="on">mdi-thumb-down</v-icon> 
                                    </v-btn>
                                </template>
                                <span>Nah, don't like this one. Sorry pooch!</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
    
                </v-card-actions>
                <v-card-actions>
                <v-row>
                        <v-col>
                            Love: {{poll.love}}
                        </v-col>
                        <v-col>
                            Like: {{poll.like}}
                        </v-col>
                         <v-col>
                            Dislike: {{poll.dontLike}}
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>

        </v-col>
    </v-row>

  </v-container>
</template>

<script>
import API from '../api'
  export default {
    data: () => ({ 
      polls: [],
      loggedIn: false,
      }),
     async created(){
        if(this.$cookies.get("token")){
            this.loggedIn = true
        }else{
            this.loggedIn = false
        }
        const response = await API.getPolls()
        this.polls = response

     },
     methods: {
        async getUserName(id){
            let user = await API.getUserByID(id)
            if(user){
            user = await user.username
            return user
            }
        },
        async voteLove(id){
            let currentData = await API.getPollByID(id)
            let vote = {
                "love": currentData.love + 1
            }
            const response = await API.vote(id, vote)
                        this.updatePage()

        },
        async voteLike(id){
            let currentData = await API.getPollByID(id)
            let vote = {
                "like": currentData.like + 1
            }
            const response = await API.vote(id, vote)
                        this.updatePage()


        },
        async voteDislike(id){
            let currentData = await API.getPollByID(id)
            let vote = {
                "dontLike": currentData.dontLike + 1
            }
            const response = await API.vote(id, vote)
            // currentPollRatings(id)
            this.updatePage()

        },
        async updatePage(){
            const response = await API.getPolls()
                this.polls = response
        }
     },updated:{
        async currentPollRatings(id){
            const response = await API.getPollByID(id)
            return response
        }
     }
  }
</script>
