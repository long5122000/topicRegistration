import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AppointmentView = () => {
  const [params] = useSearchParams();
  const AppointmentId: any = params.get("id");
  useEffect(() => {
    async function fetchData() {
      if (!AppointmentId) return;
      const colRef = doc(db, "Topics", AppointmentId);
      const docData = await getDoc(colRef);
      if (docData) setData(docData.data());
    }
    fetchData();
  }, [topicId]);
  console.log("data", data);
  return (
    <div>
      <p className="text-xl">{parse(data?.desc || "")}</p>
    </div>
  );
};

export default AppointmentView;
