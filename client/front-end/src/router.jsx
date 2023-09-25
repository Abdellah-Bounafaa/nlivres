import Login from "./pages/Login";
import Register from "./pages/Register";
import Consult from "./pages/Consult";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";
import Books from "./pages/Books";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import BooksCategory from "./pages/BooksCategory";
import Contact from "./pages/Contact";
import Requests from "./pages/Requests";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/book/:id",
        element: <Consult />,
      },
      {
        path: "/create-book",
        element: <Create />,
      },
      {
        path: "/",
        element: <Books />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:categoryId",
        element: <BooksCategory />,
      },
      {
        path: "/demande",
        element: <Contact />,
      },
      {
        path: "/demandes",
        element: <Requests />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
