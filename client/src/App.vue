<template>
  <v-app id="inspire">
    <v-app-bar app>
      <span class="hidden-sm-and-up">
      </span>
      <v-toolbar-title :to="{name: 'home'}"> DOGO</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-if="!loggedIn">
        <v-btn class="text-uppercase" :to="{name: 'home'}" text>Home</v-btn>
        <v-btn class="text-uppercase" :to="{name: 'signin'}" text>SIGN IN</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-if="loggedIn">
        <v-btn class="text-uppercase" :to="{name: 'home'}" text>Home</v-btn>
        <v-btn class="text-uppercase" :to="{name: 'random'}" text>Random Dogs</v-btn>
        <v-btn class="text-uppercase" :to="{name: 'favorites'}" text>Favorites</v-btn>
        <v-btn class="text-uppercase" :to="{name: 'polling'}" text> Polls </v-btn>
        <v-btn class="text-uppercase" text @click="signout()">Sign out</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null, hideSide: false }),
    async created(){
         if(this.$cookies.get("token")){
           this.loggedIn = true
         }else{
           this.loggedIn = false
         }
     },
     methods:{
       signout(){
          this.$cookies.remove("token")
          this.$router.push({name: 'home'})
          this.$router.go()
       }
     }
  }
</script>