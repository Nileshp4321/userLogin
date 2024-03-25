import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./IsAuth";
import { toast } from "react-toastify";

function AfterLogin() {
  const navigate = useNavigate();

  const logout = () => {
    // Clear the token from cookies
    Cookies.remove("token");
    // Optionally, you can clear any other user-related data or currentUser.
    // Redirect to the login page or any other page
    toast.warn('User Logged Out!', {
      // position: toast.POSITION.TOP_RIGHT,
      theme: "colored"      
  });
    navigate("/login"); // Redirect to the login page
    
  };

  return isAuthenticated() ? (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Welcome to Task Manager</h1>
          <div className="text-center">
            {/* <Link to="/taskform" className="btn btn-primary btn-lg m-2">
              Task Form
            </Link>
            <Link to="/taskList" className="btn btn-success btn-lg m-2">
              Task List
            </Link> */}
            <button onClick={logout} className="btn btn-danger btn-lg m-2">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      navigate("/login")
    </>
  );
}

export default AfterLogin;
