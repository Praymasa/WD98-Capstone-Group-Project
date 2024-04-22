import { useEffect, useState } from "react";
import { api, fetchReservations } from "../servicesApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "../App.css";
import React from "react";

interface Reservation {
  id: string;
  emp_id: number;
  emp_name: string;
  client_name: string;
  client_number: string;
  client_detailedAdd: string;
  client_city: string;
  client_province: string;
  service_id: string;
  service_name: string;
  term_id: string;
  term_name: string;
  date: string;
  time: string;
}

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentReservation, setCurrentReservation] =
    useState<Reservation | null>(null);
  const [editedEmpId, setEditedEmpId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservations();
        console.log("Fetched data:", data);

        const formattedData = data.map(
          (reservation: { date: string; time: string }) => ({
            ...reservation,
            date: formatDate(reservation.date),
            time: formatTime(reservation.time),
          })
        );
        setReservations(formattedData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenEditDialog = (reservation: Reservation) => {
    setCurrentReservation(reservation);
    setEditedEmpId(reservation.emp_id);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentReservation(null);
    setEditedEmpId(null);
  };

  const handleSaveEditedEmpId = async () => {
    if (currentReservation && editedEmpId !== null) {
      const updatedReservation = {
        ...currentReservation,
        emp_id: editedEmpId,
      };

      await api.put(`/reservations.php`, updatedReservation);

      const updatedReservations = reservations.map((r) =>
        r.id === currentReservation.id ? updatedReservation : r
      );

      setReservations(updatedReservations);
      handleCloseEditDialog();
    }
  };

  const handleDeleteReservation = async (reservation: Reservation) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this reservation?"
      );
      if (confirmed) {
        await api.delete(`/reservations.php?id=${reservation.id}`);

        const updatedReservations = reservations.filter(
          (r) => r.id !== reservation.id
        );

        setReservations(updatedReservations);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${year} ${month} ${day}`;
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString
      .split(":")
      .map((part) => parseInt(part));
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const textColor = hours >= 12 ? "#A53860" : "#000000";
    return (
      <span style={{ color: textColor }}>
        {`${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`}
      </span>
    );
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
      }}
    >
      <Typography variant="h4" textAlign="center" paddingY={2}>
        Reservation List
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
              <TableCell className="table-row">Client's Name</TableCell>
              <TableCell className="table-row">Client's Information</TableCell>
              <TableCell className="table-row">Client's Province</TableCell>
              <TableCell className="table-row">Employee's Name</TableCell>
              <TableCell className="table-row">Service Title</TableCell>
              <TableCell className="table-row">Contract Term</TableCell>
              <TableCell className="table-row">Date</TableCell>
              <TableCell className="table-row">Time</TableCell>
              <TableCell className="table-row">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((reservation, index) => (
                <TableRow
                  key={reservation.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>{reservation.client_name}</TableCell>
                  <TableCell>
                    <p>Contact #: {reservation.client_number}</p>
                    {reservation.client_detailedAdd},&nbsp;
                    {reservation.client_city}
                  </TableCell>
                  <TableCell>{reservation.client_province}</TableCell>
                  <TableCell
                    style={{
                      color: reservation.emp_id === 0 ? "#A53860" : "#000000",
                    }}
                  ></TableCell>
                  <TableCell>{reservation.service_name}</TableCell>
                  <TableCell>{reservation.term_name}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleOpenEditDialog(reservation)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteReservation(reservation)}
                      >
                        Delete
                      </Button>
                    </>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={reservations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Reservation</DialogTitle>
        <DialogContent>
          {currentReservation && (
            <>
              <TextField
                margin="dense"
                label="Client's Name"
                type="text"
                fullWidth
                variant="outlined"
                value={currentReservation.client_name}
                disabled
              />
              <TextField
                margin="dense"
                label="Service Title"
                type="text"
                fullWidth
                variant="outlined"
                value={currentReservation.service_name}
                disabled
              />
              <TextField
                margin="dense"
                label="Contract Term"
                type="text"
                fullWidth
                variant="outlined"
                value={currentReservation.term_name}
                disabled
              />
              <TextField
                autoFocus
                margin="dense"
                label="Employee ID"
                type="number"
                fullWidth
                variant="outlined"
                value={editedEmpId || ""}
                onChange={(e) => setEditedEmpId(parseInt(e.target.value))}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEditedEmpId}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
