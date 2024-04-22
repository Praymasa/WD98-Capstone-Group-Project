import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import { fetchClientsReservations } from "../servicesApi";

interface ClientServiceTableProps {
  res_id: string;
  service_id: number;
  contract_id: number;
  date: string;
  time: string;
  status: string;
}

export default function ClientServiceTable({
  service,
}: {
  service: ClientServiceTableProps[];
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [clientsReservations, setClientsReservations] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClientsReservations();
        setClientsReservations(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditService = (resId: string) => {
    // editing service logic
  };

  const handleDeleteService = (resId: string) => {
    //  deleting service logic
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
      <Box my={5} mx={2}>
        <Typography variant="h4">Your Service Reservations</Typography>
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
                <TableCell className="table-row">Service_id</TableCell>
                <TableCell className="table-row">Contract_id</TableCell>
                <TableCell className="table-row">Date</TableCell>
                <TableCell className="table-row">Time</TableCell>
                <TableCell className="table-row">Status</TableCell>
                <TableCell className="table-row">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {service
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((service) => (
                  <TableRow key={service.res_id}>
                    <TableCell>{service.service_id}</TableCell>
                    <TableCell>{service.contract_id}</TableCell>
                    <TableCell>{service.date}</TableCell>
                    <TableCell>{service.time}</TableCell>
                    <TableCell>
                      <Stepper
                        activeStep={
                          service.status === "Not Yet Started"
                            ? 0
                            : service.status === "On Going"
                            ? 1
                            : 2
                        }
                      >
                        <Step>
                          <StepLabel>Not Yet Started</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel>On Going</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel>Completed</StepLabel>
                        </Step>
                      </Stepper>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditService(service.res_id)}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteService(service.res_id)}
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
          count={service.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
