import axios from "./axiosConfig";
import {data} from "@/store/interfaces"

export const login = async(email: string, password: string) =>{
    try {
        const response = await axios.post('/auth/logout', {email, password})
        return response.data as data;
    }catch(err){
        
        throw err;
    }
}