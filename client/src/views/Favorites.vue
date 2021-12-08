<template>
  <v-container>
    <v-alert border="left" close-text="Close Alert" color="green accent-4" @click="resetAlert()" dark dismissible v-if="this.alertMessage">
      {{this.alertMessage}}
    </v-alert>
    <v-row>
        <v-col align="center">
            <h1 class="text-h1">Favorites</h1>
            <v-btn color="amber" :to="{name: 'random'}">Add More to Favorites</v-btn>
        </v-col>
    </v-row>
  <v-row>
    <v-col
      v-for="dog in favs"
      :key="dog._id"
      class="d-flex child-flex"
      cols="sm-4"
    >
    <v-card tile>
        <v-card-title class="text-uppercase pl-1 pr-1 ">
            <span class="float-left">{{getDogBreed(dog.urlOfImage)}}</span>
            <v-spacer></v-spacer>
                <v-tooltip left>
                    <template v-slot:activator="{on, attrs}">
                        <v-icon @click="removeFromFavs(dog._id)" color="pink lighten-2" v-bind="attrs" v-on="on">
                            mdi-close-thick
                        </v-icon>
                    </template>
                    <span>Remove from favorites</span>
                </v-tooltip>
        </v-card-title>
      <v-img
        :src="`${dog.urlOfImage}`"
        :lazy-src="`${dog.urlOfImage}`"
        aspect-ratio="1"
        class="grey lighten-2"
        contain
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
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
      favs: [],
      alertMessage: '',
      }),
     async created(){
          if(!this.$cookies.get("token")){
            this.$router.push({name: 'signin'})
        }else{
            const response = await API.getFavs()
            response.sort(function(a,b){
              return new Date(b.date_saved) - new Date(a.date_saved);
            });
            this.favs = response
        }

     },
     methods:{
        async removeFromFavs(id){
          const response = await API.removeDogFromFavorites(id)
            if(response.status == 200){
                this.alertMessage = "Dog was removed from favorites!"
                this.favs = await API.getFavs()
                this.showAlert = true
            }else{
                this.alertMessage = "There was an error removing dog from favorites. Please try again"
                this.favs = await API.getFavs()

            }
         },
         getDogBreed(url){
            let x = url
             let y = 'breeds'
             let breedName = x.slice(x.indexOf(y) + y.length)
             let name = ''
            for(let i = 1; i < breedName.length -1; i++){
                name += breedName[i]
                if(breedName[i] == '/'){
                    name = name.slice(0, -1)
                    name = name.replace(/-/g, " ")
                    return name
                }
            }
         },
         resetAlert(){
          this.alertMessage =  ''
         }
     }
  }
</script>
