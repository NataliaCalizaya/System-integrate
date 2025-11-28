const Visita = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Agendar Visita</h2>

      <form className="space-y-4">
        <div>
          <label className="block font-medium">Fecha</label>
          <input type="date" className="border rounded w-full px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium">Inspector asignado</label>
          <input className="border rounded w-full px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium">Observaciones</label>
          <textarea className="border rounded w-full px-3 py-2" rows="3" />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Visita;
