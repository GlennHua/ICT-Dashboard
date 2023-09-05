import React,{useState} from "react";
import Paper from '@mui/material/Paper';
import {tableTheme } from '../SharedComponent/AppBarDrawer';
import { ThemeProvider } from '@mui/material/styles';
import CollapsilbeTableHead from './StudentTableHead';
import StudentEnrolments from './StudentTableBody';
import Table from '@mui/material/Table';
import { TablePagination} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';


export default function StudentTable(props){

  console.log(props)
    const {rows} = props;
    const [order,setOrder] = useState('asc');
    const [orderBy,setOrderBy] = useState('AverageGpa');
    const [allOpen,setAllOpen] = useState(false);
    let setExpand = [allOpen,setAllOpen];
    const [page,setPage] = useState(0);
  const [rowsPerPage,setRowsPerPage] = useState(10);

  const handleChangePage = (event,newPage)=>{
    setPage(newPage);
  };

  const handleChangeRowsPerPage=(event)=>{
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const handleRequestSort = (event, property)=>{
    const isAsc = orderBy ===property && order ==='asc';
    setOrder(isAsc?'desc':'asc');
    setOrderBy(property);
  }

    return(
        <>
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table" >
             <ThemeProvider theme={tableTheme}>
                <CollapsilbeTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  setExpand={setExpand}
                />  
             </ThemeProvider>        
                <StudentEnrolments 
                  rows={rows} 
                  order={order} 
                  orderBy={orderBy}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  setExpand={setExpand}
                />
            </Table>
          </TableContainer>
           <TablePagination
           rowsPerPageOptions={[10, 25, 100]}
           component="div"
           count={props.rows.length}
           rowsPerPage={rowsPerPage}
           page={page}
           onPageChange={handleChangePage}
           onRowsPerPageChange={handleChangeRowsPerPage} >
       
           </TablePagination>
        </>
    )
   
}