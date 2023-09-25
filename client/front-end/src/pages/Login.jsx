import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getData = async (e) => {
    e.preventDefault();
    const item = { email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.error) {
        // Handle the error case here
        alert("Email ou Mot de passe est incorrect!");
      } else {
        // Handle the successful login here
        localStorage.setItem("user-info", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="col-md-4" style={style}>
      <h3 className="text-center text-primary">Connexion</h3>
      <Form method="post">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Addresse Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={getData}
          className="w-100"
          type="submit"
        >
          Login
        </Button>
        <span className="d-block mb-2">
          Vous n'avez pas de compte ? <Link to={"/register"}>Inscrire</Link>
        </span>
      </Form>
    </div>
  );
}
