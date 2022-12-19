import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { db } from "../../firebase-app/firebase-config";

const AppointmentList = () => {
  const { userInfo } = useAuth();
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "Appointments");
    const q = query(colRef, where("status", "==", true));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAppointments(result);
    });
  }, [userInfo]);
  console.log(appointments);
  return (
    <div className="">
      {appointments.length > 0 &&
        appointments.map((item) => (
          <Link
            to={`/AppointmentDetail?id=${item.id}`}
            className="text py-3 pl-3 border-b-2"
          >
            {item.name}
            <span className="text-[#8b8b8b] text-xs pl-5">
              (
              {new Date(item?.createdAt?.seconds * 1000).toLocaleDateString(
                "vi-VI"
              )}
              )
            </span>
          </Link>
        ))}
    </div>
  );
};

export default AppointmentList;
