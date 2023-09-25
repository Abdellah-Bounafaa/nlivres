import { createContext, useContext, useEffect, useState } from "react";
// import dotenv from "dotenv";
// dotenv.config();
const StateContext = createContext({
  arabic_books: [],
  french_books: [],
  english_books: [],
  books: [],
  hacking_books: [],
  marketing_books: [],
  programmation_books: [],
  design_books: [],
  self_devs_books: [],
});
export const ContextProvider = ({ children }) => {
  const [arabic_books, setArabicBooks] = useState([]);
  const [french_books, setFrenchBooks] = useState([]);
  const [english_books, setEnglishBooks] = useState([]);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`);
      const data = await res.json();
      setArabicBooks(data.arabic_books);
      setFrenchBooks(data.french_books);
      setEnglishBooks(data.english_books);
      setBooks(data.books.data);
    };
    getBooks();
  }, []);

  return (
    <StateContext.Provider
      value={{
        arabic_books,
        french_books,
        english_books,
        books,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
