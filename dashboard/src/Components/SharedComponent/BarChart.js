import { Typography } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts'
import Modal from '@mui/material/Modal'
import { top5CoursesBySemester } from '../../Request/DashboardRequest'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
/**
 * Barchart general function
 *
 * @param {string} XAxis_dataKey Data key for bar chart's x-axis
 * @param {boolean} flag_allowDecimals True or false. allowDecimals data.
 * @param {JSON list} data Bar chart data
 * @return {ResponsiveContainer} Display the bar chart.
 */

// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <Paper sx={{padding:0.2,}} >
//           <Typography color={blue[800]}>{label}</Typography>
//           <Typography>Domestic: {payload[0].value}</Typography>
//           <Typography>International: {payload[1].value}</Typography>
//           <Typography color={blue[800]}>Total: {payload[0].value + payload[1].value}</Typography>
//         </Paper>
//       );
//     }

//     return null;
//   };

export default function Chart({ XAxis_dataKey, flag_allowDecimals, data }) {
  const [showModal, setShowModal] = useState(false)
  const [topCourse, setTopCourse] = useState([])
  const columns = [
    { field: 'course', headerName: 'Course', width: 150, sortable: false },
    { field: 'count', headerName: 'Students', width: 100, sortable: false }
  ]
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  const handleClick = async (e) => {
    setShowModal(true)
    const data = await getTop5CoursesBySemester(e)
    setTopCourse(data)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  const getTop5CoursesBySemester = async (semester) => {
    const { data } = await top5CoursesBySemester(semester)
    return data
  }
  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/*
                  allowDecimals: Allow the ticks of XAxis to be decimals or not. 
                  default: true
                */}
          <XAxis dataKey={XAxis_dataKey} allowDecimals={flag_allowDecimals} />
          <YAxis />
          {/* <Tooltip content={<CustomTooltip />}/> */}
          <Legend />
          <Bar
            dataKey="Domestic"
            fill="#8884d8"
            cursor={'pointer'}
            onClick={(e) => handleClick(e.Semester)}
          >
            <LabelList dataKey="Domestic" position="top" />
          </Bar>
          <Bar
            dataKey="International"
            fill="#82ca9d"
            cursor={'pointer'}
            onClick={(e) => handleClick(e.Semester)}
          >
            <LabelList dataKey="International" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Top 5 Course
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="div">
            <DataGrid
              rows={topCourse}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5]}
              rowSelection={false}
              getRowId={(row) => row.course}
            />
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  )
}
