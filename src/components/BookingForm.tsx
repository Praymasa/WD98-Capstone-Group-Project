import React, { useEffect, useState } from "react";
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
  ListSubheader,
} from "@mui/material";
import {
  api,
  fetchServices,
  fetchTerms,
  fetchCleaningTypes,
  fetchChildCareTypes,
  fetchSeniorCareTypes,
} from "../servicesApi";

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

interface BookingFormProps {
  open: boolean;
  onClose: () => void;
  services: any[];
  terms: any[];
}

interface Service {
  id: number;
  title: string;
  service_category: string;
}
interface Term {
  id: number;
  title: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ open, onClose }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [bookedService, setBookedService] = useState("");
  const [bookedDate, setBookedDate] = useState("");
  const [bookedTime, setBookedTime] = useState("");
  const [bookedTerm, setBookedTerm] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [message, setMessage] = useState("");
  const [cleaningServices, setCleaningServices] = useState<Service[]>([]);
  const [childCareServices, setChildCareServices] = useState<Service[]>([]);
  const [seniorCareServices, setSeniorCareServices] = useState<Service[]>([]);
  const [toastOpen, setToastOpen] = useState(true);
  const [, setErrorMessage] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const cleaningServices = await fetchCleaningTypes();
    const childCareServices = await fetchChildCareTypes();
    const seniorCareServices = await fetchSeniorCareTypes();

    setCleaningServices(cleaningServices);
    setChildCareServices(childCareServices);
    setSeniorCareServices(seniorCareServices);
  };

  const handleServiceChange = (event) => {
    setBookedService(event.target.value);
  };

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
      await api.post("/bookings", {
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
      alert("Error submiting reservation.");
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
            onChange={handleServiceChange}
            fullWidth
            required
            variant="outlined"
          >
            <MenuItem disabled>--- Cleaning Services ---</MenuItem>
            {cleaningServices.map((service, index) => (
              <MenuItem key={index} value={service.id}>
                {service.title}
              </MenuItem>
            ))}
            <MenuItem disabled>--- Childcare Services ---</MenuItem>
            {childCareServices.map((service, index) => (
              <MenuItem key={index} value={service.id}>
                {service.title}
              </MenuItem>
            ))}
            <MenuItem disabled>--- Seniorcare Services ---</MenuItem>
            {seniorCareServices.map((service, index) => (
              <MenuItem key={index} value={service.id}>
                {service.title}
              </MenuItem>
            ))}
          </Select>
        </SelectInput>
        <Input
          label="Date"
          value={bookedDate}
          onChange={(e) => setBookedDate(e.target.value)}
          type="date"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Input
          label="Time"
          value={bookedTime}
          onChange={(e) => setBookedTime(e.target.value)}
          type="time"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          InputLabelProps={{
            shrink: true,
          }}
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
            {terms.map((term, index) => (
              <MenuItem key={index} value={term.id}>
                {term.title}
              </MenuItem>
            ))}
          </Select>
        </SelectInput>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          label="Tell us what you Need!"
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
