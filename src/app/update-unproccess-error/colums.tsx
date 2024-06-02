import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaSync } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export type SheetError = {
  srno: number;
  _id: string;
  error: string;
  companyName: string;
  TotalRecords: string;
  Domain: string;
  updatedAt: string;
  createdAt: string;
  __v: Number;
  MailPattern: string;
};

interface CellProps {
  row: {
    original?: SheetError;
  };
}



var DomainUpdates:string ;

const DomainCell: React.FC<CellProps> = ({ row }) => {
  const initialSelectedDomain = row.original?.Domain || "";
  const [Domain, setDomain] = useState(initialSelectedDomain);
  const [showDomainInput, setShowDomainInput] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (row.original) {
      setDomain(row.original.Domain || "");
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
      <div className="flex items-center w-10/12">
        <Input
          type="email"
          placeholder="Enter Domain"
          value={Domain}
          onChange={(e) => {setDomain(e.target.value)
            DomainUpdates = e.target.value

          }}
        />

      </div>
      <div className="py-2">
        <Select
          onValueChange={(value) => {
            setDomain(value);
            updateDomain(value, 'Domain');
          }}
          value={Domain}
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


const DomainUpdateActions: React.FC<CellProps> = ({ row  }) => {
  const { toast } = useToast();

  const updateDomain = async (domain: string, field: keyof SheetError) => {



    const updatedRow = {
      [field]: domain,
    };

    console.log(updatedRow);

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
      <Button
        variant="success"
        title="Update Domain"

        className="ml-2 cursor-pointer w-1/2"
        onClick={() => updateDomain(DomainUpdates, 'Domain')}
      > update </Button>
    </div>
  )
}

const MailPatternCell: React.FC<CellProps> = ({ row }) => {
  const initialMailPattern = row.original?.MailPattern || "";
  const [mailPattern, setMailPattern] = useState(initialMailPattern);
  const [showSelectedPattern, setShowSelectedPattern] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (row.original) {
      setMailPattern(row.original.MailPattern || "");
    }
  }, [row.original]);

  const updateMailPattern = async (pattern: string) => {
    const updatedRow = {
      MailPattern: pattern,
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
    accessorKey: "srno",
    header: "Sr No",
  },

  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "error",
    header: "Error",
  },

  {
    accessorKey: "TotalRecords",
    header: "Total Records",
  },
  {
    accessorKey: "updatedAt",
    header: "Upload Date",
    cell: (props) => <div>{props.row.original?.updatedAt.split("T")[0]}</div>,
  },
  {
    accessorKey: "selectedDomain",
    header: "Add Domain",
    cell: DomainCell,
  },
  {
    accessorKey: "MailPattern",
    header: "Mail Patterns",
    cell: MailPatternCell,
  },
  {
    accessorKey: "Domain",
    header: "Actions",
    cell: DomainUpdateActions

  }

];
