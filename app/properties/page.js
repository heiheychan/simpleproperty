import DataTable from "../components/dataTable";
import MainLayout from "../components/layouts/mainLayout";
import Modal from "../components/layouts/modal";

export default function Properties() {
  return (
    <MainLayout currentPage="properties">
      {/* Modal */}
      <Modal hidden={true}>
        <p>hihi</p>
      </Modal>
      <div className="flex justify-between mb-4">
        <div className="flex">
          <h2>Properties</h2>
        </div>
        <button class="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-br from-green-400 to-blue-600">
          Add Property
        </button>
      </div>
      <div className=" grid grid-cols-3 gap-2">
        <div className="border-2 h-64 rounded-lg border-gray-500 border-dashed flex justify-center items-center cursor-pointer text-center"><p>+ Add a property</p></div>
      </div>
    </MainLayout>
  );
}
