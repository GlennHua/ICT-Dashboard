import React, {useState, useContext, useEffect} from 'react'
import {Grid, 
    Input, 
    Typography, 
    Autocomplete, 
    TextField, 
    Button, 
    Select, 
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AppContext } from '../../AppContextProvider';
const SearchStudentForInternshipEligibility = (props) => {

    // const [internshipStatus, setInternshipStatus] = useState('')
    // const [studentName, setStudentName] = useState(null)
    // const [studentNameList, setstudentNameList] = useState([])
    // const [studentIdList, setstudentIdList] = useState([])
    
    const internshipStatusList = ['Eligible', 'Not Eligible', 'Completed', 'Academic Plan Not Defined']

    // const {allStudents} = useContext(AppContext)
    // console.log(useContext(AppContext))

    let [internshipStatus, setInternshipStatus] = props.searchModeViewControl

    // const getStuFullNameList = (allStudents) => {
    //     let stuFullNameList = []
    //     allStudents.length > 0 && allStudents.map(student => 
    //         stuFullNameList.push(student.Name.FirstName + ' ' + student.Name.LastName)
    //     )
    //     stuFullNameList.sort()
    //     setstudentNameList(stuFullNameList)
    // }

    // const getStuIdList = (allStudents) => {
    //     let stuIdList = []
    //     allStudents.length > 0 && allStudents.map(student => 
    //         stuIdList.push(student.StudentId)
    //     )
    //     stuIdList.sort()
    //     setstudentIdList(stuIdList)
    // }

    // const listenToUserInputs = () => {
    //     if(studentId || studentName){
    //         setSearchModeOn(true)
    //     }
    //     else{
    //         setSearchModeOn(false)
    //     }
    // }

    const handleSelectStudentName = (event) => {
        setInternshipStatus(event.target.value)
        
    }

    // const clearFilter = () => {
    //     // setStudentId(null)
    //     // setStudentName('')
    //     setInternshipStatus(false)
    // }

    // useEffect(()=>{
    //     // getStuFullNameList(allStudents)
    //     // getStuIdList(allStudents)
    //     // listenToUserInputs()

    //     // internshipStatus == '' ? setSearchModeOn(false) : setSearchModeOn(true)
    // }, [allStudents, internshipStatus])


    return (
        <React.Fragment>
            <Typography variant='h5'>Student Internship Eligibility</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} mt={2}>
                    <FormControl>
                        <InputLabel>Status</InputLabel>
                        <Select
                        autoWidth={true}
                            value={internshipStatus}
                            label="Status"
                            onChange={handleSelectStudentName}
                        >
                             <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                internshipStatusList.map((status) => (
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>Filter students by internship status</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={5} mt={2}>
                    
                </Grid>

                {/* <Grid item xs={2} mt={2}>
                    <Button size="small" onClick={clearFilter} >       
                        <RefreshIcon fontSize="small" /> 
                        <Typography variant="h7" ml={1}>Clear search </Typography>       
                    </Button>
                </Grid> */}
            </Grid>
        </React.Fragment>
  )
}

export default SearchStudentForInternshipEligibility