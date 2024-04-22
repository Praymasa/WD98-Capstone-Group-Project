import { useEffect, useState } from "react";
import { api, fetchEmployees, fetchServices } from "../servicesApi";
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
import "../App.css";
import React from "react";

interface Service {
  service_name: string;
  service_description: string;
  service_rate: string;
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewServiceDialog, setOpenNewServiceDialog] = useState(false);
  const [newService, setNewService] = useState({
    service_name: "",
    service_description: "",
    service_rate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchServices();
        console.log("Fetched data:", data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenNewServiceDialog = () => {
    setOpenNewServiceDialog(true);
  };

  const handleCloseNewServiceDialog = () => {
    setOpenNewServiceDialog(false);
  };

  const handleSaveNewService = async () => {
    try {
      const response = await api.post("/services.php", newService);

      if (response.status === 200) {
        console.log("New service saved successfully!");
        handleCloseNewServiceDialog();
        setNewService({
          service_name: "",
          service_description: "",
          service_rate: "",
        });
      } else {
        console.error("Error saving new service:", response.data.error);
      }
    } catch (error) {
      console.error("Error saving new service:", error);
    }
    console.log("Saving new service:", newService);
    handleCloseNewServiceDialog();
  };

  const handleChangeNewService = (prop, value) => {
    setNewService((prevState) => ({ ...prevState, [prop]: value }));
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
        Services List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenNewServiceDialog}
        sx={{ borderRadius: 5, marginBottom: 3 }}
      >
        Add New Service
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
              <TableCell className="table-row">Services</TableCell>
              <TableCell className="table-row">Description</TableCell>
              <TableCell className="table-row">Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((service, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>{service.service_name}</TableCell>
                  <TableCell>{service.service_description}</TableCell>
                  <TableCell>{service.service_rate}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={services.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openNewServiceDialog} onClose={handleCloseNewServiceDialog}>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Service Name"
            type="text"
            fullWidth
            value={newService.service_name}
            onChange={(e) =>
              handleChangeNewService("service_name", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            multiline
            fullWidth
            rows={5}
            value={newService.service_description}
            onChange={(e) =>
              handleChangeNewService("service_description", e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Rate"
            type="text"
            fullWidth
            value={newService.service_rate}
            onChange={(e) =>
              handleChangeNewService("service_rate", e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewServiceDialog}>Cancel</Button>
          <Button onClick={handleSaveNewService}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
