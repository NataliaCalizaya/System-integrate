import React from "react";

const Transportista = () => {
  const docs = [
    {
      id: "factura",
      title: "Factura Comercial",
      subtitle: "Documento de Venta",
      file: "/docs/factura_comercial.pdf",
      icon: "📄",
    },
    {
      id: "cert-origen",
      title: "Certificado de Origen",
      subtitle: "Origen de la Mercadería",
      file: "/docs/certificado_origen.pdf",
      icon: "🌎",
    },
    {
      id: "fumigacion",
      title: "Certificado de Fumigación",
      subtitle: "Tratamiento Cuarentenario",
      file: "/docs/certificado_fumigacion.pdf",
      icon: "🪲",
    },
    {
      id: "tratamiento",
      title: "Constancia Tratamiento",
      subtitle: "Placa / Tratamiento",
      file: "/docs/tratamiento.pdf",
      icon: "🛡️",
    },
    {
      id: "senasa",
      title: "Certificado SENASA",
      subtitle: "Control Sanitario",
      file: "/docs/certificado_senasa.pdf",
      icon: "🍃",
    },
    {
      id: "fitosanitario",
      title: "Certificado Fitosanitario",
      subtitle: "Exportación Autorizada",
      file: "/docs/certificado_fitosanitario.pdf",
      icon: "🌱",
    },
    {
      id: "micdta",
      title: "MIC / DTA",
      subtitle: "Manifiesto Internacional",
      file: "/docs/mic_dta.pdf",
      icon: "🚛",
    },
    {
      id: "crt",
      title: "CRT",
      subtitle: "Carta de Porte Internacional",
      file: "/docs/crt.pdf",
      icon: "📦",
    },
    {
      id: "cert1993",
      title: "Certificado 1993 / OA",
      subtitle: "Mercancías Especiales",
      file: "/docs/certificado_1993.pdf",
      icon: "🧾",
    },
  ];

  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-xl font-semibold text-slate-200 mb-6">
        Documentación disponible
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {docs.map((doc) => (
          <a
            key={doc.id}
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex flex-col gap-2 hover:bg-slate-700 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 text-white">
              <span className="text-2xl">{doc.icon}</span>
              <span className="font-medium">{doc.title}</span>
            </div>
            <span className="text-sm text-slate-400">{doc.subtitle}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Transportista;
