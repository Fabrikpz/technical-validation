import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import api from "./services/api";
import "./app.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [personas, setPersonas] = useState([]);
  const [editingPersona, setEditingPersona] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const fetchPersonas = async () => {
    try {
      const res = await api.get("/personas");
      setPersonas(res.data);
    } catch (error) {
      console.error("Error al cargar personas", error);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsAuthenticated(false);
  } else {
    setIsAuthenticated(true);
  }
}, []);

  useEffect(() => {
    if (isAuthenticated && !showCreateForm && !editingPersona) {
      fetchPersonas();
    }
  }, [isAuthenticated, showCreateForm, editingPersona]);

  // Eliminar persona
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro que quieres eliminar esta persona?")) return;

    try {
      await api.delete(`/personas/${id}`);
      // Recargar lista
      fetchPersonas();
    } catch (error) {
      alert("Error al eliminar persona");
      console.error(error);
    }
  };

  // Editar persona: abre el formulario con datos
  const handleEdit = (persona) => {
    setEditingPersona(persona);
    setShowCreateForm(false); // asegurarse de cerrar formulario crear si abierto
  };

  // Cuando se termine de editar o cancelar
  const handleEditSuccess = () => {
    setEditingPersona(null);
    fetchPersonas();
  };

  const handleCancelEdit = () => {
    setEditingPersona(null);
  };

  return (
    <div className="container mt-4">
      <header className="mb-4 text-center">
        <h1>Ficticia S.A. - Gestión de Clientes</h1>
      </header>

      {!isAuthenticated ? (
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Personas Registradas</h2>
            <div>
              {!editingPersona && (
                <button
                  className="btn btn-primary me-2"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                >
                  {showCreateForm ? "Cancelar" : "Registrar Persona"}
                </button>
              )}
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>

          {showCreateForm && (
            <div className="mb-4">
              <PersonForm
                onSuccess={() => {
                  setShowCreateForm(false);
                  fetchPersonas();
                }}
              />
            </div>
          )}

          {editingPersona && (
            <div className="mb-4">
              <PersonForm
                persona={editingPersona}
                onSuccess={handleEditSuccess}
                onCancel={handleCancelEdit}
              />
            </div>
          )}

          <PersonList personas={personas} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}

export default App;
