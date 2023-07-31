"use client";

import Input from "@/app/components/ui/Input";
import Spinner from "@/app/components/ui/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

export default function EditPropertyForm({ property, open, setOpen }) {
  const [formInputs, setFormInputs] = useState({
    display_name: "",
    address: "",
    unit: "",
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormInputs({
      display_name: property.display_name,
      address: property.address,
      unit: property.unit,
      color: property.color,
    });
  }, [open]);

  const onInputHandler = (e) => {
    const copyFormInputs = { ...formInputs };
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
    // Need to add the update API
    // const response = await axios.post("/api/property", {
    //   ...formInputs,
    // });
    setLoading(false);
    if (response.status !== 200) {
      toast.error("Failed to edit a property");
    } else {
      toast.success("Edited a property");
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
          onChangeHandler={onInputHandler}
          value={formInputs.address}
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
          {!loading ? "Edit property" : <Spinner />}
        </button>
      </div>
    </>
  );
}
