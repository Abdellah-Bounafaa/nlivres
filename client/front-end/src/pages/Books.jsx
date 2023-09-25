import BookSlider from "../components/BookSlider";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
const linksStyle = {
  padding: "10px 20px",
  borderRadius: "3px",
  backgroundColor: "#fafafa",
  marginLeft: "3px",
  marginBottom: "3px",
  color: "black",
  textDecoration: "none",
};
export default function Books() {
  useEffect(() => {
    document.title = "Accueil | Livres";
  }, []);
  const { arabic_books, french_books, english_books } = useStateContext();
  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="mb-4 d-lg-block d-flex flex-column">
        <Link style={linksStyle} to="/books/hacking">
          Hacking
        </Link>
        <Link style={linksStyle} to="/books/marketing">
          Marketing
        </Link>
        <Link style={linksStyle} to="/books/programmation">
          Programmation
        </Link>
        <Link style={linksStyle} to="/books/design">
          Design
        </Link>
        <Link style={linksStyle} to="/books/developpement-personnel">
          Développement Personnel
        </Link>
      </div>

      {arabic_books.length > 0 && (
        <>
          {" "}
          <h5>Livres / Arabe</h5>
          <BookSlider className="mb-6" books={arabic_books} />
        </>
      )}

      {french_books.length > 0 && (
        <>
          {" "}
          <h5>Livres / Français</h5>
          <BookSlider books={french_books} />
        </>
      )}
      {english_books.length > 0 && (
        <>
          {" "}
          <h5>Livres / Anglais</h5>
          <BookSlider books={english_books} />
        </>
      )}
    </div>
  );
}
