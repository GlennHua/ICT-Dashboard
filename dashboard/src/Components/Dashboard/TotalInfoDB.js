import * as React from 'react'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import { studentNumberBySemester, top5CoursesBySemester } from '../../Request/DashboardRequest'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box'

/**
 * Dashboard Page > Total information Paper Content.
 * Get and display the total student number and total course number from MongoDB database dummy data.
 *
 * @return {React.Fragment} Display the two number.
 */

export default function Deposits() {
  const [studentList, setStudentList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [topCourse, setTopCourse] = useState([])

  const columns = [
    { field: 'course', headerName: 'Course', width: 150, sortable: false},
    { field: 'count', headerName: 'Students', width: 100, sortable: false},
  ];
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

  useEffect(() => {
    getStudentNumberBySemester().then((data) => {
      setStudentList(data)
    })
  }, [])

  const getStudentNumberBySemester = async () => {
    const { data } = await studentNumberBySemester()
    return data
  }

  const getTop5CoursesBySemester = async (semester) => {
    const { data } = await top5CoursesBySemester(semester)
    return data
  }
  const handleClick = async (e) => {
    setShowModal(true)
    const data = await getTop5CoursesBySemester(e)
    setTopCourse(data)
    console.log(data)
  }
  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid item>
          <Grid container alignItems="centre">
            {studentList.map((data, index) => (
              <Grid container key={index} alignItems="centre">
                <Grid item style={{ cursor: 'pointer' }} onClick={()=>handleClick(data.semester)}>
                <Typography component="h2" variant="h6" color="primary">{data.semester}:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{data.count} students</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal
          open={showModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Top 5 Course
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="div"
            >
                  <DataGrid
                  rows={topCourse}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
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
