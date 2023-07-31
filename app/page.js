import DataTable from "./components/dataTable";
import KeyMetrics from "./components/keyMetrics";
import MainLayout from "./components/layouts/mainLayout";

export default function Home() {
  return (
    <MainLayout currentPage="activities">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <h2>Activities</h2>
          <input className="rounded-lg ml-4" />
          <input
            type="datetime-local"
            className="ml-4 rounded-lg px-4 text-black"
          />
        </div>
        <button className="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-br from-green-400 to-blue-600">
          Add Record
        </button>
      </div>
      <KeyMetrics />
      {/* Table section */}
      <div className="grow overflow-scroll flex flex-col">
        <div className="flex mb-4 items-center">
          <h4>All Records</h4>
          <h4 className="ml-4 text-gray-700">Recurring</h4>
        </div>
        <DataTable />
      </div>
    </MainLayout>
  );
}
