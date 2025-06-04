// Paso 1: Área con nuevas condiciones para detectar solicitudes de tarjeta no recibida
import { useState } from "react";

export default function RespuestaAutomatica() {
  const [input, setInput] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const generarRespuesta = () => {
    const texto = input.toLowerCase();

    // Extraer datos
    const folio = texto.match(/(?:folio|número de solicitud)\s*(\d{6,})/i)?.[1] || "";
    const patente = texto.match(/[a-z]{2,4}\d{2,4}|\b[a-z]{4}\d{2}\b|\b\w{6}\b/i)?.[0]?.toUpperCase() || "";
    const rut = texto.match(/\b(\d{1,2}\.?\d{3}\.\d{3}-[\dkK])\b/)?.[1] || "";

    // Solicitud de tarjeta no recibida
    if (
      (texto.includes("no hemos recibido") || texto.includes("aún no llega") || texto.includes("no ha llegado")) &&
      texto.includes("tarjeta")
    ) {
      if (!folio || !patente || !rut) {
        setRespuesta(
          "Gracias por tu mensaje. ¿Podrías confirmarme el folio de la solicitud, la patente asociada y el RUT de la empresa para revisar el estado?"
        );
      } else {
        setRespuesta(
          `Gracias por tu mensaje. Revisamos la solicitud con folio ${folio}, patente ${patente} y RUT ${rut}. Actualmente está en reparo.\n\nPara continuar, necesitamos que adjunten el padrón del vehículo o certificado de 1° inscripción, ya que debemos validar el tipo de vehículo según indica el área resolutora.\n\nQuedo atento.`
        );
      }
      return;
    }

    // Solicitud de activación
    if (texto.includes("activar") && texto.includes("tarjeta")) {
      setRespuesta(
        "Gracias por escribirnos. Si ya eres cliente Copec, la tarjeta llegó al correo registrado. Si no te ha llegado, por favor indícanos tu RUT y correo para verificar."
      );
      return;
    }

    // Transferencia de saldo
    if (texto.includes("transferir saldo") || texto.includes("cambiar")) {
      setRespuesta(
        "Puedes realizar la transferencia entre productos ingresando a https://cupon.copec.cl con tu usuario administrador. Luego ve a 'Departamentos' > 'Transferir' y selecciona el saldo que deseas mover al tipo de combustible correspondiente."
      );
      return;
    }

    // Mensaje genérico
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
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={generarRespuesta}
      >
        Generar Respuesta
      </button>

      {respuesta && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="font-semibold mb-2">Respuesta generada:</p>
          <p>{respuesta}</p>
          <button
            className="mt-2 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            onClick={() => navigator.clipboard.writeText(respuesta)}
          >
            📋 Copiar
          </button>
        </div>
      )}
    </div>
  );
}
