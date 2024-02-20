"use client"

import { useEffect, useState } from "react";

import CollectionDashboard from "@/components/collections/CollectionDashboard";
import Loader from "@/components/custom ui/Loader";

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    }
    catch (error) {
      console.log("collections_GET", error);
    }
  }

  useEffect(() => {
    getCollections();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <CollectionDashboard data={collections} />
    </div>
  );
};

export default Collections;
