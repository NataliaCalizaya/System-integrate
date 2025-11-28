import { useState } from "react";

const Trazabilidad = () => {
  const [form, setForm] = useState({
    lote: "",
    contenedor: "",
    vehiculo: "",
    chofer: "",
    fechaCarga: "",
    precinto: "",
    observaciones: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Trazabilidad registrada.");
    console.log(form);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold text-teal-700 mb-4">
        Registro de Trazabilidad de Lote
      </h2>

      <div className="space-y-4">

        <div>
          <label className="font-medium block mb-1">N° de lote</label>
          <input
            name="lote"
            value={form.lote}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="font-medium block mb-1">N° de contenedor</label>
          <input
            name="contenedor"
            value={form.contenedor}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium block mb-1">Vehículo</label>
            <input
              name="vehiculo"
              value={form.vehiculo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Chofer</label>
            <input
              name="chofer"
              value={form.chofer}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="font-medium block mb-1">Fecha de carga</label>
          <input
            name="fechaCarga"
            type="date"
            value={form.fechaCarga}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Precinto</label>
          <input
            name="precinto"
            value={form.precinto}
            onChange={handleChange}
            placeholder="Ej: N° de sello"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Observaciones</label>
          <textarea
            name="observaciones"
            rows={3}
            value={form.observaciones}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded font-bold"
        >
          Guardar trazabilidad
        </button>
      </div>
    </div>
  );
};

export default Trazabilidad;
