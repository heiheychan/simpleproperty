import { useState } from "react";
import { useTable, useGlobalFilter } from "react-table";

export default function DataTable({ data, columns }) {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );
  const { globalFilter } = state;

  return (
    <>
      <input
        className="w-full mb-4 px-4 py-2 border rounded-lg bg-gray-100 text-black"
        placeholder="Search by the amount and summary"
        value={globalFilter}
        onChange={(e) => {
          setGlobalFilter(e.target.value);
        }}
      ></input>
      <div className="grow overflow-scroll">
        <table
          className="w-full text-left bg-gray-800 rounded-lg mb-4"
          {...getTableProps()}
        >
          <thead className="border-b">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    className="px-4 py-2"
                    {...column.getHeaderProps({
                      style: { minWidth: column.minWidth, width: column.width },
                    })}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr className="border-b border-gray-700 last:border-0" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="px-4 py-2" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button className="px-4 border rounded-lg h-8 text-sm">
            Export all fitlered
          </button>
        </div>
      </div>
    </>
  );
}
