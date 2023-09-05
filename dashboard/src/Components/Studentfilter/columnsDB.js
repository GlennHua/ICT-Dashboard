import { ColumnFilter } from './ColumnFilter'

/**
 * JSON list - COLUMNSDB and GROUPED_COLUMNSDB
 *           - Header - display header in the webapp;
 *             accessor - corresponding JSON key in the MongoDB database dummy data
 */

export const COLUMNSDB = [
  {
    Header: 'Id',
    accessor: 'Id',
    sticky: 'left',
    Filter: ColumnFilter,
  },
  {
    Header: 'First Name',
    accessor: 'FirstName',
    sticky: 'left',
    Filter: ColumnFilter,
  },
  {
    Header: 'Last Name',
    accessor: 'LastName',
    sticky: 'left',
    Filter: ColumnFilter,
  },
  {
    Header: 'Gender',
    accessor: 'Gender',
    sticky: 'left',
    Filter: ColumnFilter,
  },
  {
    Header: 'Acad Plan',
    accessor: 'AcadPlan',
    sticky: 'left',
    Filter: ColumnFilter,
  },
  {
    Header: 'Grade',
    accessor: 'Grade',
    sticky: 'left',
    Filter: ColumnFilter,
  },
  {
    Header: 'Gpa Point',
    accessor: 'GpaPoint',
    sticky: 'left',
    Filter: ColumnFilter,
  },
  {
    Header: 'Status',
    accessor: 'ResStatus',
    Filter: ColumnFilter,
  },
  {
    Header: 'Email',
    accessor: 'StudentEmail',
    Filter: ColumnFilter,
  }
]

export const GROUPED_COLUMNSDB = [
  {
    Header: 'Id',
    accessor: 'Id'
  },
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'FirstName'
      },
      {
        Header: 'Last Name',
        accessor: 'LastName'
      }
    ]
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Gender',
        accessor: 'Gender'
      },
      {
        Header: 'Acad Plan',
        accessor: 'AcadPlan'
      },
      {
        Header: 'Grade',
        accessor: 'Grade'
      },
      {
        Header: 'Gpa Point',
        accessor: 'GpaPoint'
      },
      {
        Header: 'Status',
        accessor: 'ResStatus'
      },
      {
        Header: 'Email',
        accessor: 'StudentEmail'
      }
    ]
  }
]
