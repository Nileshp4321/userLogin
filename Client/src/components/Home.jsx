import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

function Home() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid  ">
      <h2 className="h2 mx-auto">Task Manager App</h2>
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
          <ul className="navbar-nav w-100 d-flex justify-content-end ">
          <li className="nav-item">
              <Link to="/login" className="btn btn-outline-dark btn-lg m-3 ">
                Login
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/register" className="btn btn-outline-dark btn-lg m-3">
                Signup
              </Link>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Home;
