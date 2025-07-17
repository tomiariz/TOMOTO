import React from "react";

export default function Pending() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-yellow-600 mb-4">Pago pendiente</h1>
      <p>Tu pago está siendo procesado. Te avisaremos cuando se confirme.</p>
    </div>
  );
}