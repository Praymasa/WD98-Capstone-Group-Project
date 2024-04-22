import React from "react";
import { Box } from "@mui/material";
import ReservationTableList from "../components/ReservationTableList";
import ClientsTableList from "../components/ClientsTableList";
import { Employee } from "../Employee";
import EmployeeTableList from "../components/EmployeesTableList";

export default function AdminDashboard() {
  return (
    <>
      <Box>
        <ReservationTableList />
      </Box>
      <Box>
        <ClientsTableList />
      </Box>
      <Box>
        <EmployeeTableList />
      </Box>
    </>
  );
}
