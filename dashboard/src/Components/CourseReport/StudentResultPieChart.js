import React, { PureComponent } from 'react';
import PieCharts from '../SharedComponent/PieCharts';
import { domesticInternationalStudent } from '../SharedComponent/RelatedFunctions';
import axios from 'axios';

const classModeCOLORS = ['#0088FE', '#00C49F'];
const ifPassedCOLORS = ['#FFBB28', '#FF8042'];

/**
 * Course Report Page > Pie chart Paper Content.
 * Display the filtered information pie charts - domestic student or international student; 
 *                                             - pass or failed
 * 
 * @param props 
 * @param {JSON list} courseStuInSem 
 *    JSON list that filtered the dashboard_st with specific course subject, course catalogue, 
 *    academic year and semester
 * @return {React.Fragment} 
 *    Display two Pie Charts
 */



export default class StudentsAndResult extends React.Component {


  constructor(props) {
    
    super(props);

    this.state = {
      domestic: 0,
      international: 0
    };

    
  }

  componentDidMount() {
    this.fetchStudentRatio()
  }
  
  // componentDidMount() {
  //   const semester = this.props.semStatus
  //   console.log(this.props.semStatus)
  //   console.log(this.props)
    
  //   let courseStuInSem = this.props.courseStuInSem;
  //   let failedStudent = courseStuInSem.filter(s => s.GpaPoint === 0);
  //   let passedStudentNumber = courseStuInSem.length - failedStudent.length;
  //   let [domesticStudentNumber, internationalStudentNumber] = domesticInternationalStudent(courseStuInSem);

  //   let ifPassedData = [
  //     { name: 'Passed', value: passedStudentNumber },
  //     { name: 'Failed', value: failedStudent.length},
  //   ];

  //   let classModeData = [
  //     { name: 'Domestics', value: domesticStudentNumber },
  //     { name: 'International', value: internationalStudentNumber },
  //   ];

  //   this.setState({
  //     ifPassedData: ifPassedData,
  //     classModeData: classModeData
  //   })

  //   console.log(this.state.classModeData)
  //   console.log(this.state.ifPassedData)
  // }

  

  componentDidUpdate(prevProps) {
    
    if(prevProps !== this.props){
      this.fetchStudentRatio()
    }
  }

  fetchStudentRatio = async () =>{
    if(this.props.catalogue &&
      this.props.subject &&
      this.props.semStatus
    ){
      const splitStr = this.props.semStatus.split(' ')
      const year = splitStr[0]
      const semester = splitStr[1]
      const param = {
        AcademicYear: year,
        Semester: semester,
        Subject: this.props.subject,
        Catalogue: this.props.catalogue 
      }

      await axios.post('/api/take/studentRatioForCourse', param)
      .then(res => {
        if(res.status === 200 && res.data){
        this.setState({
          domestic: res.data.Domestic,
          international: res.data.International
        })
      }
      })
    } else if(this.props.catalogue &&
      this.props.subject &&
      !this.props.semStatus){
        const param = {
          Subject: this.props.subject,
          Catalogue: this.props.catalogue 
        }
        await axios.post('/api/take/studentRatioForCourse', param)
          .then(res => {
            if(res.status === 200 && res.data){
            this.setState({
              domestic: res.data.Domestic,
              international: res.data.International
            })
          }
        })
      }
  }

  

  render() { 

    let courseStuInSem = this.props.courseStuInSem;
    let failedStudent = courseStuInSem.filter(s => s.GpaPoint === 0);
    let passedStudentNumber = courseStuInSem.length - failedStudent.length;
    
    // let [domesticStudentNumber, internationalStudentNumber] = domesticInternationalStudent(courseStuInSem);

    const ifPassedData = [
      { name: 'Passed', value: passedStudentNumber },
      { name: 'Failed', value: failedStudent.length},
    ];

    const classModeData = [
      { name: 'Domestics', value: this.state.domestic },
      { name: 'International', value: this.state.international },
    ];

    return (
        <>
          <PieCharts data={classModeData} COLORS={classModeCOLORS} PieChart_width={400}></PieCharts>
          <PieCharts data={ifPassedData} COLORS={ifPassedCOLORS} PieChart_width={400}></PieCharts>
        </>
    );
  }
}



