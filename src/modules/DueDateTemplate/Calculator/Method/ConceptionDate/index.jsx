import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

export default function ConceptionDate() {
  const [conceptionDate, setConceptionDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <Box mt={2}>
      <TextField
        id="conceptionDate"
        label="When did you conceive?"
        type="date"
        value={conceptionDate}
        onChange={(e) => setConceptionDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        className="bg-white"
      />
    </Box>
  );
}
