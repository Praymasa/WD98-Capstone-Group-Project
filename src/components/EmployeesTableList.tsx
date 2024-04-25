import { useEffect, useState } from "react";
import { api, fetchEmployees, fetchUsers } from "../servicesApi";
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
    fullname: "",
    user_role: "",
    contact_number: "",
    position: "",
    age: "",
    detailed_address: "",
    city_municipality: "",
    province: "",
    email: "",
  });
  const [editedEmployee, setEditedEmployee] = useState({
    fullname: "",
    user_role: "",
    contact_number: "",
    position: "",
    detailed_address: "",
    city_municipality: "",
    province: "",
    email: "",
    id: "",
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

  // ADDING NEW EMPLOYEE
  const handleOpenNewEmployeeDialog = () => {
    setOpenNewEmployeeDialog(true);
  };

  const handleCloseNewEmployeeDialog = () => {
    setOpenNewEmployeeDialog(false);
  };

  const handleSaveNewEmployee = async () => {
    try {
      const response = await api.post("/users", newEmployee);

      if (response.status === 200) {
        console.log("New employee saved successfully!");
        handleCloseNewEmployeeDialog();
        setNewEmployee({
          fullname: "",
          user_role: "",
          contact_number: "",
          position: "",
          age: "",
          detailed_address: "",
          city_municipality: "",
          province: "",
          email: "",
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
    console.log("Closing edit employee dialog");
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
              <TableCell className="table-row">Position</TableCell>
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
                  <TableCell>{employee.fullname}</TableCell>
                  <TableCell>{employee.user_role}</TableCell>
                  <TableCell>{employee.contact_number}</TableCell>
                  <TableCell>{employee.position}</TableCell>
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
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newEmployee.fullname}
            onChange={(e) =>
              handleChangeNewEmployee("fullname", e.target.value)
            }
          />
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
            label="Position"
            type="text"
            fullWidth
            value={newEmployee.position}
            onChange={(e) =>
              handleChangeNewEmployee("position", e.target.value)
            }
            select
          >
            <MenuItem value="Housekeeper">Housekeeper</MenuItem>
            <MenuItem value="Nanny/Baby Sitter">Nanny/Baby Sitter</MenuItem>
            <MenuItem value="Care Giver">Care Giver</MenuItem>
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
            label="Name"
            type="text"
            fullWidth
            value={editedEmployee.fullname}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, fullname: e.target.value })
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
            label="Position"
            type="text"
            fullWidth
            value={editedEmployee.position}
            onChange={(e) =>
              setEditedEmployee({ ...editedEmployee, position: e.target.value })
            }
            select
          >
            <MenuItem value="Housekeeper">Housekeeper</MenuItem>
            <MenuItem value="Nanny/Baby Sitter">Nanny/Baby Sitter</MenuItem>
            <MenuItem value="Care Giver">Care Giver</MenuItem>
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
