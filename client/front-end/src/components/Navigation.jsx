import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Import the faPlus icon
const customFontStyles = {
  fontFamily: "Skranji, sans-serif", // Use the same font family name
  fontSize: "40px",
  fontWeight: "bold",
  marginRight: "30px",
};
const style = {
  position: "absolute",
  top: "100%" /* Position below the input field */,
  left: 0,
  zIndex: 1 /* Ensure the results appear above other content */,
  backgroundColor: " #fff" /* Add background color if needed */,
  border: "1px solid #ccc" /* Add borders or styling as needed */,
  width: "100%" /* Adjust the width as needed */,
  maxHeight: "200px" /* Set a maximum height to enable scrolling */,
  overflowY: "auto" /* Enable vertical scrolling if needed */,
  display: "block",
};
const liversStyle = {
  color: "white",
  textShadow: `1px 0 black, -1px 0 black, 0 1px black, 0 -1px black,
               1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black`, // Text stroke
  marginLeft: "-2px",
};
export default function Navigation() {
  const userData = JSON.parse(localStorage.getItem("user-info"));
  const [keyword, setKeyword] = useState("");
  const { books } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user-info")
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const logout = () => {
    localStorage.removeItem("user-info");
    setIsLoggedIn(false);
  };
  const itIsAdmin = () => {
    if (userData && userData.email === "abdllahbounafaa@gmail.com") {
      setIsAdmin(true);
    }
  };
  useEffect(() => {
    itIsAdmin();
  }, [isAdmin]);
  return (
    <div className="container">
      {" "}
      <Navbar expand="lg" className="navbar mb-4">
        <Container fluid>
          <Navbar.Brand href="/" style={customFontStyles}>
            n
            <span className="livres" style={liversStyle}>
              Livres
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link className="text-decoration-none text-black fs-5" to={"/"}>
                  Acceuil
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  className="text-decoration-none text-black fs-5"
                  to={"/demande"}
                >
                  Demande de Livres{" "}
                </Link>
              </Nav.Link>
            </Nav>
            <Form className="d-flex flex-column position-relative">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => {
                  setKeyword(e.target.value);
                  handleSerch();
                }}
              />
              {keyword && (
                <ul style={style} className="list-unstyled">
                  {books
                    .filter((book) => {
                      if (
                        book.title
                          .toLowerCase()
                          .startsWith(keyword.toLowerCase())
                      ) {
                        return book;
                      }
                    })
                    .map((book) => (
                      <li className="p-3">
                        <Link
                          className="text-decoration-none text-black"
                          to={`/book/${book.id}`}
                        >
                          {book.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </Form>
            <Nav>
              {isLoggedIn ? (
                <div className="p-1 d-flex justify-content-center gap-2">
                  {" "}
                  <Button onClick={() => logout()} variant="outline-danger">
                    Logout
                  </Button>
                  {isAdmin && (
                    <>
                      {" "}
                      <Link to={"/create-book"} className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} />
                      </Link>
                      <Link to={"/demandes"} className="btn btn-primary">
                        <FontAwesomeIcon icon={faBell} />
                      </Link>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {" "}
                  <Link
                    className="p-2 text-decoration-none text-black"
                    to={"/register"}
                  >
                    Inscrire
                  </Link>
                  <Link
                    className="p-2 text-decoration-none text-black"
                    to={"/login"}
                  >
                    Se connecter
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
