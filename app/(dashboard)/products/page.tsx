import ProductDashboard from "@/components/products/ProductDashboard";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

const ProductsPage = async () => {
  // const res = await fetch("http://localhost:3000/api/products", {
  //   method: "GET",
  // });
  // const products = await res.json();

  const products = await Product.find().populate({ path: "collections", select: "title" }) as ProductType[] // Converts the result to plain JavaScript objects

  const formattedProducts: ProductType[] = products.map(product => ({
    ...product,
    price: parseFloat(product.price.toString()), // or parseFloat(product.price.toString())
    cost: parseFloat(product.cost.toString()), // or parseFloat(product.cost.toString())
  }));

  return (
    <div className="px-10 py-5">
      <ProductDashboard data={formattedProducts} />
    </div>
  );
};

export default ProductsPage;
