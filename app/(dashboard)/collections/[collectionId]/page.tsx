import CollectionForm from "@/components/collections/CollectionForm";
import Collection from "@/lib/models/Collection";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const res = await fetch(
    `http://localhost:3000/api/collections/${params.collectionId}`,
    {
      method: "GET",
    }
  );
  const collectionDetails = await res.json();

  // const collectionDetails = await Collection.findById(params.collectionId);

  return <CollectionForm initialData={collectionDetails} />;
};

export default CollectionDetails;
