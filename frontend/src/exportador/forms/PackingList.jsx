import React, { useState } from "react";

const PackingList = () => {
  const [items, setItems] = useState([
    { id: Date.now(), marca: "", bulto: "", descripcion: "", cantidad: "", pesoNeto: "", pesoBruto: "", largo: "", ancho: "", alto: "" }
  ]);
  const [header, setHeader] = useState({
    numeroFactura: "",
    fechaFactura: ""
  });

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), marca: "", bulto: "", descripcion: "", cantidad: "", pesoNeto: "", pesoBruto: "", largo: "", ancho: "", alto: "" }
    ]);
  };

  const handleHeaderChange = (e) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id, e) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("PackingList:", { header, items });
    alert("Packing List generado (prototipo)");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Packing List</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium text-gray-700">Número de Factura Comercial</label>
          <input
            type="text"
            name="numeroFactura"
            value={header.numeroFactura}
            onChange={handleHeaderChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Fecha de Factura</label>
          <input
            type="date"
            name="fechaFactura"
            value={header.fechaFactura}
            onChange={handleHeaderChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-2">Detalle de Bultos / Cajas / Pallets</h3>

      {items.map((item, idx) => (
        <div key={item.id} className="border rounded p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium">Marca / Identificación</label>
              <input
                name="marca"
                value={item.marca}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Nº Bulto / Caja / Pallet</label>
              <input
                name="bulto"
                value={item.bulto}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium">Descripción del Contenido</label>
              <textarea
                name="descripcion"
                value={item.descripcion}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
                rows={2}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium">Cantidad</label>
              <input
                name="cantidad"
                value={item.cantidad}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Peso Neto</label>
              <input
                name="pesoNeto"
                value={item.pesoNeto}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Peso Bruto</label>
              <input
                name="pesoBruto"
                value={item.pesoBruto}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Largo (cm)</label>
              <input
                name="largo"
                value={item.largo}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Ancho (cm)</label>
              <input
                name="ancho"
                value={item.ancho}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Alto (cm)</label>
              <input
                name="alto"
                value={item.alto}
                onChange={(e) => handleItemChange(item.id, e)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={addItem}
          className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded"
        >
          + Añadir Bulto
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
      >
        Generar Packing List
      </button>
    </div>
  );
};

export default PackingList;
