import React from "react";
import { TableHead,TableRow,TableCell,TableSortLabel, IconButton } from "@mui/material";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

const headCells=[
    {id:'Name',numeric:false,disablePadding:false,label:"Name"},
    {id:'Id',numeric:true,disablePadding:false,label:"ID"},
    {id:'Gender',numeric:false,disablePadding:false,label:"Gender"},
    {id:'AverageGpa',numeric:true,disablePadding:false,label:"Average GPA"},
    {id:'Email',numeric:false,disablePadding:false,label:"Email"},
  ];
 
export default function CollapsilbeTableHead(props){
  
    const {order,orderBy,onRequestSort,setExpand} = props;
    const[allOpen,setAllOpen] = setExpand;

    const clickExpand=()=>{
      setAllOpen(!allOpen);
    }
    const createSortHandler = (property)=>(event)=>{
      onRequestSort(event,property)
    } ;
    return(
      <TableHead>
        <TableRow>
        <TableCell>
          <IconButton 
            size="small"
            onClick={clickExpand}>
          <UnfoldMoreIcon/>
          </IconButton>
        </TableCell>
              {headCells.map((headCell)=>( 
                <TableCell
                  key = {headCell.id}
                  align='center'
                  padding = {headCell.disablePadding?'none':'normal'}
                  sortDirection = {orderBy === headCell.id?order:false}>
                    <TableSortLabel
                    active={orderBy===headCell.id}
                    direction={orderBy ===headCell.id?order:'asc'}
                    onClick={createSortHandler(headCell.id)}>
                      {headCell.label}
                    </TableSortLabel>
                </TableCell>)
               
              )}
        </TableRow>
      </TableHead>
    );
  }
  