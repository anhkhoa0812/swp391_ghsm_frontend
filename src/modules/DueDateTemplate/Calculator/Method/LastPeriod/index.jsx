import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

export default function LastPeriod() {
  const [lastPeriodDate, setLastPeriodDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [cycleLength, setCycleLength] = useState("28");
  const cycleOptions = Array.from({ length: 26 }, (_, i) => i + 20);

  return (
    <>
      <div>
        <TextField
          type="date"
          id="lastPeriodDate"
          value={lastPeriodDate}
          onChange={(e) => setLastPeriodDate(e.target.value)}
          fullWidth
          variant="outlined"
          label=" When did your last period start?"
          className="mb-4 bg-white"
        />
      </div>

      <div>
        <InputLabel id="cycleLength-label" className="fs-4 mb-2">
          Cycle length
        </InputLabel>
        <Select
          labelId="cycleLength-label"
          id="cycleLength"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          className="bg-white"
        >
          {cycleOptions.map((day) => (
            <MenuItem key={day} value={day}>
              {day} days
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
}
