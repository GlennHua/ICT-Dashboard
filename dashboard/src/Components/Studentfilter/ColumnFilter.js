import React from 'react'

/** 
 * Filter the corresponding keywords according to the content filled in by the user 
 * in the corresponding column input box, acting on the overall table.
 * If the all the input box are empty, display all the filtered student details.
 */

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      Search:{' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}
