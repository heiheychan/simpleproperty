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
      <div className="grow overflow-scroll text-sm">
        <table
          className="w-full text-left bg-gray-800 rounded-lg mb-4"
          {...getTableProps()}
        >
          <thead className="border-b">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeadProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeadProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...restHeaderProps } = column.getHeaderProps({
                      style: {
                        minWidth: column.minWidth,
                        width: column.width,
                      },
                    });

                    return (
                      <th className="px-4 py-2" key={key} {...restHeaderProps}>
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr
                  className="border-b border-gray-700 last:border-0"
                  key={key}
                  {...restRowProps}
                >
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td className="px-4 py-2" key={key} {...restCellProps}>
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
