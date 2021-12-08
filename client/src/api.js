import axios from 'axios'
const url = '/api/'

export default class API {
    //random dog
    static async getRandomDogPic(){
        const res = await axios.get(`https://dog.ceo/api/breeds/image/random`)
        if(res.data.status === "success"){
            return res.data.message
        }
    }

    // add user
    static async addUser(u){
        const res = await axios.post(`${url}/user/`, u)
        return res.data
    }

    // login user
    static async loginUser(user){
        const res = await axios.post(`${url}/login`, user)
        return res.data
    }

    // to update users into database
    static async updateUser(id, msg){
        const res = await axios.put(`${url}/user/${id}`, msg)
        return res.data
    }

    // Delete a users from the database
    static async deleteUser(id){
        const res = await axios.delete(`${url}/user/${id}`)
        return res.data
    }

     // to get single user by ID
     static async getUserByID(id){
        const res = await axios.get(`${url}/user/current/${id}`)
        return res.data
    }

        // to get current user
    static async getCurrentUser(){
        const res = await axios.get(`${url}/user/current`)
        return res.data
    }

    // Add to favorites
    static async addDogToFavorites(dog){
        const res = await axios.post(`${url}/favorites/add`, dog)
        return res.data
    }

    // remove from favorites
    static async removeDogFromFavorites(id){
        const res = await axios.delete(`${url}/favorites/remove/${id}`)
        return res.data
    }

    // get  favorites
    static async getFavs(){
        const res = await axios.get(`${url}/favorites`)
        return res.data
    }

    // add poll
    static async addPoll(poll){
        const res = await axios.post(`${url}/poll/add`, poll)
        return res.data
    }

    // get polls
    static async getPolls(){
        const res = await axios.get(`${url}/poll/all`)
        return res.data
    }

    // vote
    static async vote(id, vote){
        const res = await axios.put(`${url}/poll/vote/${id}`, vote)
        return res.data
    }

    // get poll by id
    static async getPollByID(id){
        const res = await axios.get(`${url}/poll/${id}`)
        return res.data
    }

}