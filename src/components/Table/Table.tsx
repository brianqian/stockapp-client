/* eslint-disable no-nested-ternary */
import React from 'react';
import { useTable, useSortBy, useResizeColumns, useBlockLayout } from 'react-table';
import styled from 'styled-components';
import { format } from 'date-fns';

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;

function Table({ columns, data }: { columns: any; data: any }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 250,
      maxWidth: 700,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  );

  return (
    <>
      <div>
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => {
                    const currentRowName = cell.row.values.rowName;
                    const currentColumnDate = cell.column.id;
                    const links = ['Link', 'Final Link'];
                    if (links.includes(currentRowName)) {
                      return (
                        <div {...cell.getCellProps()}>
                          <a href={cell.row.values[currentColumnDate]}>Link</a>
                        </div>
                      );
                    }
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const TableComponent = ({ data, columns }: { columns: any; data: any }) => {
  const columnsToRender = React.useMemo(() => columns, [columns]);
  const memoData = React.useMemo(() => data, [data]);
  console.log('Data as received by table', { columnsToRender, memoData, data, columns });
  return (
    <Styles>
      <Table columns={columnsToRender} data={memoData} />
    </Styles>
  );
};

export default TableComponent;
