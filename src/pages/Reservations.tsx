import React from "react";
import ReservationList from "../components/ReservationTableList";
import BookingForm from "../components/BookingForm";

export default function Reservations() {
  return (
    <>
      <BookingForm
        open={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        services={[]}
        terms={[]}
      />
    </>
  );
}
