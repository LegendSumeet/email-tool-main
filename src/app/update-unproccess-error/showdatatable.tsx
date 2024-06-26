import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns, SheetError } from "./colums";
import convertJsonToExcel from "@/components/fetchhook";
import { useData } from "@/components/dataProvider";
import CompanyInputForm from "./form";
import LoadingScreen from "@/components/loading";
import { useEffect } from "react";

export default function DataTablePage() {
  const { data, fetchData } = useData();


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="  w-11/12 mx-auto py-2 justify-center">
      {data.length === 0 ? (
        <div className="flex items-center justify-center">
          <LoadingScreen></LoadingScreen>
        </div>
      ) : (
        <div>
          
          <DataTable
            initialData={data}
            columns={columns} />
        </div>
      )}
    </div>
  );
}


// export function useFetchData(): [SheetError[], () => void] {
//   const [data, setData] = useState<SheetError[]>([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://api-codehub.vercel.app/api/conferences/company-input"
//       );
//       const newData: SheetError[] = await response.json();
//       setData(newData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return [data, fetchData];
// }
