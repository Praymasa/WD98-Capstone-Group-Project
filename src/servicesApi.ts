import axios, { AxiosInstance } from "axios";
import { Employee } from "./Employee";

const baseURL = "http://localhost:8000/api";
const baseImageURL = "http://localhost:8000/images";

export const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});
export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.post(baseImageURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
export const fetchEmployees = async () => {
  const response = await api.get(`/users?user_role=serviceprovider`);
  return response.data;
};

export const fetchClients = async () => {
  const response = await api.get(`/users?user_role=${"Customer"}`);
  return response.data;
};
export const fetchReservations = async () => {
  const response = await api.get("/bookings");
  return response.data;
};
export const fetchServices = async () => {
  const response = await api.get("/services");
  return response.data;
};
export const fetchTerms = async () => {
  const response = await api.get("/terms");
  return response.data;
};
export const fetchCleaningTypes = async () => {
  const response = await api.get("/services?service_category=cleaning");
  return response.data;
};
export const fetchChildCareTypes = async () => {
  const response = await api.get("/services?service_categoty=childcare");
  return response.data;
};
export const fetchSeniorCareTypes = async () => {
  const response = await api.get("/services?service_category=seniorcare");
  return response.data;
};
export const fetchAssignedTasks = async () => {
  const response = await api.get("/");
  return response.data;
};
export const fetchAcceptedTasks = async () => {
  const response = await api.get("/");
  return response.data;
};
export const fetchClientsReservations = async () => {
  const response = await api.get(`/`);
  return response.data;
};

export const fetchFilteredEmployees = async (
  position: string
): Promise<Employee[]> => {
  const response = await api.get("/users?user_role=employee", {
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
