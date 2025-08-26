import axios from "axios";

// creating an global instance to fetch the base url
const api = axios.create({
    baseURL:"http://localhost:3000/api"
})

export default api;
