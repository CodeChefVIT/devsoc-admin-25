import { type Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  handleNextPage: ()=>void;
  handlePrevPage: ()=>void;
  setPageLimit: (limit: number)=>void;
pageLimit: number;
}

export function DataTablePagination<TData>({
  table,
  handleNextPage,
  handlePrevPage,
  setPageLimit,
   pageLimit
  // onPageChange,
  // onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  // const handlePageChange = (page: number)=>{
  //   onPageChange(page);
  //   table.setPageIndex(page);
  // }
  // const handlePageSizeChange = (size: number)=>{
  //     onPageSizeChange(size);
  //     table.setPageSize(size)
  // }
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected. */}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={String(pageLimit)}
             onValueChange={(value) => {
               setPageLimit(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div> */}
        <div className="flex items-center space-x-2">
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => handlePageChange(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button> */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {handlePrevPage()}}
            // disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {handleNextPage()}}
            // disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => handlePageChange(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button> */}
        </div>
      </div>
    </div>
  )
}