export interface data{
    status: string;
    message: string;
    data: object;
}

export interface refreshTK{
    status: string;
    message:string;
}
export interface user{
    id: number;
    name: string;
    email: string;
    team_id: number;
    is_vitian: string;
    reg_no: string;
    password:string;
    phone_no:string;
    role:string;
    is_leader: boolean;
    college: string;
    is_verified:boolean;
    is_banned:boolean
}