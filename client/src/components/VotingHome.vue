<template>
  <v-container>
    <v-row>
        <v-col>
             <v-card 
                v-if="random"
                class="mx-auto"
                max-width="400"
            >
                <v-img
                class="white--text align-end"
                height="300px"
                :src="`${random.image}`"
                >
                </v-img>
                <v-card-subtitle class="pb-0">
                <!-- Created by: <span>{{getUserName(random.user)}}</span>  -->
                </v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-text class="text--primary">
                    <h3 class="font-weight-light text-uppercase">Cast your vote</h3>
                </v-card-text>
                <v-card-actions v-if="!showAnswers"> 
                    <v-row>
                        <v-col className="text-left">
                            <v-tooltip right>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn icon @click="voteLove(random._id)">
                                        <v-icon large color="pink" v-bind="attrs" v-on="on">
                                        mdi-heart
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Cutest dog ever!</span>
                            </v-tooltip>
                        </v-col>
                        <v-col className="text-center">
                            <v-tooltip right>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn icon @click="voteLike(random._id)">
                                        <v-icon large color="blue" v-bind="attrs" v-on="on">mdi-thumb-up</v-icon> 
                                    </v-btn>
                                </template>
                                <span>Pretty cute dog!</span>
                            </v-tooltip>
                        </v-col>
                        <v-col className="text-right">
                            <v-tooltip left>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn icon @click="voteDislike(random._id)">
                                    <v-icon large color="blue-grey darken-3" v-bind="attrs" v-on="on">mdi-thumb-down</v-icon> 
                                    </v-btn>
                                </template>
                                <span>Nah, don't like this one. Sorry pooch!</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
    
                </v-card-actions>
                <v-card-actions v-if="showAnswers">
                    <v-row >
                        <v-col>
                            <v-progress-linear
                            color="pink"
                            height="20"
                            v-model="loveTotal"
                            striped
                            >
                            <strong>{{ Math.ceil(loveTotal) }}%</strong>
                            </v-progress-linear>
                            <br>
                            <v-progress-linear
                            color="blue"
                            height="20"
                            v-model="likeTotal"
                            striped
                            >
                             <strong>{{ Math.ceil(likeTotal) }}%</strong>
                            </v-progress-linear>
                            <br>
                            <v-progress-linear
                            color="blue-grey darken-3"
                            height="20"
                            v-model="dislikeTotal"
                            striped
                            >
                             <strong>{{ Math.ceil(dislikeTotal) }}%</strong>
                            </v-progress-linear>
                            <br>
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
      random: '',
      showAnswers: false,
      answerTotals: '',
      loveTotal: '',
      likeTotal: '',
      dislikeTotal: '',
    }),
    async created(){
        if(this.$cookies.get("token")){
            this.loggedIn = true
        }else{
            this.loggedIn = false
        }
        const response = await API.getPolls()
        this.polls = response
        this.random = this.polls[Math.floor(Math.random()*this.polls.length)];
     },
     methods: {
        async voteLove(id){
            let currentData = await API.getPollByID(id)
            let vote = {
                "love": currentData.love + 1
            }
            const response = await API.vote(id, vote)
            response ? this.findTotals(id) : ''
        },
        async voteLike(id){
            let currentData = await API.getPollByID(id)
            let vote = {
                "like": currentData.like + 1
            }
            const response = await API.vote(id, vote)
            response ? this.findTotals(id) : ''
        },
        async voteDislike(id){
            let currentData = await API.getPollByID(id)
            let vote = {
                "dontLike": currentData.dontLike + 1
            }
            const response = await API.vote(id, vote)
            response ? this.findTotals(id) : ''

        },
        async findTotals(id){
            let result = await API.getPollByID(id)
            this.answerTotals = result.dontLike + result.like + result.love
            this.loveTotal = (result.love / this.answerTotals) * 100
            this.likeTotal = (result.like / this.answerTotals) * 100
            this.dislikeTotal = (result.dontLike / this.answerTotals) * 100
            this.showAnswers = true
            this.random = result
        }
     }
  }
</script>
