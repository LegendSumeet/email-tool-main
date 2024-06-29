import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import convertJsonToExcel from "@/components/fetchhook";
import { useData } from "@/components/dataProvider";
import { error } from "console";
import FileUpload from "./uploadbutton";

interface FormValues {
  error: string;
  companyName: string;
  TotalRecords: string;
}

const FormSchema = z.object({
  error: z.string().min(0, {
    message: "error must not be empty.",
  }),
  companyName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  TotalRecords: z.string().min(1).max(1000, {
    message: "Total Records must be at least 10",
  }),
});



export default function CompanyInputForm() {
  const { data, fetchData } = useData();
  const [showDomainInput, setShowDomainInput] = useState(false);

  const [Domain, setDomain] = useState("");
  const [MailPattern, setMailPattern] = useState("");
  const [submittedData, setSubmittedData] = useState(false);
  const router = useRouter();

  const handleDomainChange = (value: any) => {
    if (value == 'add') {
      setShowDomainInput(true)
    }
    else {
      setDomain(value);
      console.log("Selected Domain:", value);
    }
  };

  const handleMailPatternChange = (value: any) => {
    setMailPattern(value);
    console.log("Selected Mail Pattern:", value);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      error: "",
      companyName: "",
      TotalRecords: "",
    },
  });

  function onSubmit(data: FormValues) {
    setSubmittedData(true);
    const formData = {
      ...data,
      Domain,
      MailPattern,
    };

    console.log("Form data to be sent:", formData);

    const isEmpty = Object.values(formData).every((value) => value === "");

    if (isEmpty) {
      toast({
        title: "Error",
        description: "Form data cannot be empty",
      });
    } else {
      sendDataToAPI(formData);
    }
  }

  function sendDataToAPI(data: FormValues) {
    const formData = {
      ...data,
      Domain,
      MailPattern,
    };
    fetch("https://api-codehub.vercel.app/api/conferences/company-input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSubmittedData(false);
          toast({
            title: "Success",
            description: "Form data submitted successfully",
          });
          form.reset();
          fetchData();
        } else {
          toast({
            title: "Error",
            description: response.statusText,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "An error occurred while submitting form data",
        });
      });
  }

  return (
    <div className="flex flex-row items-center justify-center py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row justify-center space-x-1"
        >
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className=" w-11/12 text-xl text-green-700 font-bold">
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="error"
            render={({ field }) => (
              <FormItem className="w-11/12 text-green-700 font-bold">
                <FormControl>
                  <Input placeholder="Error" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TotalRecords"
            render={({ field }) => (
              <FormItem className="w-11/12 text-xl text-green-700 font-bold">
                <FormControl>
                  <Input

                    placeholder="Total Records" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="Domain"
            render={({ field }) => (
              <FormItem className="w-11/12 text-green-700 font-bold">
                <FormControl>
                  <Input placeholder="Website Domain" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {showDomainInput ? (
             <div className=" flex flex-col w-10/12 space-y-3">

             <Input
               className="w-11/12 text-green-700 font-bold"
               placeholder="Domain"
               value={Domain}
               onChange={(e) => setDomain(e.target.value)}
             />
             <Select onValueChange={(value) => handleDomainChange(value)}>
               <SelectTrigger className="w-11/12 text-green-700 font-bold">
                 <SelectValue placeholder="Choose Domain" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value=".com">.com</SelectItem>
                 <SelectItem value=".in">.in</SelectItem>
                 <SelectItem value=".org">.org</SelectItem>
                 <SelectItem value="add">Add Domain</SelectItem>
               </SelectContent>
             </Select>
           </div>
 
          ):(

          <Select onValueChange={(value) => handleDomainChange(value)}>
            <SelectTrigger className="w-11/12 text-green-700 font-bold">
              <SelectValue placeholder="Choose Domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=".com">.com</SelectItem>
              <SelectItem value=".in">.in</SelectItem>
              <SelectItem value=".org">.org</SelectItem>
              <SelectItem value="add">Add Domain</SelectItem>
            </SelectContent>
          </Select>
    
  )}
         


          <Select
            onValueChange={(value) => {
              handleMailPatternChange(value);
            }}
          >
            <SelectTrigger

              className=" w-11/12 text-green-700 font-bold"
            >
              <SelectValue placeholder="Mail Pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name.surname@example.com">
                NamedotSurname@domain
              </SelectItem>
              <SelectItem value="initials.lastname@example.com">
                InitialsdotLastname@domain
              </SelectItem>
              <SelectItem value="firstname.lastname@example.com">
                Firstnamedot@domain
              </SelectItem>
              <SelectItem value="firstnamelastname@example.com">
                Firstnamelastname@domain
              </SelectItem>
            </SelectContent>
          </Select>
          <Button

            variant="success"

            type="submit" className="">
            {submittedData ? "Submitting..." : "Save"}
          </Button>
         
        </form>
      </Form>
      
    </div>

  );
}
