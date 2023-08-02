import { format } from "date-fns";

export const recordTableColumns = [
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ cell, row }) => {
      const tran_type = row.original.transaction_type;
      console.log("recordTableColumns - accessing data", tran_type);
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
  },
  {
    Header: "Created at",
    accessor: "created_at",
    Cell: ({ cell, row }) => format(new Date(cell.value), "MM/dd/yyyy"),
  },
  {
    Header: "Updated at",
    accessor: "updated_at",
    Cell: ({ cell, row }) => format(new Date(cell.value), "MM/dd/yyyy"),
  },
];
