import { RouterProvider } from "react-router-dom";
import "./app.css";
import router from "./router";
import { ContextProvider } from "./contexts/ContextProvider";
// const style = {
//   position: "relative",
//   minHeight: "100vh",
//   flexGrow: 1,
// };
function App() {
  return (
    <div className="App">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  );
}

export default App;
