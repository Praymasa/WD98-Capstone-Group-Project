import React from "react";
import { Box, Grid } from "@mui/material";
import ReservationTableList from "../components/ReservationTableList";
import ClientsTableList from "../components/ClientsTableList";
import EmployeeTableList from "../components/EmployeesTableList";
import ServicesList from "../components/ServicesList";
import TermsList from "../components/TermsList";

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
      <Box sx={{ backgroundColor: "#fff0f0" }}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <ServicesList />
          </Grid>
          <Grid item xs={12} md={4}>
            <TermsList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
