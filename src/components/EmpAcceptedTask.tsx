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
  Typography,
  Box,
  TablePagination,
} from "@mui/material";
import { fetchAcceptedTasks } from "../servicesApi";

interface AcceptedTasksProps {
  res_id: string;
  client_id: string;
  client_number: string;
  client_detailedAdd: string;
  client_city: string;
  client_province: string;
  service_id: number;
  contract_id: number;
  date: string;
  time: string;
}

export default function AcceptedTasks({
  tasks,
}: {
  tasks: AcceptedTasksProps[];
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [acceptedTasks, setAcceptedTasks] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAcceptedTasks();
        setAcceptedTasks(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  const handleStartedTask = (resId: string) => {
    //   task logic
  };

  const handleCompletedTask = (resId: string) => {
    //  task logic
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
        <Typography variant="h4">Accepted Task</Typography>
        <Typography variant="body1">
          You accepted to the following reservations. If you are not able to to
          do the Job, notify admin at least 2 hours before the schedule to
          reassign the service to other employee.
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
                <TableCell className="table-row">Res_id</TableCell>
                <TableCell className="table-row">Client_id</TableCell>
                <TableCell className="table-row">Client_number</TableCell>
                <TableCell className="table-row">Client_detailedAdd</TableCell>
                <TableCell className="table-row">Client_city</TableCell>
                <TableCell className="table-row">Client_province</TableCell>
                <TableCell className="table-row">Service_id</TableCell>
                <TableCell className="table-row">Contract_id</TableCell>
                <TableCell className="table-row">Date</TableCell>
                <TableCell className="table-row">Time</TableCell>
                <TableCell className="table-row">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task) => (
                  <TableRow key={task.res_id}>
                    <TableCell>{task.res_id}</TableCell>
                    <TableCell>{task.client_id}</TableCell>
                    <TableCell>{task.client_number}</TableCell>
                    <TableCell>{task.client_detailedAdd}</TableCell>
                    <TableCell>{task.client_city}</TableCell>
                    <TableCell>{task.client_province}</TableCell>
                    <TableCell>{task.service_id}</TableCell>
                    <TableCell>{task.contract_id}</TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>{task.time}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleStartedTask(task.res_id)}>
                        Startd
                      </Button>
                      <Button onClick={() => handleCompletedTask(task.res_id)}>
                        Completed
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
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
