"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import MainLayout from "../components/layouts/mainLayout";
import Modal from "../components/layouts/modal";
import AddPropertyForm from "./components/addPropertyForm";
import Spinner from "../components/ui/Spinner";
import EditPropertyForm from "./components/editPropertyForm";

export default function Properties() {
  const [modalOpen, setModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    const response = await axios.get("/api/property");
    setLoading(false);
    setProperties(response.data);
  };

  useEffect(() => {
    fetchProperties();
    if (modalOpen === false) {
      setEditing(false);
    }
  }, [modalOpen]);

  const propertyDeleteHandler = async (id) => {
    setLoading(true);
    const response = await axios.delete("/api/property/" + String(id));
    setLoading(false);
    if (response.status !== 200) {
      toast.error("Failed to delete a property");
    } else {
      toast.success("Deleted a property");
      fetchProperties();
    }
  };

  const editFormHandler = (id) => {
    const result = properties.filter((property) => {
      return property.id === id;
    });
    
    setEditing(result[0])
    setModalOpen(true);
  };

  return (
    <MainLayout currentPage="properties">
      {!editing && (
        <Modal
          open={modalOpen}
          setOpen={setModalOpen}
          formName="Add a property"
        >
          <AddPropertyForm open={modalOpen} setOpen={setModalOpen} />
        </Modal>
      )}
      {editing && (
        <Modal
          open={modalOpen}
          setOpen={setModalOpen}
          formName="Edit a property"
        >
          <EditPropertyForm
            property={editing}
            open={modalOpen}
            setOpen={setModalOpen}
          />
        </Modal>
      )}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <h2>Properties</h2>
          {loading && <Spinner />}
        </div>
        <button
          className="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-br from-green-400 to-blue-600"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add Property
        </button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {properties.length > 0 &&
          properties.map((property) => (
            <div
              key={property.id}
              className="border-2 h-64 rounded-lg flex flex-col justify-center items-center px-12 text-center border-gray-600"
            >
              <div className="flex flex-row gap-2 items-center mb-2">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ background: property.color }}
                ></div>
                <h4>{property.display_name}</h4>
              </div>
              <p>{property.address}</p>
              <p>Unit: {property.unit === "" ? "-" : property.unit}</p>
              <div className="mt-6 flex justify-center gap-2 w-full">
                <button
                  className="border-2 text-slate-500 border-slate-500 rounded-lg px-2 py-1"
                  onClick={() => {
                    editFormHandler(property.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="border-2 text-red-500 border-red-500 rounded-lg px-2 py-1"
                  onClick={() => {
                    propertyDeleteHandler(property.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        <div
          className="border-2 h-64 rounded-lg border-gray-500 border-dashed flex justify-center items-center cursor-pointer text-center"
          onClick={() => {
            setEditing(false);
            setModalOpen(true);
          }}
        >
          <p>+ Add a property</p>
        </div>
      </div>
    </MainLayout>
  );
}
