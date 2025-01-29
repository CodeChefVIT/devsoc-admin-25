"use client"
import { DataTable } from "@/components/table/data-table";
import columns from "@/components/columns";
import { tasks } from "@/data/data";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/fetchUsers"
import oosers from '@/components/dumUser.json'
export default function Users(){
    const {data: userList, isLoading, isError} = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })

    if(isLoading){
        <>loading...</>
    }
    if (isError){
        <>skill issue</>
    }

    return (<div className="">
        <DataTable data={tasks} columns={columns} />

    </div>)
}