import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
const demandeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};
export default function Requests() {
  const [demandes, setDemandes] = useState([]);
  const getRequest = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/demandes`);
    const data = await res.json();
    setDemandes(data);
  };
  const isDone = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/done/${id}`, {
      method: "POST",
    });
  };
  useEffect(() => {
    getRequest();
  }, []);
  return (
    <div className="container" style={{ height: "60vh" }}>
      <div className="col-md-10 p-4">
        {demandes.length > 0 ? (
          <>
            {" "}
            <h3>Demandes</h3>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titre</th>
                  <th>Author</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((demande) => (
                  <tr key={demande.id}>
                    <td>{demande.id}</td>
                    <td>{demande.title}</td>
                    <td>{demande.author}</td>
                    <td>{demande.description}</td>
                    <td>
                      <button
                        onClick={() => isDone(demande.id)}
                        className="btn btn-secondary"
                      >
                        {" "}
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <div style={demandeStyle}>
            <h3>Pas de demandes maintenant!</h3>
          </div>
        )}
      </div>
    </div>
  );
}
