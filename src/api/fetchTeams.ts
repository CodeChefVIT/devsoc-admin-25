import { type Team } from "@/data/schema"
import {type TeamsResponse} from "@/data/schema"
import axios from "./axiosConfig";


export const fetchTeams = async()=>{
    try{
        const response = await axios.get<TeamsResponse>('admin/teams?limit=10')
        console.log(response.data.data.teams)
        return response.data.data.teams;
    }catch(err){
        throw err;
    }
}


