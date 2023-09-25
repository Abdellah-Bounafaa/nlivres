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
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const getData = async (e) => {
    e.preventDefault();
    const item = { name, email, password };
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    res = await res.json();
    localStorage.setItem("user-info", JSON.stringify(res));
    navigate("/");
  };
  return (
    <div>
      <div className="col-md-4" style={style}>
        <h3 className="text-center text-primary">Créer un compte</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Enter your name"
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Addresse Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter email"
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Button
            onClick={getData}
            variant="primary"
            className="w-100"
            type="submit"
          >
            Je m'inscris
          </Button>
          <span className="d-block mb-2">
            Avez vous un compte? <Link to={"/login"}>Connexion</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}
