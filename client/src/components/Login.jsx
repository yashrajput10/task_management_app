
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import '../App.css';

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Form
        onSubmit={handleLogin}
        className="w-100 p-4 shadow-lg"
        style={{
          maxWidth: "400px",
          backgroundColor: "#3C3D37",
          borderRadius: "10px",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-white">LOGIN</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="text-center mb-4">
          <Form.Text>
            Not Registered?{" "}
            <Link to="/register" className="text-decoration-none fw-bold">
              REGISTER NOW
            </Link>
          </Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 text-light fw-bold fs-5"
          style={{ padding: "10px 0", borderRadius: "8px" }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
