"use client"

import axios from "axios";
import { toast } from "react-toastify";

export default function DangerZone() {
  const deleteAllRecords = async () => {
    const response = await axios.delete("/api/record");
    if (response.status === 200) {
      toast.success("Deleted all records")
    } else {
      toast.error("Failed to delete records")
    }
  }
  
  const onClickHandler = () => {
    deleteAllRecords()
  }

  return (
    <div>
      <h1>Danger Zone</h1>
      <button className="rounded-lg px-4 py-2 border border-red-500" onClick={onClickHandler}>
        Delete Records
      </button>
    </div>
  );
}
