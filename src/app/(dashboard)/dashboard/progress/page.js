"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Data from "@/components/Dashboard_Progress/Data";
import WithoutData from "@/components/Dashboard_Progress/WithoutData";

export default function ProgressPage() {
  const [data, setData] = useState({});
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated" || !session) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/progress/${session?.user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch progress data");
        }
        const result = await response.json();
        setData(Array.isArray(result) ? result[0] : result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  function CustomLoader() {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7C5CFC]"></div>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <CustomLoader />
      ) : data && Object.keys(data).length > 0 ? (
        <Data data={data} />
      ) : (
        <WithoutData />
      )}
    </div>
  );
}
