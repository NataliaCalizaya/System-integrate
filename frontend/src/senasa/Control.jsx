import { useState } from "react";

const Control = () => {
  const [resultado, setResultado] = useState("OK");

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Resultado de Control</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Inspector responsable</label>
          <input className="border rounded w-full px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium">Resultado</label>
          <select
            className="border rounded w-full px-3 py-2"
            value={resultado}
            onChange={(e) => setResultado(e.target.value)}
          >
            <option value="OK">APTO (Aprobado)</option>
            <option value="NO">NO APTO (Rechazo)</option>
          </select>
        </div>

        {resultado === "NO" && (
          <div>
            <label className="block font-medium text-red-600">Motivo del rechazo</label>
            <textarea
              className="border rounded w-full px-3 py-2"
              rows="3"
            />
          </div>
        )}

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Control;
