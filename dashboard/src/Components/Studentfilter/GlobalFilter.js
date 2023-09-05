import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { Tooltip } from '@mui/material';

/** 
 * Search box function above the table
 * Enter any text in the input box, and filter out the corresponding content 
 * in the table, not limited to columns.
 * If the search box is empty, display all the filtered student details.
 */

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <div style={{padding: "5px"}}>
      Search:{' '}
      <Tooltip title="Enter any text to globally filter" placement="top">
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      </Tooltip>
    </div>
  )
}
