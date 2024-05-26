import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "./data-table";
import { columns, SheetError } from "./colums";
import CompanyInputForm from "./form";
import { Button } from "@/components/ui/button";
import convertJsonToExcel from "@/components/fetchhook";


export default function DataTablePage() {
  const [data, refetchData] = useFetchData();

  return (
    <div>
      <div className="container mx-auto py-10 justify-center">
        {data.length === 0 ? (
          <div className="flex items-center justify-center">
            <h1 className=" text-2xl">
              Loading Data Form Server.......
            </h1>
          </div>
        ) : (
          <div>
            <div className="flex flex-row justify-evenly m-12">
            <Button
                className=""
                onClick={async function handletoButton() {
                  try {
                    const response = await fetch(
                      "https://api-codehub.vercel.app/api/conferences/company-input"
                    );
                    const newData: SheetError[] = await response.json();

                    convertJsonToExcel("data", newData);
                  } catch (error) {
                    console.error("Error fetching data:", error);
                  }
                }}
              >
                Export Data
              </Button>
              <Button className=" " onClick={refetchData}>
                Refresh
              </Button>
            </div>
            <DataTable columns={columns} data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

export function useFetchData(): [SheetError[], () => void] {
  const [data, setData] = useState<SheetError[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api-codehub.vercel.app/api/conferences/company-input"
      );
      const newData: SheetError[] = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, fetchData];
}
