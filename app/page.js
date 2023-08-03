"use client";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DataTable from "./components/dataTable";
import KeyMetrics from "./components/keyMetrics";
import MainLayout from "./components/layouts/mainLayout";
import Modal from "./components/layouts/modal";
import AddRecordForm from "./components/forms/addRecordForm";
import axios from "axios";
import { recordTableColumns } from "./data/recordTableColumns";
import { useMemo } from "react";
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

  const fetchRecords = async () => {
    const response = await axios.get("/api/record");
    setRecords(response.data.response);
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
      fetchRecords();
    }
  }, [addMode]);

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
            className=" bg-white text-black"
            calendarClassName="text-black rounded-lg"
            onChange={setDateRange}
            value={dateRange}
          />
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
          <h4 className="ml-4 text-gray-700">Recurring</h4>
        </div>
        {records && <DataTable data={records} columns={columns} />}
      </div>
    </MainLayout>
  );
}
