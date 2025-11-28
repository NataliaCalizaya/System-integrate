import { useState } from "react";

const Certificado = () => {
  const [pdf, setPdf] = useState(null);

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Certificado Fitosanitario — SENASA
      </h2>

      <form className="space-y-6">

        {/* 1 - Nombre y dirección del exportador */}
        <div>
          <label className="font-semibold block mb-1">
            1 — Exportador (Nombre y dirección)
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* 2 - Destinatario */}
        <div>
          <label className="font-semibold block mb-1">
            2 — Destinatario declarado (Nombre y dirección)
          </label>
          <textarea
            rows={2}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* 3 - Medio de transporte */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-semibold block mb-1">
              3 — Medio de transporte declarado
            </label>
            <input
              placeholder="Camión / Container / Ferrocarril / Aéreo"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* 4 — Punto de entrada */}
          <div className="flex-1">
            <label className="font-semibold block mb-1">
              4 — Punto de entrada declarado
            </label>
            <input
              placeholder="Ej: Paso Jama / Valparaíso"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* 5 + 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="font-semibold block mb-1">
              5 — Producto / N° y Descripción de bultos
            </label>
            <textarea
              rows={2}
              placeholder="Ej: Limón Tahití / 24 pallets"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">
              6 — Cantidad declarada
            </label>
            <input
              type="number"
              placeholder="kg totales"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* 7 + 8 + 9 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold block mb-1">
              7 — Nombre botánico
            </label>
            <input
              placeholder="Citrus × aurantiifolia"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">
              8 — Lugar de origen
            </label>
            <input
              placeholder="Jujuy / Tucumán / Buenos Aires"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">
              9 — Marcas distintivas
            </label>
            <input
              placeholder="Código / sello / etiqueta"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* 10 — Declaración oficial */}
        <div>
          <p className="text-sm text-gray-700 bg-gray-50 border px-4 py-3 rounded">
            10 — Certifica que la mercadería ha sido inspeccionada y se considera libre de plagas cuarentenarias y cumple con los requisitos exigidos por el país importador.
          </p>
        </div>

        {/* TRATAMIENTOS */}
        <h3 className="font-bold text-md mt-6">Tratamiento Sanitarios</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="font-semibold block mb-1">
              12 — Tratamiento
            </label>
            <input
              placeholder="Fumigación / frío / etc."
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">
              13 — Producto químico y concentración
            </label>
            <input
              placeholder="Ingrediente activo %"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">
              14 — Duración
            </label>
            <input
              placeholder="Horas"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">
              15 — Temperatura
            </label>
            <input
              placeholder="°C"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* 16 */}
        <div>
          <label className="font-semibold block mb-1">
            16 — Fecha
          </label>
          <input type="date" className="border rounded w-full px-3 py-2" />
        </div>

        {/* 17 Informacion adicional */}
        <div>
          <label className="font-semibold block mb-1">
            17 — Información adicional
          </label>
          <textarea
            rows={3}
            placeholder="Declaraciones, observaciones técnicas, análisis"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* EMISIÓN */}
        <h3 className="font-bold text-md mt-6">Datos de expedición</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">
              Lugar de expedición
            </label>
            <input
              placeholder="Ciudad / Provincia"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">
              Fecha de emisión
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* OFICIAL */}
        <div>
          <label className="font-semibold block mb-1">
            Oficial autorizado
          </label>
          <input
            placeholder="Legajo / nombre / firma digital"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* SUBIR PDF */}
        <div className="pt-4">
          <label className="font-semibold block mb-2 text-green-700">
            Subir certificado firmado (PDF oficial)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            className="border rounded w-full px-3 py-2 bg-white"
          />
        </div>

        {pdf && (
          <p className="text-green-700 text-sm">
            Archivo cargado: <strong>{pdf.name}</strong>
          </p>
        )}

        {/* BOTÓN */}
        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold"
          >
            Generar Certificado
          </button>
        </div>
      </form>
    </div>
  );
};

export default Certificado;
