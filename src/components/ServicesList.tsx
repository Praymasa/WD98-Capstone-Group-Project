import React from "react";
import { useEffect, useState } from "react";
import { api, fetchServices, fetchTerms } from "../servicesApi";
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
import "../App.css";
import BookingForm from "./BookingForm";

interface Service {
  service_title: string;
  category: string;
  description: string;
  rate: string;
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [terms, setTerms] = useState([]);
  const [Category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewServiceDialog, setOpenNewServiceDialog] = useState(false);
  const [newService, setNewService] = useState({
    service_category: "",
    title: "",
    description: "",
    rate: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTerms();
        console.log("Fetched data:", data);
        setTerms(data);
      } catch (error) {
        console.error("Error fetching terms:", error);
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
      const response = await api.post("/services", newService);

      if (response.status === 200) {
        console.log("New service saved successfully!");
        alert("New service saved successfully!");
        handleCloseNewServiceDialog();
        setNewService({
          service_category: "",
          title: "",
          description: "",
          rate: "",
        });
      } else {
        console.error("Error saving new service:", response.data.error);
        alert("Error saving new service");
      }
    } catch (error) {
      console.error("Error saving new service:", error);
      alert("Error saving new service");
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
    <>
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
                <TableCell className="table-row">Category</TableCell>
                <TableCell className="table-row">Service</TableCell>
                <TableCell className="table-row">Description</TableCell>
                <TableCell className="table-row">Rate</TableCell>
                <TableCell className="table-row">Action</TableCell>
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
                    <TableCell>{service.title}</TableCell>
                    <TableCell>{service.service_category}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.rate}</TableCell>
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
        <Dialog
          open={openNewServiceDialog}
          onClose={handleCloseNewServiceDialog}
        >
          <DialogTitle>Add New Service</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Employee Name"
              type="number"
              fullWidth
              variant="outlined"
              value={newService.service_category}
              onChange={(e) =>
                handleChangeNewService("category", e.target.value)
              }
              select
            >
              {services.map((service, index) => (
                <MenuItem key={index}>{service.category}</MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              label="Service Title"
              type="text"
              fullWidth
              value={newService.title}
              onChange={(e) =>
                handleChangeNewService("service_title", e.target.value)
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
              value={newService.description}
              onChange={(e) =>
                handleChangeNewService("description", e.target.value)
              }
            />
            <TextField
              autoFocus
              margin="dense"
              label="Rate"
              type="text"
              fullWidth
              value={newService.rate}
              onChange={(e) => handleChangeNewService("rate", e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewServiceDialog}>Cancel</Button>
            <Button onClick={handleSaveNewService}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
