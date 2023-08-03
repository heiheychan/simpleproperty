"use client";

import { useEffect, useState } from "react";
import DataTable from "./components/dataTable";
import KeyMetrics from "./components/keyMetrics";
import MainLayout from "./components/layouts/mainLayout";
import Modal from "./components/layouts/modal";
import AddRecordForm from "./components/forms/addRecordForm";
import axios from "axios";
import { recordTableColumns } from "./data/recordTableColumns";
import { useMemo } from "react";

export default function Home() {
  const [addMode, setAddMode] = useState(false);
  const [records, setRecords] = useState([]);
  const columns = useMemo(() => recordTableColumns, []);

  const fetchRecords = async () => {
    const response = await axios.get("/api/record");
    setRecords(response.data.response);
  };

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
        <div className="flex">
          <h2>Activities</h2>
          <input className="rounded-lg ml-4" />
          <input
            type="datetime-local"
            className="ml-4 rounded-lg px-4 text-black"
          />
        </div>
        <button
          className="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-br from-green-400 to-blue-600"
          onClick={() => setAddMode(true)}
        >
          Add Record
        </button>
      </div>
      <KeyMetrics />
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
