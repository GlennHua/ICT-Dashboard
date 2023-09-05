import React from 'react';
import {CSVLink} from 'react-csv';
import { getExportJsonData } from './controller';
import { IconButton} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function ExportCsv(props){
   const {rows,academicYear,semester,course} = props;
const headers = [
    {label:'Name',key:'Name'},
    {label:'Id',key:'Id'},
    {label:'Gender',key:'Gender'},
    {label:'CourseName',key:'CourseName'},
    {label:'CourseTitle',key:'CourseTitle'},
    {label:'Gpa',key:'Gpa'},
    {label:'Grade',key:'Grade'},
    {label:'Academic Year',key:'Year'},
    {label:'Semester',key:'Semester'},
    {label:'Campus',key:'Campus'},
    {label:'Email',key:'Email'},
]
  const jsonData = getExportJsonData(rows)
return(
  
     <IconButton size='small'>
          <CSVLink data={jsonData} headers={headers} filename={`${academicYear!==null?academicYear:''}${semester!==null?semester:''}${course!==null?course:''}Report.csv`} target="_blank">     
          <FileDownloadIcon  color="primary" />
          </CSVLink>
     </IconButton>
 
)

}
