import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery } from "react-query";
import "../App.css";

// Fetch todos
const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

// Mocked delete todo function
const deleteTodo = async (id) => {
  // Simulating async behavior
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};


function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { data: fetchedTodos = [], isLoading, isError, error } = useQuery(
    "todos",
    fetchTodos
  );

  useEffect(() => {
    setTodos(fetchedTodos);
  }, [fetchedTodos]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchTodos();
  //       setTodos(data);
  //     } catch (error) {
  //       console.error("Error fetching todos:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editingId !== null) {
        // Update todo
        const updatedTodos = todos.map((todo) =>
          todo.id === editingId ? { ...todo, title: values.title } : todo
        );
        setTodos(updatedTodos);
        setEditingId(null);
      } else {
        // Add new todo
        const newTodo = { id: Date.now(), ...values, completed: false };
        setTodos([...todos, newTodo]);
      }
      resetForm();
    } catch (error) {
      console.error("Error adding/editing todo:", error);
    }
  };

  // Handle delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Handle edit todo
  const handleEditTodo = (id) => {
    setEditingId(id);
  };

  return (
  
    <div className="container flex justify-center items-center">
      <div className="w-86 mt-10 p-4 bg-gray-400 rounded-md w-3/4">
        <h1 className="text-4xl font-bold mb-4 text-center">Todo App</h1>
        
        <Formik
          initialValues={{ title: "" }}
          onSubmit={handleSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.title.trim()) {
              errors.title = "Enter the todo";
            }
            return errors;
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex justify-center items-center">
              <Field
                type="text"
                name="title"
                id="title"
                className="flex-1 p-2 border rounded mr-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-red m-1 py-2 px-4 rounded"
              >
                Add Todo
              </button>

              {errors.title && touched.title && (
                <div className="text-red-500 ml-2">{errors.title}</div>
              )}
            </Form>
          )}
        </Formik>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">No,</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
              {isLoading?<p className="text-black-300 text-2xl w-3/4 text-center ">Loading</p>:isError?<p text-center text-2xl>error</p>:(todos.map((todo, index) => (
              <tr key={todo.id} className="w-auto">
                <td className="border px-4 py-2">{todo.userId}</td>
                <td
                  className={`border px-4 py-2 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {editingId === todo.id ? (
                    <Formik
                      initialValues={{ title: todo.title }}
                      onSubmit={handleSubmit}
                    >
                      <Form className="flex items-center">
                        <Field
                          type="text"
                          name="title"
                          className="flex-1 p-2 border rounded mr-2 "
                        />
                        <button
                          type="submit"
                          className="bg-green-500 text-white py-2 px-4 rounded"
                        >
                          Save
                        </button>
                      </Form>
                    </Formik>
                  ) : (
                    todo.title
                  )}
                </td>
                <td className="border px-4 py-2">
                  {!todo.completed && (
                    <button
                      onClick={() => handleEditTodo(todo.id)}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoApp;




















// User
// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import "../App.css";

// // Fetch todos
// const fetchTodos = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos");
//   if (!response.ok) {
//     throw new Error("Failed to fetch todos");
//   }
//   return response.json();
// };

// // Mocked delete todo function
// const deleteTodo = async (id) => {
//   // Simulating async behavior
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, 500);
//   });
// };

// // Todo App component
// function TodoApp() {
//   const [todos, setTodos] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [formValues, setFormValues] = useState({ title: "" });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchTodos();
//         setTodos(data);
//       } catch (error) {
//         console.error("Error fetching todos:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       if (editingId !== null) {
//         // Update todo
//         const updatedTodos = todos.map((todo) =>
//           todo.id === editingId ? { ...todo, ...values } : todo
//         );
//         setTodos(updatedTodos);
//         setEditingId(null);
//       } else {
//         // Add new todo
//         const newTodo = { ...values, completed: false };
//         setTodos([...todos, newTodo]);
//       }
//       resetForm();
//     } catch (error) {
//       console.error("Error adding/editing todo:", error);
//     }
//   };

//   // Handle delete todo
//   const handleDeleteTodo = async (id) => {
//     try {
//       await deleteTodo(id);
//       setTodos(todos.filter((todo) => todo.id !== id));
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   };

//   // Handle edit todo
//   const handleEditTodo = (id) => {
//     setEditingId(id);
//     const todoToEdit = todos.find((todo) => todo.id === id);
//     if (todoToEdit && !todoToEdit.completed) {
//       const initialValues = { title: todoToEdit.title };
//       setFormValues(initialValues);
//     }
//   };

//   return (
//     <div className="container flex justify-center items-center">
//       <div className="w-86 mt-10 p-4 bg-gray-400 rounded-md w-3/4">
//         <h1 className="text-4xl font-bold mb-4 text-center">Todo App</h1>
//         <Formik
//           initialValues={formValues}
//           onSubmit={handleSubmit}
//           validate={(values) => {
//             const errors = {};
//             if (!values.title.trim()) {
//               errors.title = "Enter the todo";
//             }
//             return errors;
//           }}
//         >
//           {({ errors, touched }) => (
//             <Form className="flex justify-center items-center">
//               <Field
//                 type="text"
//                 name="title"
//                 id="title"
//                 className="flex-1 p-2 border rounded mr-2"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-red m-1 py-2 px-4 rounded"
//               >
//                 Add Todo
//               </button>
//               {errors.title && touched.title && (
//                 <div className="text-red-500 ml-2">{errors.title}</div>
//               )}
//             </Form>
//           )}
//         </Formik>
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">ID</th>
//               <th className="border px-4 py-2">User ID</th>
//               <th className="border px-4 py-2">Title</th>
//               <th className="border px-4 py-2">Completed</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todos.map((todo, index) => (
//               <tr key={todo.id}>
//                 <td className="border px-4 py-2">{todo.id}</td>
//                 <td className="border px-4 py-2">{todo.userId}</td>
//                 <td className={`border px-4 py-2 ${todo.completed ? 'line-through' : ''}`}>
//                   {todo.title}
//                 </td>
//                 <td className="border px-4 py-2">{todo.completed.toString()}</td>
//                 <td className="border px-4 py-2">
//                   {!todo.completed && (
//                     <button
//                       onClick={() => handleEditTodo(todo.id)}
//                       className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
//                       disabled={todo.completed} // Disable the button if the task is completed
//                     >
//                       Edit
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDeleteTodo(todo.id)}
//                     className="bg-red-500 text-white py-1 px-2 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default TodoApp;

