import { useState } from "react";

const Documentos = () => {
  const [pdfs] = useState([
    { nombre: "Factura Comercial", file: "/docs/factura.pdf" },
    { nombre: "Certificado de Origen", file: "/docs/origen.pdf" },
    { nombre: "Packing List", file: "/docs/packing.pdf" },
    { nombre: "Fumigación", file: "/docs/fumi.pdf" },
    { nombre: "Certificado SENASA", file: "/docs/senasa.pdf" },
    { nombre: "Certificado Fitosanitario", file: "/docs/cf.pdf" },
  ]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-teal-700 mb-4">Documentación Asociada</h2>

      <ul className="space-y-3">
        {pdfs.map((doc, idx) => (
          <li key={idx} className="flex items-center justify-between border rounded px-4 py-2">
            <span className="font-medium">{doc.nombre}</span>
            <a
              href={doc.file}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Ver PDF
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-slate-500">
        ⚠️ Esta lista es solo visual para el transportista, despachante y SENASA.
      </p>
    </div>
  );
};

export default Documentos;
