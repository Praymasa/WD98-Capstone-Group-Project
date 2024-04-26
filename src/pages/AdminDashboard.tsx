import React from "react";
import { Box, Grid } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
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
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} md={6}>
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
