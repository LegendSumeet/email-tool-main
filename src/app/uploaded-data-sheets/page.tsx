import NavigationMenuDemo from "@/lib/navbar";
import { Payment, columns } from "./colums";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      hashid: "1",
      id: "1",
      sheetName: 1,
      uploadDate: "pending",
      processStartDate: "2021-10-01",
      processEndDate: "2021-10-02",
      downloadLink: "https://example.com",
    },
    {
      hashid: "2",
      id: "2",
      sheetName: 2,
      uploadDate: "processing",
      processStartDate: "2021-10-01",
      processEndDate: "2021-10-02",
      downloadLink: "https://example.com",
    },
    {
      hashid: "3",
      id: "3",
      sheetName: 3,
      uploadDate: "success",
      processStartDate: "2021-10-01",
      processEndDate: "2021-10-02",
      downloadLink: "https://example.com",
    },
    {
      hashid: "4",
      id: "4",
      sheetName: 4,
      uploadDate: "failed",
      processStartDate: "2021-10-01",
      processEndDate: "2021-10-02",
      downloadLink: "https://example.com",
    },
    {
      hashid: "5",
      id: "5",
      sheetName: 5,
      uploadDate: "pending",
      processStartDate: "2021-10-01",
      processEndDate: "2021-10-02",
      downloadLink: "https://example.com",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
