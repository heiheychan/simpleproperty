import { useState } from "react";
import AddRecordStepOne from "./addRecordStepOne";
import AddRecordStepTwo from "./addRecordStepTwo";

export default function AddRecordForm({ open, setOpen }) {
  const [step, setStep] = useState({
    stepIndex: 0,
  });
  const [formInputs, setFormInputs] = useState({
    property: false,
    transaction_type: "income",
    amount: "",
    type: "",
    happened_on: new Date(),
    notes: ""
  });

  const flipPage = (forward) => {
    if (forward) {
      if (step.stepIndex === 1) return;
      setStep((old) => {
        return { stepIndex: old.stepIndex + 1 };
      });
    } else {
      if (step.stepIndex === 0) return;
      setStep((old) => {
        return { stepIndex: old.stepIndex - 1 };
      });
    }
  };

  return (
    <div className="w-full sm:max-w-[390px]">
      {step.stepIndex === 0 && (
        <AddRecordStepOne
          setFormInputs={setFormInputs}
          flipPage={flipPage}
          open={open}
          formInputs={formInputs}
        />
      )}
      {step.stepIndex === 1 && (
        <AddRecordStepTwo
          formInputs={formInputs}
          setFormInputs={setFormInputs}
          flipPage={flipPage}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
