// Paso 1: Crea un nuevo archivo llamado `RespuestaAutomatica.jsx`

import { useState } from 'react';

export default function RespuestaAutomatica() {
  const [input, setInput] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const generarRespuesta = () => {
    const texto = input.toLowerCase();

    // Datos extraídos
    const folio = texto.match(/folio\s+es\s+(\d+)/i)?.[1] || '';
    const patente = texto.match(/patente\s+es\s+([A-Z0-9\-]+)/i)?.[1] || '';
    const rut = texto.match(/rut\s+(de\s+la\s+empresa\s+)?es\s+(\d{1,2}\.?\d{3}\.?\d{3}\-\d{1})/i)?.[2] || '';

    if (texto.includes('no llega la tarjeta') || texto.includes('no hemos recibido la tarjeta')) {
      if (folio && patente && rut) {
        setRespuesta(
          `Gracias por tu mensaje. Revisamos la solicitud con folio ${folio} y patente ${patente}. Actualmente está en reparo.
Para continuar, necesitamos que adjuntes el padrón del vehículo o certificado de 1° inscripción, ya que debemos validar el tipo de vehículo según indica el área resolutora.
Quedo atento.`
        );
      } else {
        setRespuesta('Gracias por tu mensaje. ¿Podrías confirmarme el folio de solicitud, la patente asociada y el RUT de la empresa para revisar el estado?');
      }
    } else if (texto.includes('factura') && texto.includes('no llega')) {
      setRespuesta('Gracias por escribirnos. Si ya eres cliente Copec, la factura llega al correo registrado. Si no te ha llegado, por favor indícanos tu RUT y correo para verificar.');
    } else if (texto.includes('transferir saldo') && texto.includes('cupón')) {
      setRespuesta('Puedes realizar la transferencia entre productos ingresando a https://cupon.copec.cl con tu usuario administrador. Luego ve a "Departamentos" > "Transferir" y selecciona el saldo que deseas mover al tipo de combustible correspondiente.');
    } else {
      setRespuesta('Gracias por tu mensaje. Por favor, cuéntame más detalles para poder ayudarte mejor.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generador de Respuestas Copec 🛠️</h1>
      <textarea
        className="w-full h-32 p-2 border rounded mb-4"
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
        <div className="mt-6 bg-gray-100 p-4 rounded">
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

