import React from 'react';
import { createPayment } from '../hooks/usePayment';

export const CheckoutButton = ({ items }) => {
  const handleCheckout = async () => {
    const buyerInfo = {
      name: "Comprador Test",
      email: "TESTUSER309207713@testuser.com", // <-- Usa la cuenta de comprador que creaste
      address: "Calle Falsa 123"
    };
    const res = await createPayment(items, buyerInfo);
    if (res.sandbox_init_point) {
      window.location.href = res.sandbox_init_point;
    } else {
      alert("Error al crear preferencia");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="btn-primary w-full mb-4 text-black"
      disabled={items.length === 0}
    >
      Pagar con Mercado Pago
    </button>
  );
};