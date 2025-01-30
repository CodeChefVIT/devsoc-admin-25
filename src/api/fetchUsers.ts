import { type User } from "@/data/schema"
import axios from "./axiosConfig";


export const fetchUsers = async()=>{
    try{
        const response = await axios.get('admin/users')
        console.log(response.data)
        return response.data as User[];
    }catch(err){
        throw err;
    }
}


