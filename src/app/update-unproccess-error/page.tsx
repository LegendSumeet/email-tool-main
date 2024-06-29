"use client";
import { Button } from "@/components/ui/button";
import CompanyInputForm from "./form";
import DataTablePage from "./showdatatable";
import { DataProvider, useData } from "@/components/dataProvider";
import { SheetError } from "./colums";
import convertJsonToExcel from "@/components/fetchhook";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import FileUpload from "./uploadbutton";
import { ArrowUpIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
export default function HomePage() {

  const { data, fetchData } = useData();
  const refersh = async () => fetchData();

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

      <div className="flex flex-row justify-end  m-12 p-6 space-x-1">
      <Button
          variant="success"

          onClick={refersh}>
                        <ArrowPathIcon className='h-5 w-5 mr-2' />

            Refresh</Button>
        <div className="flex flex-row space-x-4">
          <FileUpload></FileUpload>
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
            <ArrowUpIcon className='h-5 w-5 mr-2' />


            Export Data
          </Button>

        </div>

      </div>
      <CompanyInputForm></CompanyInputForm>

      <DataTablePage />
    </DataProvider>
  );
}

