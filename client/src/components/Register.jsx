import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Register({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);
    await axios
      .post("http://localhost:4000/api/v1/user/register", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAvatar("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
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
      onSubmit={handleRegister}
      className="w-100 p-4 shadow-lg"
      style={{
        maxWidth: "450px",
        backgroundColor: "#3C3D37",
        borderRadius: "10px",
      }}
    >
      <h3 className="text-center mb-4 fw-bold text-white">REGISTER</h3>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicAvatar">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          onChange={avatarHandler}
          required
        />
      </Form.Group>

      <Form.Group className="text-center mb-4">
        <Form.Text>
          Already Registered?{" "}
          <Link to="/login" className="text-decoration-none fw-bold">
            LOGIN
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

export default Register;
