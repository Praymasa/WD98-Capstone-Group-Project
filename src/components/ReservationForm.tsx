import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Employee } from "../Employee";
import { api } from "../servicesApi";

interface ReservationFormProps {
  employee: Employee;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  employee,
  onClose,
}) => {
  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientDetailedAdd, setClientDetailedAdd] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientProvince, setClientProvince] = useState("");
  const [bookedService, setBookedService] = useState("");
  const [bookedDate, setBookedDate] = useState("");
  const [bookedTime, setBookedTime] = useState("");
  const [bookedTerm, setBookedTerm] = useState("");
  const [toastOpen, setToastOpen] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const handleSubmit = async () => {
    try {
      await api.post("/reservations.php", {
        client_name: clientName,
        client_number: clientNumber,
        client_detailedAdd: clientDetailedAdd,
        client_city: clientCity,
        client_province: clientProvince,
        emp_id: employee.emp_id,
        emp_name: employee.emp_name,
        service_title: bookedService,
        date: bookedDate,
        time: bookedTime,
        contract_term: bookedTerm,
      });
      setToastOpen(true);
      onClose();
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  const handleClose = () => {
    setClientName("");
    setClientNumber("");
    setClientDetailedAdd("");
    setClientCity("");
    setClientProvince("");
    setBookedService("");
    setBookedDate("");
    setBookedTime("");
    setBookedTerm("");
    onClose();
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^\d{4}[-\s]?\d{3}[-\s]?\d{4}$/;
    return regex.test(phoneNumber);
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Reservation Form</DialogTitle>
      <DialogContent>
        <TextField
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          fullWidth
          label="Complete Name"
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          error={!isValidPhoneNumber}
          helperText={
            !isValidPhoneNumber &&
            "Invalid phone number format (e.g 0912-345-6789)"
          }
          value={clientNumber}
          onChange={(e) => {
            setClientNumber(e.target.value);
            setIsValidPhoneNumber(validatePhoneNumber(e.target.value));
          }}
          fullWidth
          label="Contact Number"
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          value={clientDetailedAdd}
          onChange={(e) => setClientDetailedAdd(e.target.value)}
          fullWidth
          label="Detailed Address (e.g Blk0 Lot0 Subdivision)"
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          value={clientCity}
          onChange={(e) => setClientCity(e.target.value)}
          fullWidth
          label="City"
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          value={clientProvince}
          onChange={(e) => setClientProvince(e.target.value)}
          fullWidth
          label="Province"
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
          <InputLabel id="service-label">Service</InputLabel>
          <Select
            label="service-label"
            value={bookedService}
            onChange={(e) => setBookedService(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="Housekeeping">Housekeeping</MenuItem>
            <MenuItem value="Child Care">Child Care</MenuItem>
            <MenuItem value="Senior Care">Senior Care</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={bookedDate}
          onChange={(e) => setBookedDate(e.target.value)}
          type="date"
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          value={bookedTime}
          onChange={(e) => setBookedTime(e.target.value)}
          type="time"
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ marginBottom: 4 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="term-label">Term</InputLabel>
          <Select
            label="term-label"
            value={bookedTerm}
            onChange={(e) => setBookedTerm(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="One Time">One Time</MenuItem>
            <MenuItem value="Every Other Day">Every Other Day</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Twice a Month">Twice a Month</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Long Term Contract">
              Long Term Contract (minimum of 5 months)
            </MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          Submit
        </Button>
        <Button onClick={handleClose} color="error" variant="contained">
          Cancel
        </Button>
      </DialogActions>
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
        message="Reservation submitted successfully"
      />
    </Dialog>
  );
};

export default ReservationForm;
