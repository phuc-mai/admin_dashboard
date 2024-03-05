"use client";

import Loader from "@/components/custom ui/Loader";
import ProductDashboard from "@/components/products/ProductDashboard";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <ProductDashboard data={products} />
    </div>
  );
};

export default ProductsPage;
