
import React, { useState } from 'react'
import {TableBody, TablePagination} from '@mui/material';
import {getComparator,stableSort} from './controller';
import Row from './CourseRow';
import { set } from 'date-fns';

const StudentEnrolments = (props) => {
  const {page,rowsPerPage} = props
  return (
 
      <TableBody>
          {(stableSort(props.rows,getComparator(props.order,props.orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(
            (row) =>( <Row key={row.Id+row.Term} row={row} setExpand={props.setExpand}/>)
          ))}
      </TableBody>

  )
}

export default StudentEnrolments