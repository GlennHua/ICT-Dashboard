import React, {useEffect, useState, useContext} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Paper } from '@mui/material';
import { mdTheme } from '../SharedComponent/AppBarDrawer';
import { Bar } from '../SharedComponent/SharedBarContent';
import { useLocation } from 'react-router-dom'
import SearchStudentForInternshipEligibility from './SearchStudentForInternshipEligibility';
import InternshipStatusTable from './InternshipStatusTable';
import IndividualStudentInternshipEligibility from './IndividualStudentInternshipEligibility';
import InternshipStatusLists from './InternshipStatusLists';
import { AppContext } from '../../AppContextProvider';
import IsLoading from '../SharedComponent/IsLoading';

const InternshipReport = () => {

  const context = useContext(AppContext)
  const { internshipEligibilityList } = context
  // console.log(context)
  const [isLoading, setIsLoading] = useState(true)
  const [currentList, setCurrentList] = useState([])
  const [acacPlanNotDefinedList, setAcacPlanNotDefinedList] = useState([])
  const [completedList, setCompletedList] = useState([])
  const [eligibleStudentList, setEligibleStudentList] = useState([])
  const [notEligibleStudentList, setNotEligibleStudentList] = useState([])

  // const [searchModeOn, setSearchModeOn] = useState(false)

  const [internshipStatus, setInternshipStatus] = useState('')

  let searchModeViewControl = [internshipStatus, setInternshipStatus]

  const columns = [
    {field: 'StudentId', headerName: 'Student ID', width: 160},
    {field: 'Name', headerName: 'Student Name', width: 160},
    {field: 'AcadPlan', headerName: 'Academic Plan', width: 160},
    {field: 'AcadProg', headerName: 'Academic Programme', width: 160},
    {field: 'CumGpa', headerName: 'Cumulative GPA', width: 160},
  ]

  useEffect(()=>{
    if(Object.keys(internshipEligibilityList).length > 0){
      // const fullInternshipStatusLists = internshipEligibilityList.fullInternshipStatusList
      setAcacPlanNotDefinedList(internshipEligibilityList.acacPlanNotDefinedList)
      setCompletedList(internshipEligibilityList.completedList)
      setEligibleStudentList(internshipEligibilityList.eligibleStudentList)
      setNotEligibleStudentList(internshipEligibilityList.notEligibleStudentList)
      setIsLoading(false)
    }

  }, [context])

  useEffect(()=>{
    if(internshipStatus){
      switch(internshipStatus){
        case 'Academic Plan Not Defined':
          setCurrentList(acacPlanNotDefinedList)
          break
        case 'Completed':
          setCurrentList(completedList)
          break
        case 'Eligible':
          setCurrentList(eligibleStudentList)
          break
        case 'Not Eligible':
          setCurrentList(notEligibleStudentList)
      }
    }
  }, [internshipStatus, completedList])

  // const renderInternshipStatusList = () => {
  //   return(
  //     <Grid item xs={12}>
  //       <Paper
  //         sx={{
  //           p: 2,
  //           display: 'flex',
  //           flexDirection: 'column',
  //           height: 250,
  //         }}
  //       >
  //         <InternshipStatusList />
  //       </Paper>
  //     </Grid>
  //   )

  // }

  // useEffect(()=>{
  //   // internshipStatus == '' ? setSearchModeOn(false) : setSearchModeOn(true)
  // }, [])

  // console.log(completedList)
  // console.log(notEligibleStudentList)
  // console.log(internshipStatus)
  // console.log(currentList)
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
            <Grid container spacing={3}>
              
              {/* Search student for internship eligibility by name or id */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 250,
                  }}
                >
                  <SearchStudentForInternshipEligibility searchModeViewControl={searchModeViewControl} />

                  {/* {
                    //Target student(individual) internship eligibility
                    searchModeOn && <IndividualStudentInternshipEligibility />
                  } */}
                </Paper>
              </Grid>

              {
                // internshipStatus && <InternshipStatusTable rows={currentList} columns={columns}/>
                
                isLoading && internshipStatus ? 
                  <Grid item xs={12}>
                    <IsLoading />
                  </Grid>
                :
                  internshipStatus && <InternshipStatusTable rows={currentList} columns={columns}/>

              }

            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default InternshipReport