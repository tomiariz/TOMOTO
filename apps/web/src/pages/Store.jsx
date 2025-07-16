import React from "react";
import { ProductCard } from "@tomoto/ui";
import { useCartStore } from "../store/cartStore";
import { useTranslation } from "react-i18next";

const customProducts = [
  {
    id: 1,
    name: "Tomoto Grey",
    description: "Edición especial gris, diseño minimalista.",
    price: 25000,
    image: "/tomoto1-grey-die-cut.png",
    inStock: true,
  },
  {
    id: 2,
    name: "Tomoto Earth",
    description: "Inspirado en la naturaleza, edición Earth.",
    price: 27000,
    image: "/tomoto1-earth-die-cut.png",
    inStock: true,
  },
  {
    id: 3,
    name: "Tomoto Black",
    description: "Clásico y elegante, edición Black.",
    price: 26000,
    image: "/tomoto1-balck-die-cut.png",
    inStock: true,
  },
];

function Store() {
  const { t } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product) => {
    addItem(product);
    alert("Producto agregado al carrito");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        TOMOTO&reg; {t("store")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
        {customProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

export default Store;