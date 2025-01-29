import { user } from "@/store/interfaces";
import axios from "./axiosConfig";


export const fetchUsers = async()=>{
    try{
        const response = await axios.get('admin/users')
        console.log(response.data)
        return response.data as user[];
    }catch(err){
        throw err;
    }
}


