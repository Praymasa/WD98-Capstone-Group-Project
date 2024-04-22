import { useEffect, useState } from "react";
import { fetchEmployees } from "../servicesApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import { Employee } from "../Employee";
import "../App.css";
import React from "react";

export default function EmployeesTableList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const data = await fetchEmployees();
  //         console.log("Fetched data:", data);
  //         setEmployees(data);
  //       } catch (error) {
  //         console.error("Error fetching reservations:", error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <Box
      style={{
        left: 20,
        right: 20,
        top: 70,
        bottom: 0,
        overflowY: "auto",
        backgroundColor: "#fff0f0",
      }}
    >
      <Typography variant="h4" textAlign="center" paddingY={2}>
        Employee List
      </Typography>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "calc(100vh - 48px)",
          scrollbarWidth: "thin",
          scrollbarColor: "#A53860 #f5f5f5",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="table-row">Name</TableCell>
              <TableCell className="table-row">Contact Number</TableCell>
              <TableCell className="table-row">Position</TableCell>
              <TableCell className="table-row">Age</TableCell>
              <TableCell className="table-row">Detailed Address</TableCell>
              <TableCell className="table-row">Province</TableCell>
              <TableCell className="table-row">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee, index) => (
                <TableRow
                  key={employee.emp_id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>{employee.emp_name}</TableCell>
                  <TableCell>{employee.emp_position}</TableCell>
                  <TableCell>{employee.emp_age}</TableCell>
                  <TableCell>{employee.emp_contact_number}</TableCell>
                  <TableCell>{employee.emp_location}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
