import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  initialData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(initialData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: 50,
    paginateExpandedRows: true,
  });

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const router = useRouter();

  function handleToButton() {
    router.push("/create-company-email");
  }

  return (
    <div>
      <div className="rounded-md border border-spacing-2 border-gray-300 bg-gray-200">
        <Table className="w-full border border-black" >
          <TableHeader className="bg-gray-300 text-green font-bold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
              
                className="border-b border border-black"
               key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="p-2 border border-black text-wrap text-xl text-center bg-gray-300 text-green-700 font-extrabold"
                   key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
          className=" text-black border border-grey text-center bg-gray-100 text-xl"
          >

            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                    className="p-2 border border-grey-200 text-wrap text-xl text-center bg-gray-100 text-green-700"
                     key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="success"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="success"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
