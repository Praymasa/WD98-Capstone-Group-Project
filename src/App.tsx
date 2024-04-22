import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminNavBar from "./components/AdminNavBar";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import EmployeeDashboard from "./pages/AdminDashboard";
import UserNavBar from "./components/UserNavBar";
import LoginPage from "./pages/LoginPage";
import SigningPage from "./pages/SigningPage";
import FAQs from "./pages/FAQs";
import Blogs from "./pages/Blogs";
import Services from "./pages/Services";
import EmployeesPortal from "./pages/EmployeesPortal";

export default function App(employee) {
  return (
    <Router>
      <Navigation window={undefined} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signingpage" element={<SigningPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/FAqs" element={<FAQs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/employeesportal" element={<EmployeesPortal />} />
        <Route
          path="/admindashboard"
          element={
            <>
              <AdminNavBar />
              <AdminDashboard employee={employee} />
            </>
          }
        />
        <Route
          path="/clientdashboard"
          element={
            <>
              <UserNavBar />
              <ClientDashboard />
            </>
          }
        />
        <Route
          path="/employeedashboard"
          element={
            <>
              <UserNavBar />
              <EmployeeDashboard employee={employee} />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
