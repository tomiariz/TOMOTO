import React from "react";

export default function Failure() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Pago rechazado</h1>
      <p>Hubo un problema con tu pago. Intenta nuevamente.</p>
    </div>
  );
}