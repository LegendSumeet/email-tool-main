import { NextApiRequest, NextApiResponse } from 'next';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import xlsx from 'xlsx';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonData = [{ "Name": "John", "Age": 30 }, { "Name": "Jane", "Age": 25 }];
  const sheet = xlsx.utils.json_to_sheet(jsonData);
  const buffer = xlsx.write({ Sheets: { 'data': sheet }, SheetNames: ['data'] }, { bookType: 'xlsx', type: 'buffer' });
  const filePath = join(process.cwd(), 'output.xlsx');
  try {
    await writeFile(filePath, buffer);
    // Send the file as a response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Error writing Excel file:', error);
    res.status(500).end();
  }
}
