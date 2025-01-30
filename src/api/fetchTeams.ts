import { type Team } from "@/data/schema"
import axios from "./axiosConfig";


export const fetchTeams = async()=>{
    try{
        const response = await axios.get('admin/teams')
        console.log(response.data)
        return response.data as Team[];
    }catch(err){
        throw err;
    }
}


