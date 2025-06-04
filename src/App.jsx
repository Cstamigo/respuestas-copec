import { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  const generateResponse = () => {
    const normalized = inputText.toLowerCase();
    let reply = "";

    if (normalized.includes("tarjeta") && normalized.includes("no recibida")) {
      reply = `Hola, muchas gracias por tu mensaje. ¿Podrías confirmarme el RUT de la empresa y la patente asignada a la tarjeta? Con esos datos validamos el estado de la solicitud y te informamos.`;
    } else if (normalized.includes("transferencia") && normalized.includes("no aparece")) {
      reply = `Hola, gracias por tu mensaje. Por favor indícame: nombre completo, RUT de empresa, comprobante, fecha, hora, banco y monto transferido. Con eso gestionamos.`;
    } else if (normalized.includes("pedido") && normalized.includes("petróleo")) {
      reply = `Gracias por tu mensaje. Por favor indícame: ID cliente, producto, cantidad, fecha, ventana horaria, contacto y observaciones para gestionar el pedido.`;
    } else {
      reply = "Gracias por tu mensaje. Por favor, cuéntame más detalles para poder ayudarte mejor.";
    }

    setResponse(reply);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Generador de Respuestas Copec 🛠️</h1>
      <textarea
        placeholder="Pega aquí la solicitud del cliente..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={8}
        style={{ width: '100%', marginTop: '1rem' }}
      />
      <button onClick={generateResponse} style={{ marginTop: '1rem' }}>Generar Respuesta</button>
      {response && (
        <div style={{ marginTop: '2rem', background: '#f4f4f4', padding: '1rem' }}>
          <p><strong>Respuesta generada:</strong></p>
          <p>{response}</p>
          <button onClick={copyToClipboard}>📋 Copiar</button>
        </div>
      )}
    </div>
  );
}

export default App;