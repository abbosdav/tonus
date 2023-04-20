import axios from "axios";
// import { getCookie } from "@/utils/cookies";

const instance = axios.create({
    baseURL: 'http://95.130.227.52:3001/api/',
});

export default instance;
