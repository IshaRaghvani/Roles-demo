// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { setCookie } from "../utils/common";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { userInfo, setUserInfo } = useUser();

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(false);
//   const [isLoading, setLoading] = useState(false);
//   const [validated, setValidated] = useState(false);

//   // Dummy Users for front-end only login check
//   const users = [
//     {
//       id: "1",
//       email: "admin@gmail.com",
//       password: "admin",
//       firstname: "Web",
//       lastname: "Crafters",
//       role: "admin",
//       mobile: "9876543210",
//     },
//     {
//       id: "2",
//       email: "user@gmail.com",
//       password: "user",
//       firstname: "Lucky",
//       lastname: "Rawat",
//       role: "user",
//       mobile: "9876543211",
//     },
//   ];

//   useEffect(() => {
//     if (userInfo) navigate("/dashboard");
//   }, [userInfo, navigate]);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     setError(false);
//     setLoading(true);
//     event.preventDefault();
//     const form = event.currentTarget;

//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//       setLoading(false);
//     } else {
//       const user = users.find(
//         (user) =>
//           user.email === formData.email.trim() &&
//           user.password === formData.password.trim()
//       );

//       if (user) {
//         setCookie("_USER_AUTH_", JSON.stringify(user));
//         setUserInfo(user);
//         navigate("/dashboard");
//       } else {
//         setError(true);
//         setLoading(false);
//       }
//     }

//     setValidated(true);
//   };

//   return (
//     <div className="login-section align-content-center">
//       <Container>
//         <Row className="justify-content-center">
//           <Col xl={4} lg={5} md={7} xs={12}>
//             <div className="login-box rounded p-4 shadow-sm bg-light">
//               <h3 className="mb-4"> Sign In </h3>
//               <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     name="email"
//                     placeholder="Enter email"
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide a valid email.
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group
//                   className="mb-3 position-relative"
//                   controlId="formBasicPassword"
//                 >
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={handleChange}
//                     name="password"
//                     placeholder="Password"
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide a valid password.
//                   </Form.Control.Feedback>
//                   <span
//                     className="position-absolute top-50 end-0 me-2"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? "hide" : "show"}
//                   </span>
//                 </Form.Group>

//                 {error && (
//                   <p className="text-danger">User email or password is incorrect</p>
//                 )}

//                 <Button variant="primary" type="submit" disabled={isLoading}>
//                   {isLoading ? "Loading..." : "Submit"}
//                 </Button>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { setCookie } from "../utils/common"; // Import your setCookie function

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { setUserInfo } = useUser();
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(false); // Reset error state on new login attempt

        try {
            // Fetch user data from the JSON files
            const usersResponse = await fetch('/data/customers.json');
            const usersData = await usersResponse.json();

            const rolesResponse = await fetch('/data/roles.json');
            const rolesData = await rolesResponse.json();

            // Find the user by username
            const user = usersData.find(user => user.username === username);
            if (!user || user.password !== password) {
                setError(true);
                return;
            }

            // Get the role based on roleId
            const role = rolesData.find(role => role.id === user.roleId);

            // Set user info in context
            const userInfo = {
                id: user.id,
                name: user.name,
                role: role.roleName,
                privileges: role.privilege
            };

            // Set cookie for user authentication
            setCookie("_USER_AUTH_", JSON.stringify(userInfo));

            setUserInfo(userInfo);
            const roleUrl = `/${role.roleName.toLowerCase()}/projects`; // e.g., /admin/projects, /agent/projects

            navigate(roleUrl);
        } catch (error) {
            console.error(error);
            setError(true); // Set error on fetch failure
        }
    };

    return (
        <Container
            fluid
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0"
            }}
        >
            <Col md={4}>
                <div className="login-box p-4 rounded shadow bg-white">
                    <h2 className="text-center mb-4">Sign In</h2>
                    {error && (
                        <Alert variant="danger" className="text-center">
                            Invalid username or password
                        </Alert>
                    )}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                </div>
            </Col>
        </Container>
    );
};

export default Login;
