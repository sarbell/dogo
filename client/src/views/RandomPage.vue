<template>
  <v-container>
    <v-row>
        <v-col align="center">
            <h1 class="text-h1">Random Dogs</h1>
            <h2 class="subtitle-1">Add dogs to your favorites!</h2>
            <br>
            <v-btn color="amber" :to="{name: 'favorites'}">See Your Favorites </v-btn>
            <br>
            <br>
       </v-col>
    </v-row>
    <v-row>
        <v-col>
            <random-pic />
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '../api'
import Random from '../components/Random.vue'
  export default {
    data: () => ({ 
}),
   components:{
         'random-pic': Random,
     },
    async created(){
        if(this.$cookies.get("token")){
            this.loggedIn = true
        }else{
            this.loggedIn = false
            this.$router.push({name: 'signin'})
        }
     },
  }
</script>
            