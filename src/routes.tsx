import React from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Services from "./pages/Services";
import SigningPage from "./pages/SigningPage";
import FAQs from "./pages/FAQs";
import Blogs from "./pages/Blogs";
import LoginPage from "./pages/LoginPage";
import EmployeesPortal from "./pages/EmployeesPortal";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Reservations from "./pages/Reservations";
import ClientsList from "./components/ClientsTableList";
import EmployeesTableList from "./components/EmployeesTableList";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
  },
  {
    name: "Services",
    path: "/services",
    element: <Services />,
  },
  {
    name: "Contact",
    path: "/contact",
    element: <Contact />,
  },
  {
    name: "SigningPage",
    path: "/signingpage",
    element: <SigningPage />,
  },
  {
    name: "LoginPage",
    path: "/loginpage",
    element: <LoginPage />,
  },
  {
    name: "EmloyeesPortal",
    path: "/employeesportal",
    element: <EmployeesPortal />,
  },
  {
    name: "FAQs",
    path: "/faq",
    element: <FAQs />,
  },
  {
    name: "Blogs",
    path: "/blog",
    element: <Blogs />,
  },
  {
    name: "AdminDashboard",
    path: "/admindashboard",
    element: <AdminDashboard />,
  },
  {
    name: "ClientDashboard",
    path: "/clientdashboard/:id",
    element: <ClientDashboard />,
  },
  {
    name: "EmployeeDashBorad",
    path: "/employeedashboard",
    element: <EmployeeDashboard />,
  },
  {
    name: "Reservations",
    path: "/reservations",
    element: <Reservations />,
  },
  {
    name: "Clients",
    path: "/clients",
    element: <ClientsList />,
  },
  {
    name: "Employees",
    path: "/employees",
    element: <EmployeesTableList />,
  },
];

export default routes;
