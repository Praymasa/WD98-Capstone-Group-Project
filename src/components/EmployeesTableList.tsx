import { useEffect, useState } from "react";
import { api, fetchEmployees } from "../servicesApi";
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
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Employee } from "../Employee";
import "../App.css";
import React from "react";

export default function EmployeesTableList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewEmployeeDialog, setOpenNewEmployeeDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    emp_name: "",
    emp_contact_number: "",
    emp_position: "",
    emp_age: "",
    emp_location: "",
    emp_province: "",
    emp_email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        console.log("Fetched data:", data);
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenNewEmployeeDialog = () => {
    setOpenNewEmployeeDialog(true);
  };

  const handleCloseNewEmployeeDialog = () => {
    setOpenNewEmployeeDialog(false);
  };

  const handleSaveNewEmployee = async () => {
    try {
      const response = await api.post("/employees.php", newEmployee);

      if (response.status === 200) {
        console.log("New employee saved successfully!");
        handleCloseNewEmployeeDialog();
        setNewEmployee({
          emp_name: "",
          emp_contact_number: "",
          emp_position: "",
          emp_age: "",
          emp_location: "",
          emp_province: "",
          emp_email: "",
        });
      } else {
        console.error("Error saving new employee:", response.data.error);
      }
    } catch (error) {
      console.error("Error saving new employee:", error);
    }
    console.log("Saving new employee:", newEmployee);
    handleCloseNewEmployeeDialog();
  };

  const handleChangeNewEmployee = (prop, value) => {
    setNewEmployee((prevState) => ({ ...prevState, [prop]: value }));
  };

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
        margin: "0 10px",
      }}
    >
      <Typography variant="h4" textAlign="center" paddingY={2}>
        Employee List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenNewEmployeeDialog}
        sx={{ borderRadius: 5, marginBottom: 3 }}
      >
        Add New Employee
      </Button>
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
      <Dialog
        open={openNewEmployeeDialog}
        onClose={handleCloseNewEmployeeDialog}
      >
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newEmployee.emp_name}
            onChange={(e) =>
              handleChangeNewEmployee("emp_name", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Position"
            type="text"
            fullWidth
            value={newEmployee.emp_position}
            onChange={(e) =>
              handleChangeNewEmployee("emp_position", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Age"
            type="text"
            fullWidth
            value={newEmployee.emp_age}
            onChange={(e) => handleChangeNewEmployee("emp_age", e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Contact Number"
            type="text"
            fullWidth
            value={newEmployee.emp_contact_number}
            onChange={(e) =>
              handleChangeNewEmployee("emp_contact_number", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            value={newEmployee.emp_location}
            onChange={(e) =>
              handleChangeNewEmployee("emp_location", e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewEmployeeDialog}>Cancel</Button>
          <Button onClick={handleSaveNewEmployee}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
