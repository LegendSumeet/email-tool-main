"use client";
import { Button } from "@/components/ui/button";
import CompanyInputForm from "./form";
import DataTablePage from "./showdatatable";
import { DataProvider } from "@/components/dataProvider";

export default function HomePage() {
  return (
    <DataProvider>
        <DataTablePage />
    </DataProvider>
  );
}

