import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import { UserProvider, useUser } from "./context/UserContext";
import PrivateRoute from "./utils/PrivateRoute";
import { Navigate } from "react-router-dom";
import Projects from "./pages/Projects";
import Customers from "./pages/Customers"; // Import Customers page
import Sales from "./pages/Sales"; // Import Sales page
import Agents from "./pages/Agents"; // Import Agents page
import Roles from "./pages/Roles"; // Import Role Management page
import Visits from "./pages/Visits";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <UserProvider>
      <Header />
      <MainRoutes />
    </UserProvider>
  );
}

const MainRoutes = () => {
  const { userInfo } = useUser(); // Now this is within the provider
  const role = userInfo?.role?.toLowerCase();
  if (!role) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Optionally, you can define a route to show an error page */}
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Define routes with the role in the path */}
      <Route path={`/${role}/dashboard`} element={<PrivateRoute allowedRoles={[role.toUpperCase()]}><Dashboard /></PrivateRoute>} />
          <Route path={`/${role}/admin`} element={<PrivateRoute allowedRoles={['ADMIN']}><AdminPanel /></PrivateRoute>} />
          <Route path={`/${role}/projects`} element={<PrivateRoute allowedRoles={['ADMIN', 'SALES', 'USER', 'AGENT']}><Projects /></PrivateRoute>} />
          <Route path={`/${role}/customers`} element={<PrivateRoute allowedRoles={['ADMIN', 'SALES']}><Customers /></PrivateRoute>} />
          <Route path={`/${role}/sales`} element={<PrivateRoute allowedRoles={['ADMIN', 'SALES']}><Sales /></PrivateRoute>} />
          <Route path={`/${role}/agents`} element={<PrivateRoute allowedRoles={['ADMIN']}><Agents /></PrivateRoute>} />
          <Route path={`/${role}/roles`} element={<PrivateRoute allowedRoles={['ADMIN']}><Roles /></PrivateRoute>} />
          <Route path={`/${role}/visits`} element={<PrivateRoute allowedRoles={['AGENT']}><Visits /></PrivateRoute>} />

          <Route path="*" element={<Unauthorized />} />
    </Routes>
  );
};

export default App;
