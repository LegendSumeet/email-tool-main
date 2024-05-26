"use client";
import { Button } from "@/components/ui/button";
import CompanyInputForm from "./form";
import DataTablePage from "./showdatatable";
import convertJsonToExcel, {  } from "@/components/fetchhook";
export default async function DemoPage() {
  return (
    <div>
      
      <CompanyInputForm />
      <DataTablePage />
      
    
    </div>
    //
  );
}
