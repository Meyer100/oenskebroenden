// Implement API endpoint
import axios from 'axios';

// Use ngrok url and add /api/ at the end
const APIManager = axios.create({
    baseURL: "https://4b71-2a00-fd00-901d-2000-9830-5169-3929-59b8.ngrok-free.app/api/",
    responseType: 'json',
    withCredentials: true, 
})

export default APIManager; 