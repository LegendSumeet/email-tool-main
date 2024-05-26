import * as XLSX from 'xlsx';
import fs from 'fs';

export default function createExcelSheet(fileName: string, jsonData: any[]) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(jsonData);

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const filePath = `${fileName}.xlsx`;
    XLSX.writeFile(wb, filePath);

    console.log(`Excel sheet "${fileName}.xlsx" created successfully.`);
}

