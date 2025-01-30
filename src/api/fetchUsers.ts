import { type User } from "@/data/schema"
import {type UserResponse} from "@/data/schema"
import axios from "./axiosConfig";


export const fetchUsers = async()=>{
    try{
        const response = await axios.get<UserResponse>('admin/users?limit=10')
        console.log(response.data)
        return response.data.data.users;
    }catch(err){
        console.log(err)
        throw err;
    }
}


