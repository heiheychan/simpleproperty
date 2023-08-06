import { format } from "date-fns";

export const recordTableColumns = [
  {
    Header: "Property",
    accessor: "property.display_name",
    Cell: ({ cell, row }) => {
      return (
        <div className="flex flex-row gap-2 items-center">
          <div
            className="w-3 h-3 rounded-full border border-gray-500"
            style={{ backgroundColor: row.original.property.color }}
          ></div>
          {cell.value}
        </div>
      );
    },
    width: 100
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
        return (
          <div className="bg-green-600 rounded-lg px-2 py-1">
            <p className="text-white">
              +{cell.value.toLocaleString("en-US")}
            </p>
          </div>
        );
      } else {
        return (
          <div className="bg-red-600 rounded-lg px-2 py-1">
            <p className="text-white">
              -{cell.value.toLocaleString("en-US")}
            </p>
          </div>
        );
      }
    },
    width: 80,
  },
  {
    Header: "Notes",
    accessor: "notes",
    minWidth: 200,
  },
  {
    Header: "Happened on",
    accessor: "happened_on",
    Cell: ({ cell }) => format(new Date(cell.value), "MM/dd/yyyy"),
  },
];
