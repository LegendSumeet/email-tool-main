"use client";

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

interface FormValues {
  companyName: string;
  TotalRecords: string;
  mailselectedDomain: string;
}

const FormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  TotalRecords: z.string().min(1).max(1000, {
    message: "Total Records must be at least 10",
  }),
  mailselectedDomain: z.string().min(1, {
    message: "Please select a domain",
  }),
});

export default function CompanyInputForm() {

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedMailPattern, setSelectedMailPattern] = useState("");
  const [submittedData, setSubmittedData] = useState(false);
  const router = useRouter();
  const handleDomainChange = (value: any) => {
    setSelectedDomain(value);
    console.log("Selected Domain:", value);
  };

  const handleMailPatternChange = (value: any) => {
    setSelectedMailPattern(value);
    console.log("Selected Mail Pattern:", value);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
      TotalRecords: "",
      mailselectedDomain: "",
    },
  });

  function onSubmit(data: FormValues) {
    setSubmittedData(true);
    const formData = {
      ...data,
      selectedDomain,
      selectedMailPattern,
    };

    console.log("Form data to be sent:", formData);

    const isEmpty = Object.values(formData).every((value) => value == "");

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
      selectedDomain,
      selectedMailPattern,
    };
    // Example API call:
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
          router.push("/company-table");

          toast({
            title: "Success",
            description: "Form data submitted successfully",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to submit form data",
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Create Company Email</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="TotalRecords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Records</FormLabel>
                <FormControl>
                  <Input placeholder="Total Records" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div>
              <FormField
                control={form.control}
                name="mailselectedDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Enter your company name to create a email{" "}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display Domain
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="py-2">
              <div>
                <Select
                  onValueChange={(value) => {
                    handleDomainChange(value);
                  }}
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
          </div>

          <div className=" top-2">
            <Select
              onValueChange={(value) => {
                handleMailPatternChange(value);
              }}
            >
              <SelectTrigger className="mx-auto">
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
          </div>

          <Button 
          variant="success" type="submit">
            {submittedData ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
