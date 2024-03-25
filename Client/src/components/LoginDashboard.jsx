import React, { useContext } from "react";
import { Link} from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { MyUserContext } from "../Context/MyUserContext";

const LoginDashboard = () => {
    const { currentUser } = useContext(MyUserContext);
    const navigate = useNavigate();
  const logout = () => {
    // Clear the token from cookies
    Cookies.remove("token");
    // Optionally, you can clear any other user-related data or currentUser.
    // Redirect to the login page or any other page
    toast.success("User Logged Out!", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate("/login"); // Redirect to the login page
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid  ">
        <h2 className="h2 me-5 fw-bolder ">Welcome {currentUser} </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-end" >
            <li className="nav-item">
              {/* <Link to="/taskform" className="btn btn-outline-dark btn-lg m-2" >
                Task Form
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/taskList" className="btn btn-outline-dark btn-lg m-2" >
                Task List
              </Link> */}
            </li>
            <li className="nav-item">
              <button onClick={logout} className="btn btn-outline-dark btn-lg m-2">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LoginDashboard;
