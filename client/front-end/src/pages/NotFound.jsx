import React from "react";
import { Link } from "react-router-dom";
const Style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};
export default function NotFound() {
  return (
    <div style={Style}>
      <h1>Error 404</h1>
      <Link to={"/"}>Acceuil</Link>
    </div>
  );
}
