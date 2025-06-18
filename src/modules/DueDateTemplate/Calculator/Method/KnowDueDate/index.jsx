import { TextField } from "@mui/material";
import React, { useState } from "react";

export default function KnowDueDate() {
  const [knowDueDate, setKnowDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <>
      <div>
        <label className="block mb-2 font-semibold">
          What's your due date?
        </label>
        <TextField
          type="date"
          value={knowDueDate}
          onChange={(e) => setKnowDueDate(e.target.value)}
          fullWidth
          className="bg-white"
        />
      </div>
    </>
  );
}
