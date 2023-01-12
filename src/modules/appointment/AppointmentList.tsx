import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { useAuth } from "../../context/auth-context";
import { db } from "../../firebase-app/firebase-config";
import Heading from "../../layout/Heading";

const AppointmentList = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);

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
    <div className=" flex flex-col">
      {appointments.length > 0 &&
        appointments.map((item) => (
          <div className="border-b-2 py-3">
            <Link
              to={`/AppointmentDetail?id=${item.id}`}
              className="text pl-3 "
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
          </div>
        ))}
    </div>
  );
};

export default AppointmentList;
