import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Control, FieldValues, useForm, useWatch } from "react-hook-form";
import Banner from "../components/banner/Banner";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Radio from "../components/radio/radio";
import { useAuth } from "../context/auth-context";
import { db } from "../firebase-app/firebase-config";
import AppointmentList from "../modules/appointment/AppointmentList";
import { ButtonTypes } from "../utils/enums";

const HomePage = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  const { control, watch, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: { age: "" },
  });
  const handleAddNew = (values: {}) => {
    console.log(values);
  };
  const watchStatus = watch("age");

  return (
    <>
      <Banner></Banner>
      <div className="container flex justify-around pt-5">
        <Button
          href="/topic"
          type="button"
          className="w-[250px] "
          kind="secondary"
        >
          Danh sách đề tài
        </Button>
        <Button
          href="/ListLecturers"
          type="button"
          className="w-[250px]"
          kind="thirdary"
        >
          Thông tin giảng viên
        </Button>
        <Button type="button" className="w-[250px] " kind="quaternary">
          Kết quả nghiên cứu{" "}
        </Button>
        {userInfo?.role === "2" ? (
          <Button
            href="/RegisterTopic"
            type="button"
            className="w-[250px] "
            kind="quinary"
          >
            Đề xuất đề tài
          </Button>
        ) : (
          ""
        )}
        {userInfo?.topicId ? (
          <Button
            href="/AppointmentList
"
            type="button"
            className="w-[250px] "
            kind="quinary"
          >
            Danh sách cuộc hẹn
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="container grid grid-cols-3 gap-4 py-10">
        <div className="col-span-2  min-h-[400px] ">
          <div className="border-b-2 bg-primary  ">
            <h3 className="text-white font-semibold text-xl py-3 pl-3">
              Tin tức{" "}
            </h3>
          </div>

          {/* <div className="">
            <p className="text py-3 pl-3 border-b-2">
              TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
              🕹🇻🇳🏆
              <span className="text-[#8b8b8b] text-xs pl-5">(29/10/2020)</span>
              <span className="text pl-3 text-xs font-bold text-red-500">
                New
              </span>
            </p>
            <p className="text py-3 pl-3 border-b-2">
              TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
              🕹🇻🇳🏆
              <span className="text-[#8b8b8b] text-xs pl-5">(29/10/2020)</span>
            </p>
            <p className="text py-3 pl-3 border-b-2">
              TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
              🕹🇻🇳🏆
              <span className="text-[#8b8b8b] text-xs pl-5">(29/10/2020)</span>
            </p>
            <p className="text py-3 pl-3 border-b-2">
              TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
              🕹🇻🇳🏆 — tại Indigo
              <span className="text-[#8b8b8b] text-xs pl-5">(29/10/2020)</span>
            </p>
            <p className="text py-3 pl-3 border-b-2">
              TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia]
              <span className="text-[#8b8b8b] text-xs pl-5">(29/10/2020)</span>
            </p>
          </div> */}
          <div className="flex justify-end">
            <p>Xem them</p>{" "}
          </div>
        </div>
        <div className="gap-y-5 flex flex-col">
          <div className=" min-h-[200px]">
            <div className="border-b-2 bg-primary  ">
              <h3 className="text-white font-semibold text-xl py-3 pl-3">
                Bộ môn{" "}
              </h3>
            </div>
            <div>
              <p className="text py-3 pl-3 border-b-2">
                TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
                🕹🇻🇳🏆 — tại Indigo Bar Saigon.
              </p>
              <p className="text py-3 pl-3 border-b-2">
                TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
                🕹🇻🇳🏆 — tại Indigo Bar Saigon.
              </p>
              <p className="text py-3 pl-3 border-b-2">
                TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
                🕹🇻🇳🏆 — tại Indigo Bar Saigon.
              </p>
            </div>
            <div className="flex justify-end">
              <p>Xem them</p>{" "}
            </div>
          </div>
          <div className=" min-h-[200px]">
            <div className="border-b-2 bg-primary  ">
              <h3 className="text-white font-semibold text-xl py-3 pl-3">
                Tài liệu văn bản{" "}
              </h3>
            </div>
            <div>
              <p className="text py-3 pl-3 border-b-2">
                TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
                🕹🇻🇳🏆 — tại Indigo Bar Saigon.
              </p>
              <p className="text py-3 pl-3 border-b-2">
                TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
                🕹🇻🇳🏆 — tại Indigo Bar Saigon.
              </p>
              <p className="text py-3 pl-3 border-b-2">
                TK Nguyen đã thêm một ảnh mới vào album: [NRG Asia] Be Legendary
                🕹🇻🇳🏆 — tại Indigo Bar Saigon.
              </p>
            </div>
            <div className="flex justify-end">
              <p>Xem them</p>{" "}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default HomePage;
