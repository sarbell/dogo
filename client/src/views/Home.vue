<template>
  <v-container fluid>
    <v-layout row wrap>
        <v-flex xs12 class="text-center">
          <div id="hero" :style="{'backgroundImage': 'url(' + require('@/assets/dogface.jpg') + ')'}" >
              <v-row align="center" justify="center">
                <v-col class="text-center pt-16" cols="10">
                  <h1 :class="[$vuetify.breakpoint.smAndUp ? 'text-h1' : 'text-h2']" class="font-weight-bold pt-10">Welcome to DOGO!</h1>
                  <h2 class="subheading pt-10 font-weight-light">
                    The best place to grow your collection of cute pup pics and see what dogs are popular. Yeah, we are fur-real!
                  </h2>
                  <v-btn v-if="!loggedIn" color="amber" :to="{name: 'signup'}" class="text-uppercase mt-10">Join the Dogo club</v-btn>
                </v-col>
              </v-row> 
          </div>
          <section >
            <div>
            <v-row align="center" justify="center" class="pt-10" >
              <v-col cols="10">
                <h3 class="pb-3 text-h3">Why use DOGO! ?</h3>
                <p>We've all had some <span class="font-italic">ruff</span> days. Mistakes happen, no need to <span class="font-italic">terrier-self</span> up about it! Maybe we're <span class="font-italic">barking</span> up the wrong tree, but at least we can help prevent you from hitting the <span class="font-italic">re-tail</span>  stores, and enjoy some <span class="font-italic">puppy</span> love instead. Remember, anything is <span class="font-italic">paw-sibile</span> if you have some doggies in your life!</p>
                  <v-btn v-if="!loggedIn" color="amber" :to="{name: 'signin'}" class="text-uppercase mt-5">Sign In</v-btn>
             
              </v-col>
            </v-row>
            </div>
          </section>
          <section class="mt-10 amber">
            <v-row align="center" justify="center" >
              <v-col cols="10">
                <h3 class="pb-3 pt-6 text-h3">Cast your vote!</h3>
                <v-btn color="" :to="{name: 'polling'}" class="text-uppercase mt-5">See More Polls</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <vote-home />
              </v-col>
            </v-row>
          </section>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Random from '../components/Random.vue'
import VotingHome from '../components/VotingHome.vue'
  export default {
    data: () => ({ 
      loggedIn: false,
      backgroundImage: ''
      }),
      components:{
         'random-pic': Random,
         'vote-home': VotingHome
     },
     async created(){
         if(this.$cookies.get("token")){
           this.loggedIn = true
         }else{
           this.loggedIn = false
         }
         document.title ="DOGO app"
     },
  }
</script>

<style scoped>
  #hero{
    min-height: 95vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    /* background-attachment: fixed; */
  }
  #blue{
    min-height: 30vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    /* background-attachment: fixed; */
  }
 
</style>
