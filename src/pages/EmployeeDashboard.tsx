import React from "react";
import EmpAssignedTasks from "../components/EmpAssignedTasks";
import EmpAcceptedTasks from "../components/EmpAcceptedTask";

export default function EmployeeDashboard() {
  return (
    <>
      <EmpAssignedTasks tasks={[]} />
      <EmpAcceptedTasks tasks={[]} />
    </>
  );
}
