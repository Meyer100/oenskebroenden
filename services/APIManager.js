import axios from 'axios';

// Herinde laver vi vores axios connection til api'en
// Vigtigt at når ens ngrok endpoint bliver erstattet skal den se ud: "url/api/"
const APIManager = axios.create({
    baseURL: "https://935e-37-75-161-47.ngrok-free.app/api/",
    responseType: 'json',
    withCredentials: true, 
})

export default APIManager; 