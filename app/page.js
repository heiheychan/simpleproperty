"use client";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { MultiSelect } from "react-multi-select-component";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { format } from "date-fns";
import { toast } from "react-toastify";

import DataTable from "./components/dataTable";
import KeyMetrics from "./components/keyMetrics";
import MainLayout from "./components/layouts/mainLayout";
import Modal from "./components/layouts/modal";
import AddRecordForm from "./components/forms/addRecordForm";
import { recordTableColumns } from "./data/recordTableColumns";
import { metricsCalculator } from "@/lib/metricsCalculator";

export default function Home() {
  const [addMode, setAddMode] = useState(false);
  const [records, setRecords] = useState([]);
  const [metrics, setMetrics] = useState({
    income: 0,
    expense: 0,
    net: 0,
  });
  const [selected, setSelected] = useState([]);
  const [dateRange, setDateRange] = useState([
    new Date(new Date().getFullYear(), 0, 1),
    new Date(),
  ]);
  const [propertyList, setPropertyList] = useState([]);
  const columns = useMemo(() => recordTableColumns, []);
  const [exportData, setExportData] = useState([]);

  const fetchRecords = async () => {
    let searchParamsString = "";
    let searchParams = [];

    if (selected && selected.length > 0) {
      let tempArray = [];
      selected.forEach((property) => {
        tempArray.push(String(property.value));
      });
      searchParams.push("property=" + tempArray.join("_"));
    }

    if (dateRange && dateRange[0]) {
      searchParams.push(
        `startdate=${String(format(new Date(dateRange[0]), "yyyy-MM-dd"))}`
      );
    }

    if (dateRange && dateRange[1]) {
      searchParams.push(
        `enddate=${String(format(new Date(dateRange[1]), "yyyy-MM-dd"))}`
      );
    }

    if (searchParams) {
      searchParamsString = `?${searchParams.join("&")}`;
    }

    const response = await axios.get(`/api/record${searchParamsString}`);
    setRecords(response.data.response);

    const csvData = [
      [
        "id",
        "property",
        "transaction_type",
        "type",
        "amount",
        "notes",
        "happned_on",
        "created_at",
        "updated_at",
      ],
      ...response.data.response.map((ele) => [
        ele.id,
        ele.property.display_name,
        ele.transaction_type,
        ele.type,
        ele.amount,
        ele.notes,
        ele.happened_on,
        ele.created_at,
        ele.updated_at,
      ]),
    ];
    setExportData(csvData);
    const [income, expense, net] = metricsCalculator(response.data.response);
    setMetrics({
      income,
      expense,
      net,
    });
  };

  const fetchProperties = async () => {
    const options = [];
    const response = await axios.get("api/property");

    response.data.forEach((property) => {
      options.push({
        label: property.display_name,
        value: property.id,
      });
    });

    setPropertyList(options);
    setSelected(options);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (addMode === false) {
      onFilterHandler();
    }
  }, [addMode, propertyList]);

  const onFilterHandler = () => {
    fetchRecords();
  };

  const deleteRecordHandler = async (id) => {
    const response = await axios.delete(`/api/record/${id}`);
    if (response.status === 200) {
      toast.success("Record deleted");
      window.location.reload();
    }
  };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Action",
        Cell: ({ row }) => {
          return (
            <div
              className="text-red-500 border border-red-500 rounded-lg px-2 py-1 w-[50%] cursor-pointer"
              onClick={() => {
                deleteRecordHandler(row.original.id);
              }}
            >
              Delete
            </div>
          );
        },
      },
    ]);
  };

  return (
    <MainLayout currentPage="activities">
      {addMode && (
        <Modal formName="Add Record" open={addMode} setOpen={setAddMode}>
          <AddRecordForm open={addMode} setOpen={setAddMode} />
        </Modal>
      )}
      <div className="flex flex-row justify-between mb-4">
        <div className="flex gap-2">
          <h2>Activities</h2>
          <MultiSelect
            className="w-[30%]  text-gray-800 rounded-none"
            options={propertyList}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
          <DateRangePicker
            className="h-[40px] bg-white text-gray-800"
            calendarClassName="text-gray-800 rounded-lg"
            onChange={setDateRange}
            value={dateRange}
          />
          <button
            className="px-4 py-2 rounded-lg border-2 border-gray-500"
            onClick={onFilterHandler}
          >
            Filter
          </button>
        </div>
        <button
          className="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-br from-green-400 to-blue-600"
          onClick={() => setAddMode(true)}
        >
          Add Record
        </button>
      </div>
      <KeyMetrics
        income={metrics.income}
        expense={metrics.expense}
        net={metrics.net}
      />
      {/* Table section */}
      <div className="grow flex flex-col overflow-scroll">
        <div className="flex mb-4 items-center">
          <h4>All Records</h4>
          {/* <h4 className="ml-4 text-gray-700">Recurring</h4> */}
        </div>
        {records && (
          <DataTable
            tableHooks={tableHooks}
            data={records}
            columns={columns}
            exportData={exportData}
          />
        )}
      </div>
    </MainLayout>
  );
}
