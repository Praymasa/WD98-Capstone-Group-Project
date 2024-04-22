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
  styled,
} from "@mui/material";
import { api } from "../servicesApi";

interface BookingFormProps {
  open: boolean;
  onClose: () => void;
}

const Input = styled(TextField)`
  width: 100%;

  & input {
    font-size: 12px;
  }

  &:not(:last-of-type) {
    margin-bottom: 1.5em;
  }

  & label {
    color: rgba(200, 200, 200, 1);
  }

  & .Mui-focused {
    & label {
      color: #9c27b0;
    }

    & .MuiOutlinedInput-notchedOutline {
      border-color: #9c27b0;
    }
  }
`;
const SelectInput = styled(FormControl)`
  width: 100%;

  & input {
    font-size: 12px;
  }

  &:not(:last-of-type) {
    margin-bottom: 1.5em;
  }

  & label {
    color: rgba(200, 200, 200, 1);
  }

  & .Mui-focused {
    & label {
      color: #9c27b0;
    }

    & .MuiOutlinedInput-notchedOutline {
      border-color: #9c27b0;
    }
  }
`;

const BookingForm: React.FC<BookingFormProps> = ({ open, onClose }) => {
  const [bookedService, setBookedService] = useState("");
  const [bookedDate, setBookedDate] = useState("");
  const [bookedTime, setBookedTime] = useState("");
  const [bookedTerm, setBookedTerm] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [message, setMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(true);
  const [, setErrorMessage] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const handleSubmit = async () => {
    try {
      if (
        !bookedService ||
        !bookedTerm ||
        !bookedDate ||
        !bookedTime ||
        !bookingStatus ||
        !message
      ) {
        setErrorMessage("Please fill out all fields.");
        return;
      }

      if (!isValidPhoneNumber) {
        setErrorMessage("Invalid phone number format.");
        return;
      }
      await api.post("/reservations.php", {
        emp_id: "",
        service_id: bookedService,
        term_id: bookedTerm,
        status: bookingStatus,
        date: bookedDate,
        time: bookedTime,
        remarks: message,
      });
      setToastOpen(true);
      onClose();
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  const handleClose = () => {
    setBookedService("");
    setBookedDate("");
    setBookedTime("");
    setBookedTerm("");
    setBookingStatus("");
    setMessage("");
    onClose();
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^\d{4}[-\s]?\d{3}[-\s]?\d{4}$/;
    return regex.test(phoneNumber);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle textAlign={"center"}>Reservation Form</DialogTitle>
      <DialogContent id="booking-form">
        <SelectInput fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
          <InputLabel id="service-label">Service</InputLabel>
          <Select
            label="service-label"
            value={bookedService}
            onChange={(e) => setBookedService(e.target.value)}
            fullWidth
            required
            variant="outlined"
          >
            <MenuItem value="Housekeeping">Housekeeping</MenuItem>
            <MenuItem value="Child Care">Child Care</MenuItem>
            <MenuItem value="Senior Care">Senior Care</MenuItem>
          </Select>
        </SelectInput>
        <Input
          value={bookedDate}
          onChange={(e) => setBookedDate(e.target.value)}
          type="date"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ marginBottom: 2 }}
        />
        <Input
          value={bookedTime}
          onChange={(e) => setBookedTime(e.target.value)}
          type="time"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ marginBottom: 4 }}
        />
        <SelectInput fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="term-label">Term</InputLabel>
          <Select
            label="term-label"
            value={bookedTerm}
            onChange={(e) => setBookedTerm(e.target.value)}
            fullWidth
            variant="outlined"
            required
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
        </SelectInput>
        <Input
          value={message}
          onChange={(e) => setBookedTime(e.target.value)}
          type="text"
          label="Message"
          fullWidth
          multiline
          margin="normal"
          variant="outlined"
          rows={4}
          sx={{ marginBottom: 4 }}
        />
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

export default BookingForm;
