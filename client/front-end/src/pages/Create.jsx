import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [categorie_id, setCategorie_id] = useState(0);
  const [year, setYear] = useState(0);
  const [language, setLanguage] = useState("");
  const [pages, setPages] = useState(0);
  const [description, setDescription] = useState("");
  const fileObject = useRef("");
  const imageRef = useRef("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let filesize = 0;
    let selectedFile = {};
    let selectedImage = {};
    if (fileObject.current.files.length > 0) {
      selectedFile = fileObject.current.files[0];
      selectedImage = imageRef.current.files[0];
      filesize = selectedFile.size;
    }
    const megabytes_size = filesize / (1024 * 1024);
    const size = Math.round(megabytes_size).toFixed(2);
    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("year", year);
    data.append("language", language);
    data.append("pages", pages);
    data.append("description", description);
    data.append("filename", selectedFile);
    data.append("image", selectedImage);
    data.append("size", parseInt(size));
    data.append("categorie_id", categorie_id);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/create-book`, {
      method: "POST",
      body: data,
      // headers: {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      // },
    });
    if (res.status === 201) {
      alert("Livre est créé");
      navigate("/");
    }
  };
  return (
    <Container>
      <div className="col-md-10 offset-1 p-5 mb-5">
        <h3 className="pb-2">Create New Book</h3>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titre de livre"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Autheur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Autheur de livre"
                name="author"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                aria-label="Catégorie de livre"
                name="category"
                value={categorie_id}
                onChange={(e) => {
                  setCategorie_id(e.target.value);
                }}
              >
                <option>Catégorie de livre</option>
                <option value="1">Hacking</option>
                <option value="2">Marketing</option>
                <option value="3">Programmation</option>
                <option value="4">Design</option>
                <option value="4">Développement Personnel</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Année</Form.Label>
              <Form.Control
                type="number"
                placeholder="Année de publication"
                name="year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label>Language</Form.Label>
              <Form.Select
                aria-label="Choose Language"
                name="language"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              >
                <option>Choisir la langue</option>
                <option value="Arabic">Arabe</option>
                <option value="English">Anglais</option>
                <option value="French">Français</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik105"
              className="position-relative"
            >
              <Form.Label>Pages</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nombre des pages"
                name="pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Form.Group
            as={Col}
            md="12"
            controlId="validationFormik105"
            className="position-relative"
          >
            <Form.Label>Description</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={description} // Set the initial data value
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data); // Update the description using editor.getData()
              }}
            />
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Couverture</Form.Label>
            <Form.Control type="file" name="image" ref={imageRef} />
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control type="file" name="filename" ref={fileObject} />
          </Form.Group>

          <Button className="w-100" type="submit">
            Créér
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Create;
