import React, { useMemo } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy,usePagination } from 'react-table';
import { COLUMNSDB } from './columnsDB';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

// function processData(jsonData) - make sure the incoming filtered JSON can be used for useMemo() function

function processData(jsonData) {
  const result = Object.keys(jsonData).map((key) => { 
    return jsonData[key];
  });
  return result;
}

/**
 * Student Detail Page > Filtering Table Paper Content.
 * Get and display the filtered student details with specific filter condition.
 * 
 * useMemo Hook - memoize function and declare dependencies for its second parameter, 
 *                which will cause the function to only run when its dependencies have changed.
 * 
 * @param {JSON list} courseStuInSem 
 *       A filtered JSON where with specific courseName (subject and catalogue), AcademicYear and Semester
 * 
 * @return {React.Fragment} - <></> for short syntax - Display the filtered student details.
 */

export default function FilteringTable(courseStuInSem) {
  const columns = useMemo(() => COLUMNSDB, []);
  const data = useMemo(() => processData(courseStuInSem), [courseStuInSem])[0];

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize,
    prepareRow,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  )
  
  const { globalFilter, pageIndex, pageSize } = state

  return (
    <>
      {/* Search dialog */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      
      <table {...getTableProps()}>
        {/* Header */}
        <thead>
          {headerGroups.map((headerGroup,index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column,index) => (
                <th key={index} >{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Filter box for ASC / DESC / original sort option */}
        <thead>
          {headerGroups.map((headerGroup,index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column,index) => (
                <th key={index} {...column.getHeaderProps(column.getSortByToggleProps({ title: "Click to sort ASC / DESC / original" }))}>
                  <div style={{display: 'inline'}}>{column.canFilter ? column.render('Filter') : null}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ' '}
                </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Filtered Student details */}
        <tbody {...getTableBodyProps()}>
          {rows.map((row,index) => {
            prepareRow(row)
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell,index) => {
                  return <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <div style={{padding: "5px"}}>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <span>
          {' '}Page{' '}
          <strong>
            {pageIndex +1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select 
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        >
        {[10, 25, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
        </select>
        {' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
      </div>
    </>
  )
}
