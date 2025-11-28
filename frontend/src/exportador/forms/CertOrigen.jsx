import React, { useState } from "react";

const CertOrigen = () => {
  const [form, setForm] = useState({
    exportador: "",
    direccionExportador: "",
    cuitExportador: "",
    importador: "",
    direccionImportador: "",
    paisImportacion: "",
    numeroFactura: "",
    fechaFactura: "",
    descripcionMercaderia: "",
    codigoHS: "",
    cantidad: "",
    pesoNeto: "",
    pesoBruto: "",
    paisOrigen: "",
    medioTransporte: "",
    numeroBL: "",
    observaciones: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Certificado de Origen:", form);
    alert("Certificado de Origen generado (prototipo)");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Certificado de Origen</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="block font-medium">Exportador (nombre y dirección)</label>
          <textarea
            name="exportador"
            value={form.exportador}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>

        <div>
          <label className="block font-medium">Dirección Exportador</label>
          <input
            name="direccionExportador"
            value={form.direccionExportador}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">CUIT / Identificación Exportador</label>
          <input
            name="cuitExportador"
            value={form.cuitExportador}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <hr className="my-4" />

        <div>
          <label className="block font-medium">Importador / Destinatario (nombre y dirección)</label>
          <textarea
            name="importador"
            value={form.importador}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>

        <div>
          <label className="block font-medium">Dirección Importador</label>
          <input
            name="direccionImportador"
            value={form.direccionImportador}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">País de Importación / Destino</label>
          <input
            name="paisImportacion"
            value={form.paisImportacion}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Número de Factura Comercial</label>
            <input
              name="numeroFactura"
              value={form.numeroFactura}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Fecha de Factura</label>
            <input
              type="date"
              name="fechaFactura"
              value={form.fechaFactura}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Descripción de la Mercadería</label>
          <textarea
            name="descripcionMercaderia"
            value={form.descripcionMercaderia}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Código arancelario / HS Code</label>
            <input
              name="codigoHS"
              value={form.codigoHS}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">País de Origen</label>
            <input
              name="paisOrigen"
              value={form.paisOrigen}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Cantidad</label>
            <input
              name="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              classNumber="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Peso Neto</label>
            <input
              name="pesoNeto"
              value={form.pesoNeto}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium">Peso Bruto</label>
            <input
              name="pesoBruto"
              value={form.pesoBruto}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Medio de Transporte</label>
            <input
              name="medioTransporte"
              value={form.medioTransporte}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">B/L o Número de Conocimiento de Embarque</label>
            <input
              name="numeroBL"
              value={form.numeroBL}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Observaciones / Notas</label>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold"
        >
          Generar Certificado de Origen
        </button>
      </form>
    </div>
  );
};

export default CertOrigen;
