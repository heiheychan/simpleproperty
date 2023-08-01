"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

export default function AddRecordStepOne({
  setFormInputs,
  flipPage,
  formInputs,
}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    const response = await axios.get("/api/property");
    setProperties(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, [formInputs]);

  const onSelectPropertyHandler = (property) => {
    setFormInputs((old) => {
      return { ...old, property };
    });
    flipPage(true);
  };

  return (
    <>
      <div className="px-6 py-3  border-gray-800">
        <h6 className="mb-2">Select a property:</h6>
        {loading && <Spinner />}
        {!loading && properties.length > 0 && (
          <div className="flex flex-col max-h-[390px] overflow-y-scroll">
            {properties.map((property) => (
              <div
                key={property.id}
                className={`${
                  property.id === formInputs.property.id
                    ? "border-gray-500"
                    : "border-gray-800"
                } px-6 py-3 rounded-lg border-2  mb-2 cursor-pointer`}
                onClick={() => onSelectPropertyHandler(property)}
              >
                <div className="flex flex-row gap-2 items-center mb-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ background: property.color }}
                  ></div>
                  <h6>{property.display_name}</h6>
                </div>
                <div className="flex flex-row flex-nowrap">
                  <p className="text-sm text-ellipsis overflow-clip whitespace-nowrap">
                    {property.address} {"("}Unit:{" "}
                    {property.unit === "" ? "-" : property.unit}
                    {")"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
