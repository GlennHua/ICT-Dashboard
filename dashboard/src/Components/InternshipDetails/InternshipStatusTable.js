import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InternshipStatusTable = (props) => {

  console.log(props)
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  // const [stuIdForFetch, setStuIdForFetch] = useState(0)
  // const [stuDetails, setStuDetails] = useState('invalid')
  // const rows = props.rows
  // const columns = props.columns
  const navigate = useNavigate()

  useEffect(()=>{
    if(props.rows && props.columns){
      setRows(props.rows)
      setColumns(props.columns)
    }
  },[props.rows.length])

  const getRowId = (row) => {
    return row.StudentId
  }

//   const getStuDetails = async (studentId) => {
//     const {data: stuDetails} = await axios.get(`/api/student/stuDetails/${studentId}`)
//     setStuDetails(stuDetails)
// }

  const redirectToStudentDetailPage = (row) => {
    // getStuDetails(row.id)
    navigate('/IndividualStudent', {state:{
      stuId: row.id,
      row: null
    }})
  }

  // console.log(stuIdForFetch)
  // console.log(stuDetails)
  return(
    <Grid item xs={12}>
      <Paper
        sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 550,
      }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination:{
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          getRowId={getRowId}
          pageSizeOptions={[5, 10, 20]}
          onRowClick={(row) => redirectToStudentDetailPage(row)}
        />
      </Paper>
    </Grid>
  )
}

export default InternshipStatusTable