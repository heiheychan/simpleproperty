"use client";

import TopBanner from "@/app/components/topBanner";
import Input from "@/app/components/ui/Input";
import Spinner from "@/app/components/ui/Spinner";
import axios from "axios";
import { useState } from "react";
import validator from "validator";

export default function AddPropertyForm({ setOpen }) {
  const [formInputs, setFormInputs] = useState({
    display_name: "",
    address: "",
    unit: "",
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState([]);

  const onInputHandler = (e) => {
    const copyFormInputs = { ...formInputs };
    copyFormInputs[e.target.name] = e.target.value;
    setFormInputs(copyFormInputs);
  };

  const validationSchema = [
    {
      valid: validator.isLength(formInputs.display_name, { min: 1, max: 20 }),
      errorMessage: "The display name must be between 1 to 20 charaters",
    },
    {
      valid: validator.isLength(formInputs.address, { min: 1, max: 50 }),
      errorMessage: "The address must be between 1 to 50 charaters",
    },
    {
      valid: validator.isLength(formInputs.color, { min: 1, max: 10 }),
      errorMessage: "The display name is invalid",
    },
  ];

  const onSubmitHandler = async () => {
    let errors = [];

    validationSchema.forEach((ele) => {
      if (!ele.valid) {
        errors.push(ele.errorMessage);
      }
    });

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    const response = await axios.post("/api/property", {
      ...formInputs,
    });
    setLoading(false);
    if (response.status !== 200) {
      setErrors(["Fail to create a property"]);
    } else {
      setSuccess(["Created a property"]);
      window.location.href = "/properties";
    }
  };

  return (
    <>
      {errors.length > 0 && (
        <TopBanner
          messages={errors}
          setMessages={setErrors}
          color="bg-red-500"
        />
      )}
      {success.length > 0 && (
        <TopBanner
          messages={success}
          setMessages={setSuccess}
          color="bg-green-500"
        />
      )}
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
          {!loading ? "Add property" : <Spinner />}
        </button>
      </div>
    </>
  );
}
