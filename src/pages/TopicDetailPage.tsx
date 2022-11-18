import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { Swiper, SwiperSlide } from "swiper/react";
import parse from "html-react-parser";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { toast } from "react-toastify";
// import required modules
import { Pagination, Navigation } from "swiper";
import Heading from "../layout/Heading";
import { useSearchParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { useAuth } from "../context/auth-context";
const TopicDetailPage = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);

  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const topicId: any = params.get("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!topicId) return;
      const colRef = doc(db, "Topics", topicId);
      const docData = await getDoc(colRef);
      if (docData) setData(docData.data());
    }
    fetchData();
  }, [topicId]);
  console.log(data);

  const handleRegisterTopic = async () => {
    console.log("he");

    try {
      await addDoc(collection(db, "RegisterTopic"), {
        name: userInfo.fullname,
        email: userInfo.email,
        date: userInfo.password,
        class: userInfo.class,
        status: "1",
        cv: userInfo.cv,
        createdAt: serverTimestamp(),
      });
      toast.success(`Create new user with email: ${data.name} successfully!`);
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
      console.log(error);
    }
  };
  return (
    <div>
      <Heading>Đề tài : Xây dựng web site bán đồ điện tử</Heading>

      <div className="container bg-[#f7ecec] p-6 mt-5 rounded-lg">
        <div className="flex mt-10 gap-x-5 border-b-2 border-gray-400 py-3">
          <h3 className="text-xl">Giảng viên hướng dẫn:</h3>
          <p className="text-xl">{data.authName}</p>
        </div>
        <div className="flex  gap-x-5 border-b-2 border-gray-400  py-3">
          <h3 className="text-xl">Trạng thái:</h3>
          {data.quatity <= 0 ? (
            <p className="text-xl">Đã hết</p>
          ) : (
            <p className="text-xl">Hiện còn</p>
          )}
        </div>
        <div className="flex  gap-x-5 border-b-2 border-gray-400 py-3">
          <h3 className="text-xl">Số lượng sinh viên:</h3>
          <p className="text-xl">1</p>
        </div>
        <div className="  gap-x-5 border-b-2 border-gray-400 py-3">
          <h3 className="text-xl">Mô tả:</h3>
          <p className="text-xl">{parse(data?.desc || "")}</p>
        </div>
        <div className="flex justify-center pt-14">
          <Button
            kind="primary"
            type="submit"
            onClick={handleRegisterTopic}
            className="w-[250px]"
          >
            Đăng ký
          </Button>
        </div>
      </div>

      {/* <div className="container my-10">
        <h3 className="text-2xl pt-3">Đề tài liên quan</h3>
        <div className=" flex gap-x-5 relationship">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            slidesPerGroup={3}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper relationship-swiper"
          >
            <SwiperSlide>
              {" "}
              <div className="bg-[#e5e5e5] rounded-lg p-3">
                <h3 className="text-xl">Xay dung website 3</h3>
                <p className="text-gray-500 text-sm py-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, at, veritatis officia doloribus aut deserunt illo,
                  velit repellat laboriosam nesciunt quis vel id corrupti
                  quaerat? Voluptate voluptas temporibus ullam beatae!
                </p>
                <span className="text-sm">Luong Duc Long</span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[#e5e5e5] rounded-lg p-3">
                <h3 className="text-xl">Xay dung website 3</h3>
                <p className="text-gray-500 text-sm py-3">
                  parse('<h1>single</h1>'); Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Maiores, at, veritatis officia
                  doloribus aut deserunt illo, velit repellat laboriosam
                  nesciunt quis vel id corrupti quaerat? Voluptate voluptas
                  temporibus ullam beatae!
                </p>
                <span className="text-sm">Luong Duc Long</span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="bg-[#e5e5e5] rounded-lg p-3">
                <h3 className="text-xl">Xay dung website 3</h3>
                <p className="text-gray-500 text-sm py-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, at, veritatis officia doloribus aut deserunt illo,
                  velit repellat laboriosam nesciunt quis vel id corrupti
                  quaerat? Voluptate voluptas temporibus ullam beatae!
                </p>
                <span className="text-sm">Luong Duc Long</span>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div> */}
      <Footer></Footer>
    </div>
  );
};

export default TopicDetailPage;
