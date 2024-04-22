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
} from "@mui/material";
import "../App.css";
import React from "react";

interface Reservation {
  emp_id: number;
  res_id: string;
  client_name: string;
  client_number: string;
  client_detailedAdd: string;
  client_city: string;
  client_province: string;
  emp_name: string;
  service_title: string;
  contract_term: string;
  date: string;
  time: string;
}

export default function ReservationList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editedEmpName, setEditedEmpName] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchReservations();
  //       console.log("Fetched data:", data);
  //       const formattedData = data.map(
  //         (reservation: { date: string; time: string }) => ({
  //           ...reservation,
  //           date: formatDate(reservation.date),
  //           time: formatTime(reservation.time),
  //         })
  //       );
  //       setReservations(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching reservations:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleDeleteReservation = async (reservation: Reservation) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this reservation?"
      );
      if (confirmed) {
        await api.delete(`/reservations.php?res_id=${reservation.res_id}`);

        const updatedReservations = reservations.filter(
          (r) => r.res_id !== reservation.res_id
        );

        setReservations(updatedReservations);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleEditEmpName = (empName: string) => {
    setEditedEmpName(empName);
  };

  const handleSaveEmpName = async (reservation: Reservation) => {
    try {
      if (editedEmpName) {
        const confirmed = window.confirm(
          "Are you sure you want to save the changes?"
        );
        if (confirmed) {
          const updatedReservation = {
            ...reservation,
            emp_name: editedEmpName,
          };

          await api.put(`/reservations.php`, updatedReservation);

          const updatedReservations = reservations.map((r) =>
            r.res_id === updatedReservation.res_id ? updatedReservation : r
          );

          setReservations(updatedReservations);
          setEditedEmpName(null);
        }
      }
    } catch (error) {
      console.error("Error updating employee name:", error);
    }
  };

  const handleCancelEmpNameEdit = () => {
    setEditedEmpName(null);
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
                  key={reservation.res_id}
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
                  >
                    {editedEmpName === reservation.emp_name ? (
                      <TextField
                        value={editedEmpName}
                        onChange={(e) => setEditedEmpName(e.target.value)}
                        onBlur={() => {}}
                        autoFocus
                      />
                    ) : (
                      reservation.emp_name
                    )}
                  </TableCell>
                  <TableCell>{reservation.service_title}</TableCell>
                  <TableCell>{reservation.contract_term}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>
                    {editedEmpName === reservation.emp_name ? (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleSaveEmpName(reservation)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleCancelEmpNameEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            handleEditEmpName(reservation.emp_name)
                          }
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
                    )}
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
    </Box>
  );
}
