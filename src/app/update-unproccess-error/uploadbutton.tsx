import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useData } from '@/components/dataProvider';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'; // Adjust the import path if necessary

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const { fetchData } = useData();

    const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
        }
    };

    const postData = async (record: any) => {
        try {
            const response = await fetch("https://api-codehub.vercel.app/api/conferences/company-input", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(record),
            });
            const responseData = await response.json();
            toast({
                title: "Success",
                description: "Form data submitted successfully",
            });
            return responseData;
        } catch (error) {
            console.error("Error:", error);
            toast({
                title: "Error",
                description: "An error occurred while submitting form data",
            });
            throw error;
        }
    };

    const handleFileUpload = async () => {
        if (!file) {
            console.error("No file selected");
            toast({
                title: "Error",
                description: "No file selected",
            });
            return;
        }

        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const processRecords = async () => {
                for (const record of jsonData) {
                    try {
                        await postData(record);
                        fetchData();
                    } catch (error) {
                        console.error("Error uploading record:", error, record);
                    }
                }
            };
            await processRecords();

        } catch (error) {
            console.error("Error reading file:", error);
            toast({
                title: "Error",
                description: "reload the page and try again",
            });
        }
    };

    return (
        <div className='flex flex-row w-6/12'>
            <Input
                type='file'
                onChange={uploadToClient}
                color='green'
            />
            <Button variant="success" onClick={handleFileUpload} className='ml-2 flex items-center'>
                <ArrowDownTrayIcon className='h-5 w-5 mr-2' />
                Import
            </Button>
        </div>
    );
};

export default FileUpload;
