import { useState } from "react";

export default function RespuestaAutomatica() {
  const [input, setInput] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const generarRespuesta = () => {
    const texto = input.toLowerCase();

    // Detectar folio, patente y RUT
    const folio = texto.match(/folio\s(?:nº\s*)?(\d{9})/)?.[1] || "";
    const patente = texto.match(/patente(?:\s*asociada\s*es)?\s*([a-z]{4,6}-\d{1,2})/i)?.[1] || "";
    const rut = texto.match(/(?:rut\s*(?:de\s*la\s*empresa)?\s*:?\s*)(\d{1,2}\.\d{3}\.\d{3}-\d|\d{7,8}-\dk?)/i)?.[1] || "";

    // Tarjeta no recibida con datos completos
    if (texto.includes("no hemos recibido la tarjeta") && folio && patente && rut) {
      setRespuesta(`Gracias por tu mensaje. Revisamos la solicitud con folio ${folio}, patente ${patente} y RUT ${rut}. Actualmente está en reparo.\n\nPara continuar, necesitamos que adjuntes el padrón del vehículo o certificado de 1ª inscripción, ya que debemos validar el tipo de vehículo según indica el área resolutora.`);
      return;
    }

    // Tarjeta no recibida con datos incompletos
    if (texto.includes("no hemos recibido la tarjeta")) {
      setRespuesta("Gracias por tu mensaje. ¡Podrías confirmarme el folio de solicitud, la patente asociada y el RUT de la empresa para revisar el estado?");
      return;
    }

    // Activación
    if (texto.includes("activar") || texto.includes("clave")) {
      setRespuesta("Gracias por escribirnos. Si ya eres cliente Copec, la tarjeta llegó al correo registrado. Si no te ha llegado, por favor indícanos tu RUT y correo para verificar.");
      return;
    }

    // Transferencia
    if (texto.includes("transferir saldo") || texto.includes("cambiar")) {
      setRespuesta("Puedes realizar la transferencia entre productos ingresando a https://cupon.copec.cl con tu usuario administrador. Luego ve a \"Departamentos\" > \"Transferir\" y selecciona el saldo que deseas mover al tipo de combustible correspondiente.");
      return;
    }

    // Mensaje por defecto
    setRespuesta("Gracias por tu mensaje. Por favor, cuéntame más detalles para poder ayudarte mejor.");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generador de Respuestas Copec 🛠️</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Pega aquí la solicitud del cliente..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={generarRespuesta}
      >
        Generar Respuesta
      </button>

      {respuesta && (
        <div className="bg-gray-100 p-4 mt-6 rounded">
          <p className="font-semibold mb-2">Respuesta generada:</p>
          <p>{respuesta}</p>
          <button
            className="mt-2 bg-gray-200 px-3 py-1 rounded hover:bg-gray-400"
            onClick={() => navigator.clipboard.writeText(respuesta)}
          >
            📋 Copiar
          </button>
        </div>
      )}
    </div>
  );
}
