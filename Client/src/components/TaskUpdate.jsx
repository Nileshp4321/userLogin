import React, { useState } from "react";
import axios from "axios";

function TaskUpdate({ task, onUpdate, onCancel }) {
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
  });

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the task with the updatedTask data
      const res=await axios.put(`/api/tasks/${task._id}`, updatedTask);
      console.log(res);
      // Notify the parent component that the task was updated
      onUpdate();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    onCancel(); // Call the onCancel function to close the update form
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={updatedTask.title}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, title: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              className="form-control"
              value={updatedTask.description}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, description: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <button className="btn btn-dark m-2" onClick={handleUpdate}>
        Update
      </button>
      <button className="btn btn-secondary m-2" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

export default TaskUpdate;
