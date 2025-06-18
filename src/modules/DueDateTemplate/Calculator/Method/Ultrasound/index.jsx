import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

export default function Ultrasound() {
  const [ultrasound, setUltrasound] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ultrasoundWeeksLength, setUltrasoundWeeksLength] = useState("6");
  const ultrasoundWeeksOption = Array.from({ length: 24 }, (_, i) => i + 1);
  const [ultrasoundDaysLength, setUltrasoundDaysLength] = useState("0");
  const ultrasoundDaysOption = Array.from({ length: 7 }, (_, i) => i + 0);

  return (
    <>
      <div>
        <InputLabel className="fs-4 mb-2">Date of ultrasound</InputLabel>
        <TextField
          type="date"
          id="ultrasound"
          value={ultrasound}
          onChange={(e) => setUltrasound(e.target.value)}
          fullWidth
          variant="outlined"
          className="bg-white mb-5"
        />

        <div className="row mt-4">
          <div className="col">
            <FormControl fullWidth>
              <InputLabel id="weeks-label" className="fs-4">
                Weeks
              </InputLabel>
              <Select
                labelId="weeks-label"
                id="weeks"
                value={ultrasoundWeeksLength}
                onChange={(e) => setUltrasoundWeeksLength(e.target.value)}
                className="bg-white"
              >
                {ultrasoundWeeksOption.map((week) => (
                  <MenuItem key={week} value={week}>
                    {week} weeks
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth>
              <InputLabel id="days-label" className="fs-4">
                Days
              </InputLabel>
              <Select
                labelId="days-label"
                id="days"
                value={ultrasoundDaysLength}
                onChange={(e) => setUltrasoundDaysLength(e.target.value)}
                className="bg-white"
              >
                {ultrasoundDaysOption.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day} days
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
}
