import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaSync } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";

export type SheetError = {
  _id: string;
  companyName: string;
  TotalRecords: string;
  mailselectedDomain: string;
  selectedDomain: string;
  updatedAt: string;
  createdAt: string;
  __v: Number;
  selectedMailPattern: string;
};

interface CellProps {
  row: {
    original?: SheetError; // Make original property optional
  };
}

const DomainCell: React.FC<CellProps> = ({ row }) => {
  const initialMailselectedDomain = row.original?.mailselectedDomain || "";
  const initialSelectedDomain = row.original?.selectedDomain || "";
  const [mailselectedDomain, setMailselectedDomain] = useState(initialMailselectedDomain);
  const [selectedDomain, setSelectedDomain] = useState(initialSelectedDomain);
  const { toast } = useToast();

  useEffect(() => {
    if (row.original) {
      setMailselectedDomain(row.original.mailselectedDomain || "");
      setSelectedDomain(row.original.selectedDomain || "");
    }
  }, [row.original]);

  const updateDomain = async (domain: string, field: keyof SheetError) => {
    const updatedRow = {
      [field]: domain,
    };

    try {
      const url = `https://api-codehub.vercel.app/api/conferences/company-input-edit/${row.original?._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRow),
      });

      if (response.status === 200) {
        toast({
          title: "Domain Updated",
          description: "Domain updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <Input
          type="email"
          placeholder=""
          value={mailselectedDomain}
          onChange={(e) => setMailselectedDomain(e.target.value)}
        />
        <FaSync
          title="Update Domain"
          className="ml-2 cursor-pointer"
          onClick={() => updateDomain(mailselectedDomain, 'mailselectedDomain')}
        />
      </div>
      <div className="py-2">
        <Select
          onValueChange={(value) => {
            setSelectedDomain(value);
            updateDomain(value, 'selectedDomain');
          }}
          value={selectedDomain}
        >
          <SelectTrigger className="w-[182px]">
            <SelectValue placeholder="Choose Domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=".com">.com</SelectItem>
            <SelectItem value=".in">.in</SelectItem>
            <SelectItem value=".org">.org</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const MailPatternCell: React.FC<CellProps> = ({ row }) => {
  const initialMailPattern = row.original?.selectedMailPattern || "";
  const [mailPattern, setMailPattern] = useState(initialMailPattern);
  const [showSelectedPattern, setShowSelectedPattern] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (row.original) {
      setMailPattern(row.original.selectedMailPattern || "");
    }
  }, [row.original]);

  const updateMailPattern = async (pattern: string) => {
    const updatedRow = {
      selectedMailPattern: pattern,
    };

    try {
      const url = `https://api-codehub.vercel.app/api/conferences/company-input-edit/${row.original?._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRow),
      });

      if (response.status === 200) {
        toast({
          title: "Mail Pattern Updated",
          description: "Mail Pattern updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const handleTogglePattern = () => {
    setShowSelectedPattern(!showSelectedPattern);
  };

  return (
    <div className="top-2">

      <Select

        onOpenChange={handleTogglePattern}
        onValueChange={(value) => {
          setMailPattern(value);
          updateMailPattern(value);
        }}
        value={
          (showSelectedPattern) ? mailPattern : mailPattern.replace(/./g, "*")
        }

      >
        <SelectTrigger className="mx-auto">
          <SelectValue placeholder="Mail Pattern" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name.surname@example.com">NamedotSurname@domain</SelectItem>
          <SelectItem value="initials.lastname@example.com">InitialsdotLastname@domain</SelectItem>
          <SelectItem value="firstname.lastname@example.com">Firstnamedot@domain</SelectItem>
          <SelectItem value="firstnamelastname@example.com">Firstnamelastname@domain</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};


export const columns: ColumnDef<SheetError>[] = [
  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "updatedAt",
    header: "Upload Date",
    cell: (props) => <div>{props.row.original?.updatedAt.split("T")[0]}</div>,
  },
  {
    accessorKey: "TotalRecords",
    header: "Total Records",
  },
  {
    accessorKey: "selectedDomain",
    header: "Add Domain",
    cell: DomainCell,
  },
  {
    accessorKey: "selectedMailPattern",
    header: "Mail Patterns",
    cell: MailPatternCell,
  },
];
