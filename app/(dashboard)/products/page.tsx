import ProductDashboard from "@/components/products/ProductDashboard";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

const ProductsPage = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    method: "GET",
  });
  const products = await res.json();

  // const products = await Product.find().populate({ path: "collections", select: "title" }) as ProductType[] // Converts the result to plain JavaScript objects

  return (
    <div className="px-10 py-5">
      <ProductDashboard data={products} />
    </div>
  );
};

export default ProductsPage;
