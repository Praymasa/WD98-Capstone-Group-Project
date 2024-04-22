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
  Typography,
} from "@mui/material";
import "../App.css";

interface Client {
  client_id: number;
  client_name: string;
  contact_number: string;
  detailed_address: string;
  city: string;
  province: string;
}

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClients();
        console.log("Fetched data:", data);
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
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
    <div>
      <Typography variant="h4" textAlign={"center"} marginTop={2}>
        Client's List
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="table-row">Client's Name</TableCell>
              <TableCell className="table-row">Contact Number</TableCell>
              <TableCell className="table-row">Address</TableCell>
              <TableCell className="table-row">City</TableCell>
              <TableCell className="table-row">Province</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((client, index) => (
                <TableRow
                  key={client.client_id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>{client.client_name}</TableCell>
                  <TableCell>{client.contact_number}</TableCell>
                  <TableCell>{client.detailed_address}</TableCell>
                  <TableCell>{client.city}</TableCell>
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
    </div>
  );
}
