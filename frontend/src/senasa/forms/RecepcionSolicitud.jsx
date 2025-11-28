const RecepcionSolicitud = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Recepción de Solicitud</h2>

      <form className="space-y-4">
        <div>
          <label className="font-medium block">Empresa exportadora</label>
          <input className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="font-medium block">País destino</label>
          <input className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="font-medium block">Descripción de mercancía</label>
          <textarea className="w-full border rounded px-3 py-2" rows="3" />
        </div>

        <div>
          <label className="font-medium block">Adjuntar documentación PDF</label>
          <input type="file" accept="application/pdf" className="w-full border py-2 rounded" />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RecepcionSolicitud;
