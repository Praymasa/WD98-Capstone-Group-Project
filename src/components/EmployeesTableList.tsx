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
  MenuItem,
} from "@mui/material";
import { Employee } from "../Employee";
import "../App.css";
import React from "react";

export default function EmployeesTableList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewEmployeeDialog, setOpenNewEmployeeDialog] = useState(false);
  const [openEditEmployeeDialog, setOpenEditEmployeeDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    marital_status: "",
    gender: "",
    date_of_birth: "",
    first_name: "",
    last_name: "",
    user_role: "",
    contact_number: "",
    age: "",
    detailed_address: "",
    city_municipality: "",
    province: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [editedEmployee, setEditedEmployee] = useState({
    user_role: "",
    contact_number: "",
    detailed_address: "",
    city_municipality: "",
    province: "",
    email: "",
    id: "",
    password: "",
    password_confirmation: "",
    marital_status: "",
    gender: "",
    date_of_birth: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees();
        console.log("Employees", data);
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchData();
  }, []);

  // ADDING NEW EMPLOYEE
  const handleOpenNewEmployeeDialog = () => {
    setOpenNewEmployeeDialog(true);
  };

  const handleCloseNewEmployeeDialog = () => {
    setOpenNewEmployeeDialog(false);
  };

  const handleSaveNewEmployee = async () => {
    try {
      const response = await api.post("/register", newEmployee);

      if (response.status === 200) {
        console.log("New employee saved successfully!");
        handleCloseNewEmployeeDialog();
        setNewEmployee({
          marital_status: "",
          gender: "",
          date_of_birth: "",
          first_name: "",
          last_name: "",
          user_role: "",
          contact_number: "",
          age: "",
          detailed_address: "",
          city_municipality: "",
          province: "",
          email: "",
          password: "",
          password_confirmation: "",
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

  // EDITING EMPLOYEE
  const handleOpenEditEmployeeDialog = (employee: Employee) => {
    setEditedEmployee(employee);
    setOpenEditEmployeeDialog(true);
  };

  const handleCloseEditEmployeeDialog = () => {
    setOpenEditEmployeeDialog(false);
  };

  const handleSaveEditedEmployee = async () => {
    try {
      const response = await api.put(
        `/users?id=${editedEmployee.id}`,
        editedEmployee
      );

      if (response.status === 200) {
        console.log("Employee information updated successfully!");
        const updatedEmployees = employees.map((emp) =>
          emp.id === editedEmployee.id ? editedEmployee : emp
        );
        setEmployees(updatedEmployees);
        handleCloseEditEmployeeDialog();
      } else {
        console.error(
          "Error updating employee information:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Error updating employee information:", error);
    }
    console.log("Closing saving employee dialog");
    setOpenEditEmployeeDialog(false);
  };

  // DELETING EMPLOYEE
  const handleDeleteEmployee = async (employee: Employee) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this employee?"
      );
      if (confirmed) {
        await api.delete(`/users?id=${employee.id}`);

        const updatedEmployees = employees.filter(
          (em) => em.id !== employee.id
        );

        setEmployees(updatedEmployees);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // PAGINATION
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
              <TableCell className="table-row">Type</TableCell>
              <TableCell className="table-row">Contact Number</TableCell>
              <TableCell className="table-row">Detailed Address</TableCell>
              <TableCell className="table-row">Province</TableCell>
              <TableCell className="table-row">Email</TableCell>
              <TableCell className="table-row">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee, index) => (
                <TableRow
                  key={employee.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>
                    {employee.first_name} {employee.last_name}
                  </TableCell>
                  <TableCell>{employee.user_role}</TableCell>
                  <TableCell>{employee.contact_number}</TableCell>
                  <TableCell>
                    {employee.detailed_address} {employee.city_municipality}
                  </TableCell>
                  <TableCell>{employee.province}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={(e) => handleOpenEditEmployeeDialog(employee)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteEmployee(employee)}
                    >
                      Delete
                    </Button>
                  </TableCell>
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

      {/* DIALOG FOR ADDING NEW EMPLOYEE */}
      <Dialog
        open={openNewEmployeeDialog}
        onClose={handleCloseNewEmployeeDialog}
      >
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            type="text"
            variant="outlined"
            value={newEmployee.first_name}
            onChange={(e) =>
              handleChangeNewEmployee("first_name", e.target.value)
            }
          />
          <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            value={newEmployee.last_name}
            onChange={(e) =>
              handleChangeNewEmployee("last_name", e.target.value)
            }
          />
          <TextField
            variant="outlined"
            select
            label="Status"
            value={newEmployee.gender}
            onChange={(e) => handleChangeNewEmployee("gender", e.target.value)}
          >
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="male">Male</MenuItem>
          </TextField>
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            value={newEmployee.date_of_birth}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              handleChangeNewEmployee("date_of_birth", e.target.value)
            }
          />
          <TextField
            variant="outlined"
            select
            label="Status"
            value={newEmployee.marital_status}
            onChange={(e) =>
              handleChangeNewEmployee("marital_status", e.target.value)
            }
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married</MenuItem>
            <MenuItem value="widow">Widow</MenuItem>
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            label="User Role"
            type="text"
            fullWidth
            value={newEmployee.user_role}
            onChange={(e) =>
              handleChangeNewEmployee("user_role", e.target.value)
            }
            select
          >
            <MenuItem value="Administrator">Administrator</MenuItem>
            <MenuItem value="Service Provider">Service Provider</MenuItem>
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            label="Contact Number"
            type="text"
            fullWidth
            value={newEmployee.contact_number}
            onChange={(e) =>
              handleChangeNewEmployee("contact_number", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            value={newEmployee.detailed_address}
            onChange={(e) =>
              handleChangeNewEmployee("detailed_address", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="City"
            type="text"
            fullWidth
            value={newEmployee.city_municipality}
            onChange={(e) =>
              handleChangeNewEmployee("city_municipality", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Province"
            type="text"
            fullWidth
            value={newEmployee.province}
            onChange={(e) =>
              handleChangeNewEmployee("province", e.target.value)
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={newEmployee.email}
            onChange={(e) => handleChangeNewEmployee("email", e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Temporary Password"
            type="text"
            fullWidth
            value={newEmployee.password}
            onChange={(e) =>
              handleChangeNewEmployee("password", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Confirm Temporary Password"
            type="text"
            fullWidth
            value={newEmployee.password_confirmation}
            onChange={(e) =>
              handleChangeNewEmployee("password_confirmation", e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewEmployeeDialog}>Cancel</Button>
          <Button onClick={handleSaveNewEmployee}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG FOR EDITING EMPLOYEE */}
      <Dialog
        open={openEditEmployeeDialog}
        onClose={handleCloseEditEmployeeDialog}
      >
        <DialogTitle>Edit Employee Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={editedEmployee.first_name}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                first_name: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={editedEmployee.last_name}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                last_name: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Gender"
            type="text"
            fullWidth
            value={editedEmployee.gender}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, gender: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={editedEmployee.marital_status}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                marital_status: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Date of Birth"
            type="text"
            fullWidth
            value={editedEmployee.date_of_birth}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                date_of_birth: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="User Role"
            type="text"
            fullWidth
            value={editedEmployee.user_role}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                user_role: e.target.value,
              })
            }
            select
          >
            <MenuItem value="Administrator">Administrator</MenuItem>
            <MenuItem value="Service Provider">Service Provider</MenuItem>
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            label="Contact Number"
            type="text"
            fullWidth
            value={editedEmployee.contact_number}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                contact_number: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            value={editedEmployee.detailed_address}
            onChange={(e) =>
              setEditedEmployee({
                ...editedEmployee,
                detailed_address: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Province"
            type="text"
            fullWidth
            value={editedEmployee.province}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, province: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={editedEmployee.email}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditEmployeeDialog}>Cancel</Button>
          <Button onClick={handleSaveEditedEmployee}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
