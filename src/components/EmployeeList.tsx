import { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { fetchEmployees } from "../servicesApi";
import EmployeeCard from "./EmployeeCard";
import ReservationForm from "./ReservationForm";
import { Employee } from "../Employee";
import React from "react";

interface Props {
  employee: Employee;
}

export default function EmployeeList({}: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchData();
  }, []);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setSelectedPosition("");
  };

  const handlePositionChange = (position: string) => {
    setSelectedPosition(position);
  };

  const locations = Array.from(
    new Set(employees.map((employee) => employee.emp_location))
  );

  const positions = Array.from(
    new Set(
      employees
        .filter((employee) => employee.emp_location === selectedLocation)
        .map((employee) => employee.emp_position)
    )
  );

  return (
    <Box>
      <Typography variant="h6" style={{ marginBottom: "1rem" }}>
        <b>Choose a Location</b>
      </Typography>
      <Box sx={{ display: "flex", marginBottom: "1rem" }}>
        {locations.map((location, _index) => (
          <Button
            key={location}
            variant={selectedLocation === location ? "contained" : "outlined"}
            color={selectedLocation === location ? "secondary" : "primary"}
            onClick={() => handleLocationChange(location)}
            style={{ marginRight: "0.5rem" }}
          >
            {location}
          </Button>
        ))}
      </Box>

      {selectedLocation && (
        <Box>
          <Typography color="secondary" style={{ marginBottom: "1rem" }}>
            Select Position
          </Typography>
          <Box sx={{ display: "flex", marginBottom: "1rem" }}>
            {positions.map((position, _index) => (
              <Button
                key={position}
                variant={
                  selectedPosition === position ? "contained" : "outlined"
                }
                color={selectedPosition === position ? "secondary" : "primary"}
                onClick={() => handlePositionChange(position)}
                style={{ marginRight: "0.5rem" }}
              >
                {position}
              </Button>
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>
            Employees in {selectedLocation}
          </Typography>
          <Grid container spacing={2}>
            {employees
              .filter(
                (employee) =>
                  employee.emp_location === selectedLocation &&
                  (!selectedPosition ||
                    employee.emp_position === selectedPosition)
              )
              .map((employee) => (
                <Grid item key={employee.emp_id} xs={12} sm={6} md={4} xl={3}>
                  <EmployeeCard employee={employee} />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
