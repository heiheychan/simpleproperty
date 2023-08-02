"use client";

import { useState } from "react";
import validator from "validator";

import { defaultIncomeTypes, defaultExpenseTypes } from "./defaultTypes";
import Input from "../ui/Input";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddRecordStepTwo({
  formInputs,
  setFormInputs,
  flipPage,
  setOpen,
}) {
  const [incomeTypes, setIncomeTypes] = useState(defaultIncomeTypes);
  const [expenseTypes, setExpenseTypes] = useState(defaultExpenseTypes);
  const setTypeHandler = (transaction_type) => {
    setFormInputs((old) => {
      return { ...old, transaction_type };
    });
  };

  const setValue = (val, key) => {
    const copyFormInputs = { ...formInputs };
    copyFormInputs[val] = key;
    setFormInputs(copyFormInputs);
  };

  const onInputHandler = (e) => {
    const copyFormInputs = { ...formInputs };
    copyFormInputs[e.target.name] = e.target.value;

    if (formInputs.transaction_type === "income") {
      const results = defaultIncomeTypes.filter((income) => {
        const lowerCaseIncome = income.description.toLowerCase();
        return lowerCaseIncome.includes(e.target.value.toLowerCase());
      });
      setIncomeTypes(results);
    } else {
      const results = defaultExpenseTypes.filter((expense) => {
        const lowerCaseExpense = expense.description.toLowerCase();
        return lowerCaseExpense.includes(e.target.value.toLowerCase());
      });
      setExpenseTypes(results);
    }

    setFormInputs(copyFormInputs);
  };

  const onSubmitHandler = async () => {
    let errors = [];
    const validationSchema = [
      {
        valid: validator.isIn(formInputs.transaction_type, [
          "income",
          "expense",
        ]),
        errorMessage: "Transaction type is not valid",
      },
      {
        valid: formInputs.property !== false,
        errorMessage: "Please select a property",
      },
      {
        valid: validator.isLength(formInputs.type, { min: 1, max: 20 }),
        errorMessage: "Type is not valid",
      },
      {
        valid: validator.isFloat(formInputs.amount, {
          min: 0.0,
          max: 1000000.0,
        }),
        errorMessage: "Amount is not valid",
      },
    ];

    validationSchema.forEach((ele) => {
      if (!ele.valid) {
        toast.error(ele.errorMessage);
        errors.push(!ele.valid);
      }
    });

    if (errors.length > 0) {
      return;
    }

    const response = await axios.post("/api/record", {
      ...formInputs,
      property: formInputs.property.id,
    });

    if (response.status === 200) {
      toast.success("Created a record");
      setOpen(false);
    }
  };

  return (
    <>
      <div className="px-6 py-3 border-b-2 border-gray-800">
        <div className="flex flex-row mb-2">
          <p>
            Selected:{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => flipPage(false)}
            >
              {formInputs && formInputs.property.display_name}
            </span>
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg flex flex-row justify-around">
          <div
            className={`${
              formInputs.transaction_type === "income" && "bg-gray-500"
            } basis-1/2 text-center px-4 py-2 rounded-lg cursor-pointer`}
            onClick={() => {
              setTypeHandler("income");
            }}
          >
            Income
          </div>
          <div
            className={`${
              formInputs.transaction_type === "expense" && "bg-gray-500"
            } basis-1/2 text-center px-4 py-2 rounded-lg cursor-pointer`}
            onClick={() => {
              setTypeHandler("expense");
            }}
          >
            Expense
          </div>
        </div>
        <div className="flex flex-col py-4">
          <Input
            label="Type"
            type="text"
            placeholder={
              formInputs.transaction_type === "income"
                ? "Rental income"
                : "Maintenance"
            }
            name="type"
            value={formInputs.type}
            onChangeHandler={onInputHandler}
            suggestions={
              formInputs.transaction_type === "income"
                ? incomeTypes
                : expenseTypes
            }
            setValue={setValue}
          />
          <Input
            label="Amount ($)"
            type="number"
            placeholder={
              formInputs.transaction_type === "income" ? "5000" : "320"
            }
            value={formInputs.amount}
            onChangeHandler={onInputHandler}
            name="amount"
          />

          <Input
            label="Notes"
            type="text"
            placeholder={
              formInputs.transaction_type === "income"
                ? "On time!"
                : "The AC is fixed but the dishwasher might need fixing"
            }
            value={formInputs.notes}
            onChangeHandler={onInputHandler}
            name="notes"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between p-6">
        <button
          className="h-12 px-4 py-2 rounded-lg border border-gray-800"
          onClick={() => flipPage(false)}
        >
          Back
        </button>
        <button
          className="px-6 py-2 flex justify-center items-center text-sm font-bold rounded-lg bg-gradient-to-r from-teal-200 to-lime-200 text-gray-700"
          onClick={onSubmitHandler}
        >
          All set!
        </button>
      </div>
    </>
  );
}
