import axios from "./axiosConfig";

interface banning{
    status:string;
    message: string;
    data: object;
}

export const banUnban = async ({ ban, email }: { ban: boolean; email: string; })=>{
    try {
        const url = ban?"/admin/ban":"/admin/unban"
        const response = await axios.post(url, {email})
        console.log("this is banning")
        console.log(response.data)
        return response.data as banning;
    }catch(err){
        
        throw err;
    }
}