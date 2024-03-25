import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated } from "./IsAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyUserContext } from "../Context/MyUserContext"
import LoginDashboard from "./LoginDashboard";
import { toast } from "react-toastify";


function TaskForm() {
  const { currentUser } = useContext(MyUserContext);
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    username: currentUser
  });
  useEffect(()=>{
      if(!isAuthenticated())
      {
        navigate("/login")
      }
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post("/api/tasks", task)
      .then((res) => {
        toast.success(`Task is Added ${res.data.message} `, {
          position: toast.POSITION.TOP_CENTER
      });
        navigate("/tasklist");
      })
      .catch((err) => {
        navigate("/login");
        // console.log(err.response);
      });
  };
  // console.log(isAuthenticated());

  return (isAuthenticated() ? (
    <>
    <LoginDashboard />
    <div className="container mt-5 lg-w-25 p-5 rounded-2 shadow-lg">
      <h1 className="text-center fw-bolder">Create Task</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Title"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-primary w-100"
          onClick={handleSubmit}
        >
          Create Task
        </button>
      </form>
    </div>
    </>
  ) : null);
}

export default TaskForm;
