import { format } from "date-fns";

export const recordTableColumns = [
  {
    Header: "Property",
    accessor: "property.display_name",
    Cell: ({ cell, row }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <div
            className="w-3 h-3 rounded-full border border-gray-900"
            style={{ backgroundColor: row.original.property.color }}
          ></div>
          {cell.value}
        </div>
      );
    },
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ cell, row }) => {
      const tran_type = row.original.transaction_type;
      if (tran_type === "income") {
        return <p className="text-green-500">+{cell.value}</p>;
      } else {
        return <p className="text-red-500">-{cell.value}</p>;
      }
    },
  },
  {
    Header: "Notes",
    accessor: "notes",
    minWidth: 200
  },
  {
    Header: "Happened on",
    accessor: "happened_on",
    Cell: ({ cell }) => format(new Date(cell.value), "MM/dd/yyyy"),
  },
  {
    Header: "Updated at",
    accessor: "updated_at",
    Cell: ({ cell, row }) => format(new Date(cell.value), "MM/dd/yyyy"),
  },
];
