import React from "react";

export default function PersonList({ personas, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Identificación</th>
          <th>Edad</th>
          <th>Género</th>
          <th>Maneja</th>
          <th>Usa lentes</th>
          <th>Diabético</th>
          <th>Otra enfermedad</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {personas.map((p) => (
          <tr key={p.id}>
            <td>{p.nombre_completo}</td>
            <td>{p.identificacion}</td>
            <td>{p.edad}</td>
            <td>{p.genero}</td>
            <td>{p.maneja ? "Sí" : "No"}</td>
            <td>{p.usa_lentes ? "Sí" : "No"}</td>
            <td>{p.diabetico ? "Sí" : "No"}</td>
            <td>{p.otra_enfermedad || "-"}</td>
            <td>{p.estado ? "Activo" : "Inactivo"}</td>
            <td>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => onEdit(p)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(p.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
