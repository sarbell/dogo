<template>
  <v-card
    class="mx-auto"
    max-width="80%"
  >
    <v-img contain height="500" :src="`${dogUrl}`"></v-img>
    <v-card-actions>
      <div v-if="loggedIn">
      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
            <v-btn  @click="addToFavs()"  icon>
              <v-icon v-bind="attrs" v-on="on" color="pink lighten-2">{{heartIcon}}</v-icon>
            </v-btn>
        </template>
        <span>Add to favorites</span>
      </v-tooltip>
      </div>
      <v-btn  color="" text @click="fetchRandom()">
        Fetch Random Dog!
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
    import API from '../api'
  export default {
    data(){
        return{
            show: false,
            dogUrl: '',
            loggedIn: false,
            heartIcon: 'mdi-heart-outline'
        }
    },
    async created(){
        this.dogUrl = await API.getRandomDogPic()
        if(this.$cookies.get("token")){
           this.loggedIn = true
         }else{
           this.loggedIn = false
         }
    },
    methods: {
        async fetchRandom(){
            this.dogUrl = await API.getRandomDogPic()
            this.heartIcon = 'mdi-heart-outline'

        },
        async addToFavs(){
          let favorite = {
            'urlOfImage': this.dogUrl          
            }
          const response = await API.addDogToFavorites(favorite)
          if(response.status == 200){
            this.heartIcon = 'mdi-heart'
            this.$toasted.show('Added to favorites!', {
                type: 'success'
            })
          }else{
               this.$toasted.show('Something went wrong!', {
                type: 'error'
            })
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
         }
    }

  }
</script>
<style>
  .toasted {
    font-family: Roboto, sans-serif;
    font-weight: 600 !important;

  }
</style>
