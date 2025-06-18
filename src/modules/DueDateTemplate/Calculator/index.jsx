import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConceptionDate from "./Method/ConceptionDate";
import LastPeriod from "./Method/LastPeriod";
import Ivf from "./Method/Ivf";
import Ultrasound from "./Method/Ultrasound";
import KnowDueDate from "./Method/KnowDueDate";
import DueDateCalculatorImage from "../../../assets/DueDateCalculator.jpg";

// Import các component cần thiết từ MUI
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function Calculator() {
  const navigate = useNavigate();
  const [calculationMethod, setCalculationMethod] = useState("lastPeriod");

  // Định nghĩa các state ở đây
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [conceptionDate, setConceptionDate] = useState("");

  // Hàm submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu ở đây, ví dụ:
    console.log({
      calculationMethod,
      lastPeriodDate,
      cycleLength,
      conceptionDate,
    });
    // Sau khi xử lý xong, điều hướng
    navigate("/dueDateResult");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        {/* Title */}
        <Typography variant="h2" fontWeight="bold" align="center" gutterBottom>
          Pregnancy Due Date Calculator
        </Typography>

        {/* Icon */}
        <Box display="flex" justifyContent="center" mb={4}>
          <img
            src={DueDateCalculatorImage}
            alt="Calendar Icon"
            style={{ width: 50 }}
          />
        </Box>

        {/* Form được bao bọc bởi Paper để tạo hiệu ứng nền */}
        <Paper elevation={3} className="p-5 mb-5" sx={{ bgcolor: "#E3F2FD" }}>
          <form onSubmit={handleSubmit}>
            {/* Calculation method */}
            <FormControl fullWidth margin="normal" className="mb-5">
              <InputLabel
                id="calculation-method-label"
                sx={{ fontSize: "1.5rem" }}
              >
                Calculation method
              </InputLabel>
              <Select
                labelId="calculation-method-label"
                id="calculationMethod"
                value={calculationMethod}
                label="Calculation method"
                onChange={(e) => setCalculationMethod(e.target.value)}
                className="bg-white fs-5"
              >
                <MenuItem value="lastPeriod">Last period</MenuItem>
                <MenuItem value="conceptionDate">Conception date</MenuItem>
                <MenuItem value="ivf">IVF</MenuItem>
                <MenuItem value="ultrasound">Ultrasound</MenuItem>
                <MenuItem value="knowDueDate">I know my due date</MenuItem>
              </Select>
            </FormControl>

            {/* Conditional Rendering các method */}
            {calculationMethod === "conceptionDate" && (
              <ConceptionDate
                conceptionDate={conceptionDate}
                setConceptionDate={setConceptionDate}
              />
            )}
            {calculationMethod === "lastPeriod" && (
              <LastPeriod
                lastPeriodDate={lastPeriodDate}
                setLastPeriodDate={setLastPeriodDate}
                cycleLength={cycleLength}
                setCycleLength={setCycleLength}
              />
            )}
            {calculationMethod === "ivf" && <Ivf />}
            {calculationMethod === "ultrasound" && <Ultrasound />}
            {calculationMethod === "knowDueDate" && <KnowDueDate />}

            {/* Nút Submit */}
            <Box mt={4} display="flex" justifyContent="start">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "50px",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.25rem",
                  bgcolor: "rgb(97, 94, 252)",
                }}
              >
                See your timeline
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
