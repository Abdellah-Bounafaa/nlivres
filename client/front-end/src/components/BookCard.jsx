import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const style = { height: "200px" };
function BookCard({ book, showTitle }) {
  return (
    <div className="p-2" key={book.id}>
      <Card className="overflow-hidden" style={{ height: "300px" }}>
        <Link to={`/book/${book.id}`}>
          {" "}
          <Card.Img
            variant="top"
            style={style}
            src={`${import.meta.env.VITE_API_URL}/books/images/${book.image}`}
          />
        </Link>
        <Card.Body className="p-2">
          {!showTitle && (
            <Link
              className="text-decoration-none text-black"
              to={`/book/${book.id}`}
            >
              <Card.Title style={{ fontSize: "16px" }} title={`${book.title}`}>
                {book.title.slice(0, 30)}...
              </Card.Title>
            </Link>
          )}

          <Card.Text style={{ fontSize: "12px" }}>
            {book.language} |{" "}
            <b>
              {book.categorie_id === 1
                ? "Hacking"
                : book.categorie_id === 2
                ? "Marketing"
                : book.categorie_id === 3
                ? "Programmation"
                : book.categorie_id === 4
                ? "Design"
                : book.categorie_id === 5
                ? "Développement Personnel"
                : ""}
            </b>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookCard;
