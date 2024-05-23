// Implement API endpoint
import axios from 'axios';

// Use ngrok url and add /api/ at the end
const APIManager = axios.create({
    baseURL: "https://551b-37-75-161-47.ngrok-free.app/api/",
    responseType: 'json',
    withCredentials: true, 
})

export default APIManager; 