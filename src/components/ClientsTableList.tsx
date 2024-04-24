import { useEffect, useState } from "react";
import { fetchClients } from "../servicesApi";
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
import "../App.css";
import React from "react";
import { Margin } from "@mui/icons-material";

interface Client {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  status: string;
  gender: string;
  detailed_address: string;
  city: string;
  province: string;
  contact_number: number;
  email: string;
  password: string;
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClients();
        // console.log("Fetched data:", data);
        setClients(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchData();
  }, []);

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
        Clients List
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
              <TableCell className="table-row">Email</TableCell>
              <TableCell className="table-row">Detailed Address</TableCell>
              <TableCell className="table-row">Province</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((client, index) => (
                <TableRow
                  key={client.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>
                    {client.first_name} {client.middle_name} {client.last_name}
                  </TableCell>
                  <TableCell>{client.contact_number}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    {client.detailed_address},&nbsp;
                    {client.city}
                  </TableCell>
                  <TableCell>{client.province}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={clients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
