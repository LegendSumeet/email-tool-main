"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaDownload, FaCheckCircle,   FaBookmark, FaSync,FaCheckSquare , FaHdd} from "react-icons/fa";

export type Payment = {
  hashid: string;
  id: string;
  sheetName: number;
  uploadDate: "pending" | "processing" | "success" | "failed";
  processStartDate: string;
  processEndDate: string;
  downloadLink: string;
};

    export const columns: ColumnDef<Payment>[] = [
        {
          accessorKey: "hashid",
          header: "#",
        },
        {
          accessorKey: "id",
          header: "ID",
        },
        {
          accessorKey: "sheetName",
          header: "Sheet Name",
        },
        {
          accessorKey: "uploadDate",
          header: "Upload Date",
        },
        {
          accessorKey: "processStartDate",
          header: "Process Start Date",
        },
        {
          accessorKey: "processEndDate",
          header: "Process End Date",
        },
        {
          accessorKey: "downloadLink",
          header: "",
          cell: () => {
            return (
              <div className="flex flex-row items-center">
                <FaDownload className="text-blue-500 mr-2" size={15} />
                <span className="text-gray-500">|</span>
                <FaBookmark className="text-blue-500 mx-2" size={15} />
                <span className="text-gray-500">|</span>
                <FaCheckCircle className="text-green-500 mx-2" size={15} />
                <span className="text-gray-500">|</span>
                <FaSync className="text-blue-500 mx-2" size={15} />
                <span className="text-gray-500">|</span>
                <FaCheckSquare className="text-green-500 mx-2" size={15} />
                <span className="text-gray-500">|</span>
                <FaHdd className="text-blue-500 mx-2" size={15} />
                <span className="text-gray-500">|</span>
                <FaDownload className="text-red-500 mx-2" size={15} />

              </div>
            );
          },
        },
      ];