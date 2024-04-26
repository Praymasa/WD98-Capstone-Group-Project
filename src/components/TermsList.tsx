import React from "react";
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
import { useEffect, useState } from "react";
import { api, fetchTerms } from "../servicesApi";

interface Terms {
  id?: any;
  title: string;
}

export default function TermsList() {
  const [terms, setTerms] = useState<Terms[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewTermDialog, setOpenNewTermDialog] = useState(false);
  const [selectedTermIndex, setSelectedTermIndex] = useState<number | null>(
    null
  );
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newTerm, setNewTerm] = useState({
    title: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTerms();
        console.log("Fetched data:", data);
        setTerms(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenNewTermDialog = () => {
    setOpenNewTermDialog(true);
  };

  const handleCloseNewTermDialog = () => {
    setOpenNewTermDialog(false);
  };

  const handleSaveNewTerm = async () => {
    try {
      const response = await api.post("/terms", newTerm);

      if (response.status === 200) {
        alert("New term saved successfully!");
        setTerms([...terms, newTerm]);
        handleCloseNewTermDialog();
        setNewTerm({
          title: "",
        });
      } else {
        console.error("Error saving new term:", response.data.error);
        alert("Error saving new term");
      }
    } catch (error) {
      console.error("Error saving new term:", error);
      alert("Error saving new term");
    }
  };

  const handleChangeNewTerm = (prop, value) => {
    setNewTerm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const handleEditTerm = async (index: number) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to edit this term?"
      );
      if (confirmed) {
        const termToUpdate = terms[index];

        const newTitle = prompt("Enter the new title for the term:");
        if (!newTitle) {
          return;
        }

        if (newTitle.trim() === "") {
          alert("Title cannot be empty. Please provide a valid title.");
          return;
        }
        const updatedData = {
          id: termToUpdate.id,
          title: newTitle,
        };

        await api.put(`/terms/${termToUpdate.id}`, updatedData);
        const updatedTerms = await fetchTerms();
        setTerms(updatedTerms);
      }
    } catch (error) {
      console.error("Error editing term:", error);
    }
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedTermIndex(null);
    setOpenEditDialog(false);
  };

  const handleSaveEditedTerm = async () => {
    if (selectedTermIndex !== null) {
      try {
        alert("Edited term saved successfully!");
        handleCloseEditDialog();
      } catch (error) {
        console.error("Error saving edited term:", error);
        alert("Error saving edited term");
      }
    }
  };

  const handleDeleteTerm = async (index: number) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this term?"
      );
      if (confirmed) {
        const termToDelete = terms[index];
        await api.delete(`/terms/${termToDelete.id}`);

        const updatedTerms = terms.filter(
          (term) => term.id !== termToDelete.id
        );
        setTerms(updatedTerms);
      }
    } catch (error) {
      console.error("Error deleting term:", error);
    }
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
          Terms List
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenNewTermDialog}
          sx={{ borderRadius: 5, marginBottom: 3 }}
        >
          Add New Term
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
                <TableCell className="table-row">Terms</TableCell>
                <TableCell className="table-row">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {terms
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((term, index) => (
                  <TableRow
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                    }}
                  >
                    <TableCell>{term.title}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEditTerm(index)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteTerm(index)}>
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
          count={terms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={openNewTermDialog} onClose={handleCloseNewTermDialog}>
          <DialogTitle>Add New Contract Terms</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Term Title"
              type="text"
              fullWidth
              value={newTerm.title}
              onChange={(e) => handleChangeNewTerm("title", e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewTermDialog}>Cancel</Button>
            <Button onClick={handleSaveNewTerm}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
