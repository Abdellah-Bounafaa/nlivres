import React, { useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const linksStyle = {
  color: "black",
};
const style = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
};
export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="widget">
                <h3 className="mb-4">À propos de nous</h3>
                <p>
                  Explorez ma bibliothèque numérique dédiée à la programmation,
                  au design, à la technologie et au développement personnel.
                  Découvrez une mine de connaissances et d'inspiration pour
                  enrichir votre vie professionnelle et personnelle. Bienvenue
                  dans cet univers captivant où le savoir et la créativité se
                  rencontrent.
                </p>
              </div>
            </div>
            <div className="col-lg-4 ps-lg-5">
              <div className="widget">
                <h3 className="mb-4">Links</h3>
                <ul className="list-unstyled float-start links">
                  <li>
                    <Link to={"/"}>Acceuil</Link>
                  </li>
                  <li>
                    <Link to={"/demande"}>Demande de livres</Link>
                  </li>
                  <li>
                    <Link style={linksStyle} to="/books/hacking">
                      Hacking
                    </Link>{" "}
                  </li>
                  <li>
                    <Link style={linksStyle} to="/books/marketing">
                      Marketing
                    </Link>{" "}
                  </li>
                  <li>
                    <Link style={linksStyle} to="/books/programmation">
                      Programmation
                    </Link>{" "}
                  </li>
                  <li>
                    <Link style={linksStyle} to="/books/design">
                      Design
                    </Link>{" "}
                  </li>
                  <li>
                    <Link
                      style={linksStyle}
                      to="/books/developpement-personnel"
                    >
                      Développement Personnel
                    </Link>{" "}
                  </li>

                  <li>
                    <a href="#">Portfolio</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="widget">
                <h3>Contactez nous</h3>
                <ul className="list-unstyled social d-flex flex-column">
                  <li>
                    Email : <b>abdllahbounafaa@gmail.com</b>{" "}
                  </li>
                  <li>
                    Phone : <b>+21251892171</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 text-center">
              <p>Copyright &copy; {currentYear}. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
