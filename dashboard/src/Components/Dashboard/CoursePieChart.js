import React, { PureComponent } from 'react'
import { Fragment } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'StudentId', headerName: 'ID', width: 70 },
  {
    field: 'Name',
    headerName: 'Name',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.Name.FirstName || ''} ${params.row.Name.LastName || ''}`,
  },
  { field: 'Gender', headerName: 'Gender', width: 70, sortable: false },
  { field: 'AcadPlan', headerName: 'AcadPlan', width: 100, sortable: false },
  { field: 'ResStatus', headerName: 'Status', width: 100, sortable: false},
  { field: 'StudentEmail', headerName: 'Email', width: 180, sortable: false},

];

const ifPassedCOLORS = ['#FFBB28', '#FF8042']
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

/**
 * Course Report Page > Pie chart Paper Content.
 * Display the filtered information pie charts - domestic student or international student;
 *                                             - pass or failed
 *
 * @param props
 * @param {JSON list} data
 *    JSON list that filtered the dashboard_st with specific course subject, course catalogue,
 *    academic year and semester
 * @return {React.Fragment}
 *    Display two Pie Charts
 */

export default class StudentsAndResult extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      studentData: []
    }
  }
  render() {
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
    let {passedAndFailed, passedStudent, failedStudent, dataList} = this.props
    
    const handlePieClick = (name) => {

      
      this.setState({ open: true })
      if (name == 'Passed') {
        this.setState({ studentData: passedStudent })
      }
      if (name == 'Failed') {
        this.setState({ studentData: failedStudent })
      }
    }
    const handleClose = () => {
      this.setState({ open: false })
    }
    return (
      <Fragment>
        <ResponsiveContainer width={350}>
          <PieChart>
            <Pie
              data={passedAndFailed}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              dataKey="value"
            >
              {passedAndFailed.map((entry, index) => (
                <Cell
                  cursor={'pointer'}
                  key={`cell-${index}`}
                  fill={ifPassedCOLORS[index]}
                  onClick={() => handlePieClick(entry.name)}
                />
              ))}
            </Pie>
            {/* put legend on the right of the pie chart */}
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
        <Modal
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Student Detail
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="div"
            >
                  <DataGrid
                  rows={this.state.studentData}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  getRowId={(row) => row.StudentId}
                  // checkboxSelection
                />
            </Typography>
          </Box>
        </Modal>
      </Fragment>
    )
  }
}
