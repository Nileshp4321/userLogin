import { ToastContainer } from "react-toastify"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import { Toaster } from "react-hot-toast"
import TodoApp from "./components/FetchTasksFormik"
import { QueryClient, QueryClientProvider } from 'react-query';
import { MyProvider } from "./Context/MyUserContext"


function App() {


  return (
    <>
      <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/taskform" element={<TaskForm />} />
          <Route path="/taskList" element={<TaskList />} />
        </Routes>
        <ToastContainer autoClose={1000} theme="dark" />
        <ToastContainer autoClose={1000} theme="dark" />
        {/* <Toaster /> */}
      </BrowserRouter>
      </MyProvider>
    </>
  )
}
export default App



// import React from 'react';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import TodoApp from './components/FetchTasksFormik';

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TodoApp />
//     </QueryClientProvider>
//   );
// }

// export default App;
