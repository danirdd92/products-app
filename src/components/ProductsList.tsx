import React from "react";
import { trpc } from "../utils/trpc";
import { ProductCard } from "./ProductCard";

export const ProductsList = () => {
  const { data: products, isLoading } = trpc.products.list.useQuery();
  if (isLoading || !products) return <div>loading...</div>;

  return (
    <div className="mb-12 mt-2 flex flex-col gap-4">
      {products.map((prod) => {
        return <ProductCard key={prod.id} product={prod} />;
      })}
    </div>
  );
};
