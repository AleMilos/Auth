import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthStatus } from "./hooks/useAuthStatus";
import "react-toastify/dist/ReactToastify.css";

// COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import SidePanel from "./components/SidePanel";

// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageUsers from "./pages/ManageUsers";
import NotFound from "./pages/NotFound";
import RegisterUser from "./pages/RegisterUser";
import Profile from "./pages/Profile";

//UTILS
import PrivateRoute from "./utils/PrivateRoute";
import RoleBasedPrivateRoute from "./utils/RoleBasedPrivateRoute";
import DeleteUser from "./pages/DeleteUser";

function App() {
  return (
    <>
      <div className="app-container">
        <SidePanel />
        <div id="page-panel-container" className="page-panel-container">
          <Header />
          <Routes>
            <Route
              path="/manage"
              element={<RoleBasedPrivateRoute path={"/manage"} />}
            >
              <Route path="/manage" element={<ManageUsers />} />
            </Route>
            <Route
              path="/manage/delete"
              element={<RoleBasedPrivateRoute path={"/manage/delete"} />}
            >
              <Route path="/manage/delete" element={<DeleteUser />} />
            </Route>
            <Route
              path="/manage/register"
              element={<RoleBasedPrivateRoute path={"/manage/register"} />}
            >
              <Route path="/manage/register" element={<RegisterUser />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
