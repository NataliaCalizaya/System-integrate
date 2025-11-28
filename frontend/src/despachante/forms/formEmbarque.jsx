import React, { useState } from "react";

const FormEmbarque = () => {
  const [form, setForm] = useState({
    aduana: "",
    fecha: "",
    importador: "",
    cuitImportador: "",
    despachante: "",
    cuitDespachante: "",
    transporte: "",
    identificacionManifiesto: "",
    medio: "",
    paisOrigen: "",
    puertoEmbarque: "",
    puertoArribo: "",
    embalaje: "",
    bultos: "",
    valorFOB: "",
    divisa: "USD",
    fleteTotal: "",
    garantia: "",
    itemDescripcion: "",
    unidades: "",
    fobUnitario: "",
    baseIVA: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
    alert("Formulario enviado (prototipo)");
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl space-y-6"
      >
        <h2 className="text-2xl font-semibold text-slate-800">
          📦 Formulario — Permiso de Embarque
        </h2>

        {/* ===================== DATOS GENERALES ===================== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Aduana" name="aduana" value={form.aduana} onChange={handleChange} />
          <Input type="date" label="Fecha Oficialización" name="fecha" value={form.fecha} onChange={handleChange} />
          <Input label="Medio de Transporte" name="medio" value={form.medio} onChange={handleChange} />
        </section>

        {/* ===================== PARTICIPANTES ===================== */}
        <div className="border rounded-lg p-4 bg-slate-50">
          <h3 className="font-semibold mb-2 text-slate-700">Participantes</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Importador" name="importador" value={form.importador} onChange={handleChange} />
            <Input label="CUIT Importador" name="cuitImportador" value={form.cuitImportador} onChange={handleChange} />
            <Input label="Despachante" name="despachante" value={form.despachante} onChange={handleChange} />
            <Input label="CUIT Despachante" name="cuitDespachante" value={form.cuitDespachante} onChange={handleChange} />
          </div>
        </div>

        {/* ===================== ORIGEN / RUTA ===================== */}
        <div className="border rounded-lg p-4 bg-slate-50">
          <h3 className="font-semibold mb-2 text-slate-700">Ruta de Exportación</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="País de Origen" name="paisOrigen" value={form.paisOrigen} onChange={handleChange} />
            <Input label="Puerto de Embarque" name="puertoEmbarque" value={form.puertoEmbarque} onChange={handleChange} />
            <Input label="Puerto de Arribo" name="puertoArribo" value={form.puertoArribo} onChange={handleChange} />
          </div>
        </div>

        {/* ===================== CARGA ===================== */}
        <div className="border rounded-lg p-4 bg-slate-50">
          <h3 className="font-semibold mb-2 text-slate-700">Carga</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Tipo de Embalaje" name="embalaje" value={form.embalaje} onChange={handleChange} />
            <Input type="number" label="Cantidad de Bultos" name="bultos" value={form.bultos} onChange={handleChange} />
            <Input label="Identificación de Manifiesto" name="identificacionManifiesto" value={form.identificacionManifiesto} onChange={handleChange} />
          </div>
        </div>

        {/* ===================== VALORES ===================== */}
        <div className="border rounded-lg p-4 bg-slate-50">
          <h3 className="font-semibold mb-2 text-slate-700">Valores de Exportación</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input type="number" label="FOB Total" name="valorFOB" value={form.valorFOB} onChange={handleChange} />
            <Select
              label="Divisa"
              name="divisa"
              value={form.divisa}
              onChange={handleChange}
              options={["USD", "EUR", "ARS"]}
            />
            <Input type="number" label="Flete Total" name="fleteTotal" value={form.fleteTotal} onChange={handleChange} />
            <Input type="number" label="Garantías" name="garantia" value={form.garantia} onChange={handleChange} />
          </div>
        </div>

        {/* ===================== DECLARACION ===================== */}
        <div className="border rounded-lg p-4 bg-slate-50">
          <h3 className="font-semibold mb-2 text-slate-700">Declaración de Mercadería</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Descripción" name="itemDescripcion" value={form.itemDescripcion} onChange={handleChange} />
            <Input type="number" label="Unidades" name="unidades" value={form.unidades} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input type="number" label="FOB Unitario" name="fobUnitario" value={form.fobUnitario} onChange={handleChange} />
            <Input type="number" label="Base IVA" name="baseIVA" value={form.baseIVA} onChange={handleChange} />
            <Input type="text" label="Precio Un./Específico" name="precioEspecifico" value={form.precioEspecifico} onChange={handleChange} />
          </div>
        </div>

        {/* ===================== BOTÓN ===================== */}
        <div className="flex justify-end">
          <button className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow">
            Guardar / Generar
          </button>
        </div>
      </form>
    </div>
  );
};

// ========= COMPONENTES AUX ===============
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm text-slate-600 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-sm text-slate-600 font-medium mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default FormEmbarque;
