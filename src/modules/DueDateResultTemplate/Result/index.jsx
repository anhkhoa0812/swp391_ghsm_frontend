import React from "react";
import avatarImage from "../../../assets/images/avatar.png";
import DueDateCalculatorImage from "../../../assets/DueDateCalculator.jpg";
import LightImage from "../../../assets/light.jpg";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import PregnancyTimeline from "../PregnancyTimeline";

export default function Result() {
  return (
    <Box mt={5}>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Your baby's due date is
      </Typography>

      <Box display="flex" alignItems="center" mb={3}>
        <div className="row">
          <div className="col-2">
            <img className="w-15" src={avatarImage} alt="Written by" />
          </div>
          <div className="col">
            <Typography variant="subtile-1">
              Written by Pregnancy Care Staff | Dec 12, 2024
            </Typography>
          </div>
        </div>
      </Box>

      <Card sx={{ bgcolor: "#E3F2FD", p: 3, borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src={DueDateCalculatorImage}
              alt="Due Date Calculator"
              width={80}
            />
          </Box>

          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Congrats! Your due date is
          </Typography>

          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            color="primary"
            gutterBottom
          >
            November 24, 2025
          </Typography>

          <Box display="flex" justifyContent="center" mb={2}>
            <img src={LightImage} alt="Light" width={30} />
          </Box>

          <Typography variant="h5" textAlign="center">
            Download our free app to track your pregnancy and baby's growth!
          </Typography>
        </CardContent>
      </Card>

      <Box textAlign="center" my={2}>
        <Button
          component={Link}
          to="/dueDate"
          color="primary"
          className="fs-5 text-decoration-underline"
        >
          Recalculate your due date
        </Button>
      </Box>

      <PregnancyTimeline />
    </Box>
  );
}
