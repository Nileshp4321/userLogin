import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Home from './Home';
import { MyUserContext } from "../Context/MyUserContext";

function Register() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Get the navigate function for navigation
  const { currentUser,setUserName } = useContext(MyUserContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    axios
      .post('/api/auth/register', user)
      .then(() => {
        // Redirect to the task list after successful registration
        navigate('/login');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
        alert("Please Try again")
        console.error('Registration failed:', error);
      });
  };

  return (
    <>
      <Home />
      <div className="container mt-5 lg-w-25 p-5 rounded-2 shadow-lg">
        <h1  className="text-center text-primary">Register</h1>
        <form className="d-flex flex-column justify-content-center align-items-center ">
          <div className="mb-3 w-100">
            <label htmlFor="username" className="form-label fw-bolder">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="password" className="form-label fw-bolder">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-primary w-100 fw-bolder" 
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;



// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useMutation } from 'react-query'; // Import useMutation hook
// import Home from './Home';

// function Register() {
//   const navigate = useNavigate();

//   const registerUser = async (user) => {
//     // console.log(user);
//     return axios.post('/api/auth/register', user);
//   };

//   // Use useMutation hook to handle registration
//   const { mutate, isLoading, isError } = useMutation(registerUser, {
//     onSuccess: () => {
//       navigate('/login');
//     },
//     onError: (error) => {
//       if (error.response && error.response.status === 400) {
//         alert(error.response.data.message);
//       }
//       console.error('Registration failed:', error);
//     },
//   });

//   const handleSubmit = (values) => {
//     mutate(values); // Call mutate with form values
//   };

//   const validate = (values) => {
//     const errors = {};

//     if (!values.email) {
//       errors.email = 'Email is required';
//     } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!values.password) {
//       errors.password = 'Password is required';
//     }

//     return errors;
//   };

//   return (
//     <>
//       <Home />
//       <div className="container mt-5 lg-w-25 p-5 rounded-2 shadow-lg">
//         <h1 className="text-center text-primary">Register</h1>
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validate={validate}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="d-flex flex-column justify-content-center align-items-center">
//               <div className="mb-3 w-100">
//                 <label htmlFor="email" className="form-label fw-bolder">
//                   Email
//                 </label>
//                 <Field
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   placeholder="Email"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-danger" />
//               </div>
//               <div className="mb-3 w-100">
//                 <label htmlFor="password" className="form-label fw-bolder">
//                   Password
//                 </label>
//                 <Field
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   name="password"
//                   placeholder="Password"
//                 />
//                 <ErrorMessage name="password" component="div" className="text-danger" />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-outline-primary w-100 fw-bolder"
//                 disabled={isSubmitting || isLoading} // Disable button during loading
//               >
//                 {isLoading ? 'Registering...' : 'Register'}
//               </button>
//               {isError && (
//                 <div className="text-danger mt-2">Registration failed. Please try again.</div>
//               )}
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// }

// export default Register;

