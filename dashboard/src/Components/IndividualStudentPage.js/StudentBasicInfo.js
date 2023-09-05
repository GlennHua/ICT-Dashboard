import React, { useEffect, useState } from 'react'
import {Grid, Input, Typography} from '@mui/material';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateStduentById } from '../../Request/IndividualStudentPage';
const StudentBasicInfo = (props) => {
  const [stuDetails, setStuDetails] = useState({})
  const [stuInternshipEligibility, setStuInternshipEligibility] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [open, setOpen] = useState(false);
  const [prvValue, setPrvValue] = useState()

  const getStudentDetails = async () => {
    const {data: stuDetails} = await axios.get(`/api/student/stuDetails/${props.stuId}`)
    setStuDetails(stuDetails)
    setPrvValue(stuDetails)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStuDetails(prvValue)
  };

  const handleConfirm = () => {
    setOpen(false);
    getUpdatedStudent().then((data) => {
      alert(data.message)
    })
  };
  const getStudentInternshipEligibility = async () => {
    const {data: eligibility} = await axios.get(`/api/student/stuInternshipEligibility/${props.stuId}`)
    setStuInternshipEligibility(eligibility)
  }

  const handleEdit = (e) => {
    if(e && e.target.parentElement.firstChild.innerText !== 'Gpa') return
    setIsEdit(!isEdit)
  }

  const handleOnBlur = () => {
    handleEdit()
    let isLetter = /^[a-zA-Z]$/.test(stuDetails.Gpa)
    if ( isLetter || stuDetails.Gpa < 0 || stuDetails.Gpa > 9 ) {
      alert("GPA must be between 0 and 9");
      return
    }
    handleClickOpen()
  }
  // console.log(stuDetails)
  // console.log(stuInternshipEligibility)

  const handleChange  = (e,property) => {
    setStuDetails({...stuDetails, [property]: e.target.value})
  }
  const getUpdatedStudent = async() => {
    const {data} = await updateStduentById(props.stuId, {...stuDetails,Name:{FirstName:stuDetails.Name.split(" ")[0], LastName:stuDetails.Name.split(" ")[1]}})
    return data
  }
  const renderGridItems = () => {
    let gridItems = []
    for(let property in stuDetails){
      if(property !== 'Courses'){
        gridItems.push(
          <Grid item xs={3} key={property} mt={2}>
            <Typography variant='h8'>
              <strong>{property}</strong>
            </Typography>
            {isEdit && property =='Gpa' ?
              <Input autoFocus onBlur={()=>handleOnBlur()} value={stuDetails[property]} onChange={(e)=>handleChange(e,property)}/> 
              :
              <Typography variant='body1' onDoubleClick={(e)=>handleEdit(e)}>
                {stuDetails[property]}
              </Typography>
            }
          </Grid>
        )
      }
    }
    return gridItems
  }

  useEffect(() => {
    getStudentDetails()
    getStudentInternshipEligibility()
  }, [props])

  return (
    <React.Fragment>
      <Typography variant='h5'>
        Student Personal Details
      </Typography>
      <Grid container spacing={4}>
        {
          renderGridItems()
        }
        <Grid item xs={12}>
          <strong>Student Internship Eligibility</strong>
          {
            // stuDetails.Gpa>=4.0 ? 
            // <Typography variant='body1'>
            //   Eligible
            // </Typography> 
            // : 
            // <Typography variant='body1'>
            //   Not Eligible
            // </Typography>

            <Typography variant='body1'>
              {stuInternshipEligibility.internshipEligibility}
            </Typography> 
          }
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update Student Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Change Gpa to {stuDetails.Gpa}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default StudentBasicInfo