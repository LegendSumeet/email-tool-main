"use client";
import { Button } from "@/components/ui/button";
import CompanyInputForm from "./form";
import DataTablePage from "./showdatatable";
import { DataProvider, useData } from "@/components/dataProvider";
import { SheetError } from "./colums";
import convertJsonToExcel from "@/components/fetchhook";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function HomePage() {

  const { data, fetchData } = useData();


  return (
    <DataProvider>
      <div
        className="flex flex-row justify-start m-12"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                            className="text-green-500 text-2xl font-bold"

               href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
              className="text-green-500 text-2xl font-bold"
               href="/update-unproccess-error">Update Missing Data</BreadcrumbLink>
            </BreadcrumbItem>
            
          </BreadcrumbList>
        </Breadcrumb>


      </div>

      <div className="flex flex-row justify-evenly m-12">




        <Button
          variant="success"

          onClick={async () => {
            try {
              const response = await fetch("https://api-codehub.vercel.app/api/conferences/company-input");
              const newData: SheetError[] = await response.json();

              const filteredData = newData.map(({ _id, createdAt, updatedAt, __v, ...rest }) => rest);

              convertJsonToExcel("data", filteredData);

            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }}
        >
          Export Data
        </Button>
        <Button
          variant="success"

          onClick={fetchData}>Refresh</Button>
      </div>
      <CompanyInputForm></CompanyInputForm>

      <DataTablePage />
    </DataProvider>
  );
}

