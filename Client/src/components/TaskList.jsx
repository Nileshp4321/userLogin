import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { isAuthenticated } from "./IsAuth"; // Import your authentication logic
import TaskUpdate from "./TaskUpdate";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MyUserContext } from "../Context/MyUserContext";
import LoginDashboard from "./LoginDashboard";

function TaskList() {

  const { currentUser } = useContext(MyUserContext);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/tasks",{params:{user:currentUser}})
      .then((response) => {
        setTasks(response.data);
        console.log(response.data)
        // console.log(currentUser);
      })
      .catch(async (err) => {
        await navigate("/login");
      });
  },[]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);

 
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = () => {
    axios.get("/api/tasks").then((response) => {
      setTasks(response.data);
    });
    setSelectedTask(null); 
    setShowUpdateModal(false); 
  };

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

  const handleCancelUpdate = () => {
    setSelectedTask(null);
    setShowUpdateModal(false);
  };

  return (
    <>
      {isAuthenticated() ? (
        <>
          <LoginDashboard />
          <div className="d-flex flex-wrap justify-content-center">
            <h1 className="h1 text-center w-100">Task Lists </h1>
            {tasks.map((task) => (

              <div
                key={task._id}
                className="list-group-item col-3 rounded m-3  p-3 w-25 rounded-3 shadow-lg text-center md-w-25" 
              >
                <h3 className="mb-1 text-danger">{task.title}</h3>

                <div className="mb-0 mt-4 text-break ">
                  <span className="fw-bolder">Description : </span>
                  {task.description.length >= 50 ? (
                    <>
                      {task.description.slice(0, 50)}
                      <u
                        className="m-1 text-primary text-underline"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal-${task._id}`}
                      >
                        Read More
                      </u>
                      <div
                        className="modal fade"
                        id={`exampleModal-${task._id}`}
                        tabIndex="-1"
                        aria-labelledby={`exampleModalLabel-${task._id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id={`exampleModalLabel-${task._id}`}
                              >
                                {task.title}
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <p className="fw-bolder text-break">
                                Description
                              </p>
                              {task.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    task.description
                  )}
                </div>
                <p className="fw-bolder text-secondary mt-1 fst-italic text-end">
                  Created By : {task.username}
                </p>
                
                <button
                  className="m-2 btn btn-dark fw-bolder"
                  onClick={() => handleUpdateClick(task)}
                  // disabled={ currentUser}
                >
                  Update
                </button>
  
                <button
                  className="btn btn-danger fw-bolder"
                  onClick={() => handleDelete(task._id)}
                  // disabled={currentUser}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          )
        </>
      ) : (
        navigate("/login")
      )}

      {selectedTask && (
        <Modal show={showUpdateModal} onHide={handleCancelUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Update Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskUpdate
              task={selectedTask}
              onUpdate={handleUpdate}
              onCancel={handleCancelUpdate}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default TaskList;
