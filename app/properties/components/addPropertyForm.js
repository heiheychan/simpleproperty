"use client";

import Input from "@/app/components/ui/Input";
import Spinner from "@/app/components/ui/Spinner";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

export default function AddPropertyForm({ open, setOpen }) {
  const [formInputs, setFormInputs] = useState({
    display_name: "",
    address: "",
    unit: "",
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  });
  const [loading, setLoading] = useState(false);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({ debounce: 500 });

  useEffect(() => {
    setFormInputs({
      display_name: "",
      address: "",
      unit: "",
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    });
    getPlacePredictions("")
  }, [open]);

  const onInputHandler = (e) => {
    const copyFormInputs = { ...formInputs };
    copyFormInputs[e.target.name] = e.target.value;
    setFormInputs(copyFormInputs);
  };

  const onAddressInputHandler = (e) => {
    const copyFormInputs = { ...formInputs };
    getPlacePredictions({ input: e.target.value });
    copyFormInputs[e.target.name] = e.target.value;
    setFormInputs(copyFormInputs);
  };

  const onSubmitHandler = async () => {
    const validationSchema = [
      {
        valid: validator.isLength(formInputs.display_name, { min: 1, max: 20 }),
        errorMessage: "The display name is invalid",
      },
      {
        valid: validator.isLength(formInputs.address, { min: 1, max: 50 }),
        errorMessage: "The address is invalid",
      },
      {
        valid: validator.isLength(formInputs.color, { min: 1, max: 10 }),
        errorMessage: "The color is invalid",
      },
    ];
    let errors = [];

    validationSchema.forEach((ele) => {
      if (!ele.valid) {
        toast.error(ele.errorMessage);
        errors.push(ele.errorMessage);
      }
    });

    if (errors.length > 0) {
      return;
    }

    setLoading(true);
    const response = await axios.post("/api/property", {
      ...formInputs,
    });
    setLoading(false);
    if (response.status !== 200) {
      toast.error("Failed to create a property");
    } else {
      toast.success("Created a property");
      setFormInputs({
        display_name: "",
        address: "",
        unit: "",
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
      setOpen(false);
    }
  };

  return (
    <>
      <div className="p-6 border-b-2 border-gray-800">
        <Input
          type="text"
          name="display_name"
          label="Display name"
          placeholder="93 18th St."
          onChangeHandler={onInputHandler}
          value={formInputs.display_name}
        />
        <Input
          type="text"
          name="address"
          label="Address"
          placeholder="93 18th Street, Jersey City, NJ 07310"
          onChangeHandler={onAddressInputHandler}
          setValue={setFormInputs}
          value={formInputs.address}
          loading={isPlacePredictionsLoading}
          suggestions={placePredictions}
          setSuggestions={getPlacePredictions}
        />
        <Input
          type="text"
          name="unit"
          label="Unit"
          placeholder="Unit. 811"
          onChangeHandler={onInputHandler}
          value={formInputs.unit}
        />
        <Input
          type="color"
          name="color"
          label="Color"
          onChangeHandler={onInputHandler}
          value={formInputs.color}
        />
      </div>
      <div className="flex flex-row justify-between p-6">
        <button
          className="h-12 px-4 py-2 rounded-lg border border-gray-800"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 flex justify-center items-center text-sm font-bold rounded-lg bg-gradient-to-r from-teal-200 to-lime-200 text-gray-700"
          onClick={onSubmitHandler}
        >
          {!loading ? "Add property" : <Spinner />}
        </button>
      </div>
    </>
  );
}
