import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import BookCard from "../components/BookCard";

const demandeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};

export default function BooksCategory() {
  const { categoryId } = useParams();
  const { books } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 18;
  const showTitle = true;
  useEffect(() => {
    const categoryMapping = {
      hacking: 1,
      marketing: 2,
      programmation: 3,
      design: 4,
      "developpement-personnel": 5,
    };

    const id = categoryMapping[categoryId];
    const filtered = books.filter((book) => book.categorie_id === id);
    setFilteredBooks(filtered);
  }, [categoryId, books]);

  const [filteredBooks, setFilteredBooks] = useState([]);

  // Calculate the current books to display based on pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <div>
        {filteredBooks.length > 0 ? (
          <>
            <h3>Livres de {categoryId}</h3>
            <Row>
              {currentBooks.map((book) => (
                <Col key={book.id} xs={6} md={2}>
                  <BookCard book={book} showTitle={showTitle} />
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-between align-items-center pt-2">
              <Pagination>
                <Pagination.Prev onClick={prevPage} />
                {Array(Math.ceil(filteredBooks.length / booksPerPage))
                  .fill()
                  .map((_, i) => (
                    <Pagination.Item
                      key={i}
                      active={i + 1 === currentPage}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                <Pagination.Next onClick={nextPage} />
              </Pagination>
              <div>
                <p>
                  Total : <b>{filteredBooks.length}</b>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div style={demandeStyle}>
            <span className="d-block fs-4">
              Actuellement, il n'y a pas de livres de cette catégorie
              disponibles.
            </span>
            <Link to={"/demande"}>Faire une demande</Link>
          </div>
        )}
      </div>
    </Container>
  );
}
