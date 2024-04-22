import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Employee } from "../Employee";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      style={{
        maxWidth: 345,
        height: "100%",
        backgroundColor: "#dccfdf80",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Box style={{ textAlign: "center" }}>
          <Avatar
            src={employee.emp_image_path}
            alt={employee.emp_name}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              margin: "auto",
            }}
          />
          <Typography variant="h5">{employee.emp_name}</Typography>
          <Typography variant="body1" gutterBottom color="secondary">
            <b>{employee.emp_position}</b>
          </Typography>
        </Box>
      </CardContent>
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{ marginTop: "auto" }}
      >
        View Info
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="body1">
            <b>Age:</b> {employee.emp_age}
          </Typography>
          <Typography variant="body1">
            <b>Bio:</b>
            {employee.emp_bio}
          </Typography>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
