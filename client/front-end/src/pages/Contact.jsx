import React, { useState } from "react";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

export default function Contact() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = await { title, author, description };
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/demande`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div className="d-flex justify-content-center flex-column p-4  col-10 offset-1">
      <div className="text-center pt-5 mt-2">
        <h3>Demander Un Livre!</h3>
        <p>
          Découvrez un monde de lectures sans limites. Obtenez le livre que vous
          désirez, qu'il soit gratuit ou payant, en remplissant simplement notre
          formulaire de demande. La lecture est à portée de main, accessible à
          tous les amateurs de livres, grâce à notre service simple et pratique.
        </p>
      </div>
      <div className="pt-3">
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Titre de livre</Form.Label>
            <Form.Control
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Titre de livre"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Auteur</Form.Label>
            <Form.Control
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              required
              type="text"
              placeholder="Auteur"
            />
          </Form.Group>
        </Row>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Plus d'informations"
        >
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        <Button
          className="w-100 mt-2"
          onClick={handleSubmit}
          variant="primary"
          type="submit"
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
}
