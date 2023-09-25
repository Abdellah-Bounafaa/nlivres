import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Related from "./Related";

export default function Consult() {
  const [book, setBook] = useState([]);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getBook = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/book/${params.id}`,
        {
          method: "get",
        }
      );
      const data = await res.json();
      setBook(data);
      if (data.title) {
        document.title = data.title;
      }
      getRelatedBooks(data.categorie_id);
    };
    getBook();
  }, [params.id]);
  const getRelatedBooks = async (categorie_id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/category/${categorie_id}`
    );
    const data = await res.json();
    setRelatedBooks(data);
  };
  const handleDownloadClick = async () => {
    try {
      // Fetch the file content from the backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/books/files/${book.filename}`
      );
      const blob = await response.blob();

      // Create a blob URL for the file
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element
      const a = document.createElement("a");
      a.href = url;

      // Set the download attribute to specify the file name
      a.download = "example.pdf";

      // Programmatically trigger a click on the anchor element
      a.click();

      // Clean up by revoking the blob URL
      window.URL.revokeObjectURL(url);
    } catch (error) {}
  };
  return (
    <div className="container">
      <div className="d-md-flex gap-5 mt-5">
        <div className="d-flex flex-column align-items-center">
          <div className="text-center text-md-start d-lg-none">
            {" "}
            <h2>{book.title}</h2>
            <p className="mb-3">
              Par : <b>{book.author}</b>
            </p>
          </div>
          <div
            className="mb-3"
            style={{
              backgroundImage: `url('${
                import.meta.env.VITE_API_URL
              }/books/images/${book.image}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "200px",
              height: "300px",
            }}
          ></div>
          <p>
            Publié : <b>{book.year}</b>
          </p>
          <p>
            Pages : <b>{book.pages}</b>
          </p>
          <a
            onClick={handleDownloadClick}
            className="mb-4 btn btn-primary d-block d-lg-none"
          >
            Téléchargement Gratuit
          </a>
        </div>
        <div className="">
          <div className="d-sm-none d-lg-block">
            {" "}
            <h2>{book.title}</h2>
            <p className="mb-3">Par : {book.author}</p>
            <a onClick={handleDownloadClick} className="mb-4 btn btn-primary">
              Téléchargement Gratuit
            </a>
          </div>
          <p dangerouslySetInnerHTML={{ __html: book.description }}></p>
        </div>{" "}
      </div>
      {relatedBooks.length > 0 && <Related relatedBooks={relatedBooks} />}
    </div>
  );
}
