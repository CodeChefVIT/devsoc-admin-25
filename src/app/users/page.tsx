import { DataTable } from "@/components/table/data-table";
import columns from "@/components/columns";
import { tasks } from "@/data/data";

export default function users(){

    return (<div className="">
        <DataTable data={tasks} columns={columns} />

    </div>)
}