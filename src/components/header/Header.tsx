import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import Input from "../input/Input";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-app/firebase-config";
const menu: { id: number; name: string; url: string }[] = [
  {
    id: 1,
    name: "Trang chủ",
    url: "/",
  },
  {
    id: 2,
    name: "Giới thiệu",
    url: "/",
  },
  {
    id: 3,
    name: "Tin tức",
    url: "/",
  },
  {
    id: 4,
    name: "Liên hệ",
    url: "/",
  },
];
const Header = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);

  return (
    <>
      <div className="bg-[#032C4A]">
        <div className="xl:container  justify-between xl:h-[100px] md:h-[80px] md:p-4 sm:p-3  flex">
          <div className="flex gap-x-5 items-center ">
            <img src="Logo.png" alt="" className="h-[60px] w-[60px]" />
            <h1 className="text-white text-xl flex items-center">
              Khoa công nghệ thông tin
            </h1>
          </div>

          <div className="w-full max-w-sm relative  items-center xl:flex md:hidden sm:hidden">
            <input
              className="w-full px-10 py-3 text-sm font-medium border border-strock rounded-full text-black  placeholder:italic placeholder:text-slate-400"
              placeholder="search..."
            />
            <button className="absolute right-2 top-1/2 bg-[#40b6ce] -translate-y-1/2 py-2 px-4 rounded-full  text-lg text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <div className=" text-white items-center  transition xl:flex md:hidden sm:hidden">
            <div className="text-2xl relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div className="absolute w-[150px] right-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed rounded-xl z-10 transitioz-10 invisible group-hover:visible">
                {userInfo?.role === "1" ? (
                  ""
                ) : (
                  <Link
                    to={`/dashboard`}
                    className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                  >
                    <p className="ml-3 text-gray-600 text-sm font-medium">
                      Quản trị
                    </p>
                  </Link>
                )}
                <Link
                  to={`/myInfo`}
                  className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                >
                  <p className="ml-3 text-gray-600 text-sm font-medium">
                    Thông tin cá nhân
                  </p>
                </Link>
                {userInfo?.role === "2" ? (
                  <Link
                    to={`/ProposedTopic`}
                    className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                  >
                    <p className="ml-3 text-gray-600 text-sm font-medium">
                      Đề tài đề xuất
                    </p>
                  </Link>
                ) : (
                  ""
                )}
                {userInfo?.role === "2" ? (
                  <Link
                    to={`/BrowseTopics`}
                    className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                  >
                    <p className="ml-3 text-gray-600 text-sm font-medium">
                      Duyệt đề tài
                    </p>
                  </Link>
                ) : (
                  ""
                )}
                {userInfo?.role === "2" ? (
                  <Link
                    to={`/AppointmentListLecturer`}
                    className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                  >
                    <p className="ml-3 text-gray-600 text-sm font-medium">
                      Danh sách cuộc hẹn
                    </p>
                  </Link>
                ) : (
                  ""
                )}
                {userInfo?.role === "1" ? (
                  <Link
                    to={`/myTopic`}
                    className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                  >
                    <p className="ml-3 text-gray-600 text-sm font-medium">
                      Đề tài của tôi
                    </p>
                  </Link>
                ) : (
                  ""
                )}
                {!userInfo ? (
                  <Link
                    to={`/SignIn`}
                    className="flex items-center px-1 py-3 hover:bg-gray-100 transition"
                  >
                    <p className="ml-3 text-gray-600 text-sm font-medium">
                      Đăng nhập
                    </p>
                  </Link>
                ) : (
                  <div className="flex items-center px-1 py-3 hover:bg-gray-100 transition">
                    <p
                      className="ml-3 text-gray-600 text-sm font-medium"
                      onClick={() => signOut(auth)}
                    >
                      Đăng xuất
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center bg-whit xl:hidden">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[40px] w-[40px]"
            >
              <g clip-path="url(#clip0_9_173)">
                <path
                  d="M2 13.4H22V10.6H2V13.4ZM2 19H22V16.2H2V19ZM2 7.8H22V5H2V7.8Z"
                  fill="#fff"
                />
              </g>
              <defs>
                <clipPath id="clip0_9_173">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#DFEDF9] h-[50px] flex">
        <div className="container  items-center">
          <ul className="flex gap-x-7 justify-end items-center h-full">
            {menu.length > 0 &&
              menu.map((item) => <Link to={item.url}>{item.name}</Link>)}
          </ul>
        </div>
      </div>

      <Outlet></Outlet>
    </>
  );
};

export default Header;
