<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
     <v-list dense nav >
          <v-list-item-group v-if="!loggedIn" active-class="indigo--text text--accent-4">
            <v-list-item-content >
              <v-list-item link>
                <v-list-item-title class="text-uppercase" @click="$router.push('/')"  >Home</v-list-item-title>
              </v-list-item>
              <v-list-item>
                 <v-list-item-title class="text-uppercase" @click="$router.push('/signin')" >Sign In</v-list-item-title>
              </v-list-item>
            </v-list-item-content>
          </v-list-item-group>
          
          <v-list-item-group v-if="loggedIn" active-class="indigo--text text--accent-4">
            <v-list-item-content >
              <v-list-item link>
                <v-list-item-title class="text-uppercase" @click="$router.push('/')"  >Home</v-list-item-title>
              </v-list-item>
              <v-list-item>
                 <v-list-item-title class="text-uppercase" @click="$router.push('/random')" >Random Dogs</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-uppercase" @click="$router.push('/favorites')" >Favorites</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-uppercase" @click="$router.push('/vote')" >Polls</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-uppercase" @click="$router.push('/account')" >Account</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-uppercase" @click="signout()" >Sign Out</v-list-item-title>
              </v-list-item>
            </v-list-item-content>
          </v-list-item-group>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </span>
      <v-toolbar-title  style="cursor: pointer" @click="$router.push('/')" > DOGO</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-if="!loggedIn">
        <v-btn class="text-uppercase" :to="{name: 'home'}" text>Home</v-btn>
        <v-btn class="text-uppercase" :to="{name: 'signin'}" text>SIGN IN</v-btn>
      </v-toolbar-items>
      <v-toolbar-items  class=" hidden-xs-only" v-if="loggedIn">
        <v-btn class="text-uppercase" :to="{name: 'home'}" exact text>Home</v-btn>
        <v-btn class="text-uppercase" :to="{name: 'random'}" exact text>Random Dogs</v-btn>
        <v-btn class="text-uppercase" :to="{name: 'favorites'}" text>Favorites</v-btn>
        <v-btn class="text-uppercase" :to="{name: 'polling'}" text> Polls </v-btn>
        <v-btn class="text-uppercase" :to="{name: 'account'}" text> Account </v-btn>
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
         document.title ="DOGO app"

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