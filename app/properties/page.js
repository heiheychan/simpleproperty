"use client";

import { useEffect, useState } from "react";

import MainLayout from "../components/layouts/mainLayout";
import Modal from "../components/layouts/modal";
import AddPropertyForm from "./components/addPropertyForm";
import axios from "axios";
import Spinner from "../components/ui/Spinner";

export default function Properties() {
  const [modalOpen, setModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const response = await axios.get("/api/property");
      setLoading(false);
      setProperties(response.data);
    };

    fetchProperties();
  }, []);

  return (
    <MainLayout currentPage="properties">
      <Modal open={modalOpen} setOpen={setModalOpen} formName="Add a property">
        <AddPropertyForm setOpen={setModalOpen} />
      </Modal>
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
      <div className=" grid grid-cols-3 gap-2">
        {properties.length > 0 &&
          properties.map((property) => (
            <div
              className="border-2 h-64 rounded-lg flex flex-col justify-center items-center px-12 text-center border-gray-600"
            >
              <div className="flex flex-row gap-2 items-center mb-2">
                <div
                  className="h-4 w-4 rounded-full animate-pulse"
                  style={{ background: property.color }}
                ></div>
                <h3>{property.display_name}</h3>
              </div>
              <p>{property.address}</p>
              <p>Unit: {property.unit}</p>
              <div className="mt-6 flex justify-center gap-2 w-full">
                <button className="border-2 border-gray-800 rounded-lg px-3 py-1">
                  Edit
                </button>
                <button className="border-2 border-gray-800 rounded-lg px-3 py-1">
                  Delete
                </button>
              </div>
            </div>
          ))}
        <div
          className="border-2 h-64 rounded-lg border-gray-500 border-dashed flex justify-center items-center cursor-pointer text-center"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <p>+ Add a property</p>
        </div>
      </div>
    </MainLayout>
  );
}
