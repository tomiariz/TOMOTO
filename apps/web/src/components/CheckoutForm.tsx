import React, { useState } from 'react';
import { createPayment } from '../hooks/usePayment';

export const CheckoutForm = ({ items }) => {
  const [buyerInfo, setBuyerInfo] = useState({
    name: 'Comprador Test',
    email: 'TESTUSER309207713@testuser.com', // <-- Email por defecto del comprador de prueba
    address: 'Calle Falsa 123',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createPayment(items, buyerInfo);
      if (data.sandbox_init_point) {
        window.location.href = data.sandbox_init_point; // <-- Usa sandbox_init_point
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="checkout-form">
      <h2>Datos del comprador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={buyerInfo.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={buyerInfo.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={buyerInfo.address}
          onChange={handleChange}
          required
          className="input-field"
        />
        <button
          type="submit"
          className="btn-primary w-full mb-4 text-black"
          disabled={
            items.length === 0 ||
            !buyerInfo.name ||
            !buyerInfo.email ||
            !buyerInfo.address
          }
        >
          Pagar con Mercado Pago
        </button>
      </form>
    </div>
  );
}