import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableBody, TableRow, TableCell, Button, Input } from '@mui/material'
import { updateTakeById,deleteTakeById } from '../../Request/IndividualStudentPage'
const CoursesTable = (props) => {
  console.log(props)
  const navigate = useNavigate()
  const [editRow, setEditRow] = useState(null)
  const [editedCourseRow, setEditedCourseRow] = useState(props.row.courses)

  const redirectToViewCoursePage = (courseName) => {
    const subject = courseName.split(' ')[0]
    const catalogue = courseName.split(' ')[1]
    navigate(`/ViewCourses/CourseDetails/${subject}${catalogue}`)
  }
  const handleEditClick = (index) => {
    setEditRow(index)
  }

  const handleInputChange = (e, index, fieldName) => {
    const { value } = e.target
    const updatedCourseRows = [...editedCourseRow];
    updatedCourseRows[index] = {
      ...updatedCourseRows[index],
      [fieldName]: value
    }
    console.log('before Course Row:', props.row.courses[index])
    console.log('Updated Course Row:', updatedCourseRows[index])
    setEditedCourseRow(updatedCourseRows)
  }

  const handleSaveClick = (index) => {
    const prvData = {
      Subject: props.row.courses[index].CourseName.split(' ')[0],
      Catalogue: props.row.courses[index].CourseName.split(' ')[1],
      CourseTitle: props.row.courses[index].CourseTitle,
      AcademicYear: props.row.courses[index].Year,
      Semester: props.row.courses[index].Semester,
      Grade: props.row.courses[index].Grade,
      GpaPoint: props.row.courses[index].Gpa,
      Campus: props.row.courses[index].Campus,
      Term: props.row.courses[index].Term,
      StudentId: props.row.Id
    }
    const updatedData = {
      Subject: editedCourseRow[index].CourseName.split(' ')[0],
      Catalogue: editedCourseRow[index].CourseName.split(' ')[1],
      CourseTitle: editedCourseRow[index].CourseTitle,
      AcademicYear: editedCourseRow[index].Year,
      Semester: editedCourseRow[index].Semester,
      Grade: editedCourseRow[index].Grade,
      GpaPoint: editedCourseRow[index].Gpa,
      Campus: editedCourseRow[index].Campus,
      Term: editedCourseRow[index].Term,
    }
    const dispatch = {
      prv:prvData,
      updated:updatedData
    }
    getUpdateTakeById(dispatch).then((data) => {
      alert(data.message)
    })
    // After saving, exit the edit mode
    setEditRow(null);
  }

  const handleCancelClick = () => {
    setEditRow(null);
  }

  const handleDeleteClick = (index) => {
    const data = {
      Subject: props.row.courses[index].CourseName.split(' ')[0],
      Catalogue: props.row.courses[index].CourseName.split(' ')[1],
      AcademicYear: props.row.courses[index].Year,
      Semester: props.row.courses[index].Semester,
      StudentId: props.row.Id
    }
    console.log('data', data)
    getDeleteTakeById(data)
  }

  const getUpdateTakeById = async(dispatch) => {
    const {data} = await updateTakeById(dispatch)
    return data
  }

  const getDeleteTakeById = async(dispatch) => {
    const {data} = await deleteTakeById(dispatch)
    return data
  }
  console.log(editedCourseRow)
  return (
    <TableBody>
      {editedCourseRow.map((courseRow, index) => (
        <TableRow key={courseRow.CourseName+courseRow.Term}>
          {index == editRow ? (
            <Fragment>
              <TableCell align="right">
                <Input
                  defaultValue={courseRow.CourseName}
                  onChange={(e) => handleInputChange(e, index, "CourseName")}
                />
              </TableCell>
              <TableCell align="right">
                <Input
                  defaultValue={courseRow.CourseTitle}
                  onChange={(e) => handleInputChange(e, index, 'CourseTitle')}
                />
              </TableCell>
              <TableCell align="right">
                <Input
                  defaultValue={courseRow.Year}
                  onChange={(e) => handleInputChange(e,index,  'Year')}
                />
              </TableCell>
              <TableCell align="right">
                <Input
                  defaultValue={courseRow.Semester}
                  onChange={(e) => handleInputChange(e, index, 'Semester')}
                />
              </TableCell>
              <TableCell align="right">
                <Input
                  defaultValue={courseRow.Grade}
                  onChange={(e) => handleInputChange(e, index, 'Grade')}
                />
              </TableCell>
              <TableCell align="right">
                <Input
                  defaultValue={courseRow.Gpa}
                  onChange={(e) => handleInputChange(e, index, 'Gpa')}
                />
              </TableCell>
              <TableCell align="right">
                <Input
                  defaultValue={courseRow.Campus}
                  onChange={(e) => handleInputChange(e, index, 'Campus')}
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleSaveClick(index)}
                >
                  Save
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleCancelClick()}
                >
                  Cancel
                </Button>
              </TableCell>
            </Fragment>
          ) : (
            <Fragment>
              <TableCell
                scope="row"
                onClick={() => {
                  redirectToViewCoursePage(courseRow.CourseName)
                }}
              >
                {courseRow.CourseName}
              </TableCell>
              <TableCell align="right">{courseRow.CourseTitle}</TableCell>
              <TableCell align="right">{courseRow.Year}</TableCell>
              <TableCell align="right">{courseRow.Semester}</TableCell>
              <TableCell align="right">{courseRow.Grade}</TableCell>
              <TableCell align="right">{courseRow.Gpa}</TableCell>
              <TableCell align="right">{courseRow.Campus}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleEditClick(index)}
                  sx={{margin: '3px'}}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  sx={{margin: '3px'}}
                  onClick={() => handleDeleteClick(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </Fragment>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default CoursesTable
