import { useState, useEffect } from "react";
import api from "../services/api";

export default function PersonForm({ persona, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    nombre_completo: "",
    identificacion: "",
    edad: "",
    genero: "Masculino",
    maneja: false,
    usa_lentes: false,
    diabetico: false,
    otra_enfermedad: "",
  });

  useEffect(() => {
    if (persona) {
      setForm({
        nombre_completo: persona.nombre_completo || "",
        identificacion: persona.identificacion || "",
        edad: persona.edad || "",
        genero: persona.genero || "Masculino",
        maneja: persona.maneja || false,
        usa_lentes: persona.usa_lentes || false,
        diabetico: persona.diabetico || false,
        otra_enfermedad: persona.otra_enfermedad || "",
      });
    }
  }, [persona]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (persona) {
        // editar persona existente
        await api.put(`/personas/${persona.id}`, form);
      } else {
        // crear nueva persona
        await api.post("/personas", form);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("Error al guardar persona");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            name="nombre_completo"
            value={form.nombre_completo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Identificación</label>
          <input
            type="text"
            className="form-control"
            name="identificacion"
            value={form.identificacion}
            onChange={handleChange}
            required
            disabled={!!persona}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Edad</label>
          <input
            type="number"
            className="form-control"
            name="edad"
            value={form.edad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Género</label>
          <select
            className="form-select"
            name="genero"
            value={form.genero}
            onChange={handleChange}
          >
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Otro</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Otra enfermedad</label>
          <input
            type="text"
            className="form-control"
            name="otra_enfermedad"
            value={form.otra_enfermedad}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12 d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="maneja"
              checked={form.maneja}
              onChange={handleChange}
            />
            <label className="form-check-label">¿Maneja?</label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="usa_lentes"
              checked={form.usa_lentes}
              onChange={handleChange}
            />
            <label className="form-check-label">¿Usa lentes?</label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="diabetico"
              checked={form.diabetico}
              onChange={handleChange}
            />
            <label className="form-check-label">¿Diabético?</label>
          </div>
        </div>

        <div className="col-12 d-flex gap-2">
          <button className="btn btn-success" type="submit">
            {persona ? "Guardar cambios" : "Guardar persona"}
          </button>
          {persona && onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
