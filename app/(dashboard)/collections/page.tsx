import CollectionDashboard from "@/components/collections/CollectionDashboard";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

const Collections = async () => {
  const res = await fetch("http://localhost:3000/api/collections", {
    method: "GET",
  });
  
  const collections = await res.json();

  // const collections = await Collection.find().populate({ path: "products.product", model: Product }) as CollectionType[]

  return (
    <div className="px-10 py-5">
      <CollectionDashboard data={collections} />
    </div>
  );
};

export default Collections;
