import axios from "axios";
import { Employee } from "./Employee";

const baseURL = "http://localhost/pdo";

export const api = axios.create({
  baseURL,
});

export const fetchEmployees = async () => {
  const response = await api.get("/employees.php");
  return response.data;
};
export const fetchClients = async () => {
  const response = await api.get("/clients.php");
  return response.data;
};
export const fetchReservations = async () => {
  const response = await api.get("/reservations.php");
  return response.data;
};
export const fetchServices = async () => {
  const response = await api.get("/services.php");
  return response.data;
};
export const fetchCleaningTypes = async () => {
  const response = await api.get("/cleaning.php");
  return response.data;
};
export const fetchChildCareTypes = async () => {
  const response = await api.get("/childcare.php");
  return response.data;
};
export const fetchSeniorCareTypes = async () => {
  const response = await api.get("/seniorcare.php");
  return response.data;
};
export const fetchAssignedTasks = async () => {
  const response = await api.get("/.php");
  return response.data;
};
export const fetchAcceptedTasks = async () => {
  const response = await api.get("/.php");
  return response.data;
};
export const fetchClientsReservations = async () => {
  const response = await api.get("/.php");
  return response.data;
};

export const fetchFilteredEmployees = async (
  position: string
): Promise<Employee[]> => {
  const response = await api.get("/employees.php", {
    params: {
      position: position,
    },
  });
  return response.data as Employee[];
  [];
};
export const fetchUserData = async (accessToken: string) => {
  const response = await api.get("/user-info.php", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
