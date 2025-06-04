// ✅ Paso 1: Área con nuevas condiciones para detectar solicitudes de tarjeta no recibida
import { useState } from "react";

export default function RespuestaAutomatica() {
  const [input, setInput] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const generarRespuesta = () => {
    const texto = input.toLowerCase();

    // Extraer datos posibles
    const folio = texto.match(/(?:folio|solicitud)[^\d]*(\d{9})/i)?.[1] || "";
    const patente = texto.match(/\b([A-Z]{2,4}\d{2,4}|\w{6,8})\b/gi)?.find(p => /\d/.test(p)) || "";
    const rut = texto.match(/\b(\d{1,2}\.\d{3}\.\d{3}-\d{1}|\d{8}-\d{1})\b/)?.[1] || "";

    // ✅ Solicitud de tarjeta no recibida
    if (
      texto.includes("no hemos recibido la tarjeta") ||
      texto.includes("no nos ha llegado la tarjeta") ||
      texto.includes("no llega la tarjeta") ||
      texto.includes("no la hemos recibido") ||
      texto.includes("aún no recibimos la tarjeta") ||
      texto.includes("no ha sido entregada") ||
      texto.includes("no se ha entregado")
    ) {
      if (folio && patente && rut) {
        setRespuesta(
          `Gracias por tu mensaje. Revisamos la solicitud con folio ${folio}, patente ${patente} y el RUT ${rut}. Actualmente está en reparo. Para continuar, necesitamos que adjuntes el padrón del vehículo o certificado de 1° inscripción, ya que debemos validar el tipo de vehículo según indica el área resolutora.`
        );
      } else {
        setRespuesta(
          `Gracias por tu mensaje. ¿Podrías confirmarme el folio de solicitud, la patente asociada y el RUT de la empresa para revisar el estado?`
        );
      }
      return;
    }

    // Solicitud de activación
    if (texto.includes("activar") || texto.includes("clave")) {
      setRespuesta(
        `Gracias por escribirnos. Si ya eres cliente Copec, la tarjeta llegó al correo registrado. Si no te ha llegado, por favor indícanos tu RUT y correo para verificar.`
      );
      return;
    }

    // Transferencia de saldo
    if (texto.includes("transferir saldo") || texto.includes("cambiar")) {
      setRespuesta(
        `Puedes realizar la transferencia entre productos ingresando a https://cupon.copec.cl con tu usuario administrador. Luego ve a 'Departamentos' > 'Transferir' y selecciona el saldo que deseas mover al tipo de combustible correspondiente.`
      );
      return;
    }

    // Mensaje genérico
    setRespuesta("Gracias por tu mensaje. Por favor, cuéntame más detalles para poder ayudarte mejor.");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
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
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="font-semibold mb-2">Respuesta generada:</p>
          <p className="mb-2 whitespace-pre-wrap">{respuesta}</p>
          <button
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            onClick={() => navigator.clipboard.writeText(respuesta)}
          >
            📋 Copiar
          </button>
        </div>
      )}
    </div>
  );
}
