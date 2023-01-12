import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-app/firebase-config";
const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Kế hoạch",
    url: "/manage/ListPlans",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  // {
  //   title: "Bills",
  //   url: "/manage/bills",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   title: "Category",
  //   url: "/manage/category",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   title: "Products",
  //   url: "/manage/products",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
  //       />
  //     </svg>
  //   ),
  // },
  {
    title: "Người dùng",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Đề tài",
    url: "/manage/topicList",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    ),
  },
  {
    title: "Tin tức",
    url: "/manage/AppointmentListAdmin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
        />
      </svg>
    ),
  },
  {
    title: "Logout",
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    onClick: () => signOut(auth),
  },
];
const SideBar = () => {
  return (
    <div className="w-[300px] bg-white shadow-[10px_10px_20px_rgba(218, 213, 213, 0.15)] rounded-xl">
      {sidebarLinks.map((link) => {
        if (link.onClick)
          return (
            <div
              className="flex items-center gap-5 py-[14px] px-5 font-medium text-gray-800 mb-5 cursor-pointer active:bg-[#f1fbf7] active:text-primary hover:[#f1fbf7] hover:text-primary"
              onClick={link.onClick}
              key={link.title}
            >
              <span className="menu-icon">{link.icon}</span>
              <span className="menu-text">{link.title}</span>
            </div>
          );
        return (
          <NavLink
            to={link.url}
            className="flex items-center gap-5 py-[14px] px-5 font-medium text-gray-800 mb-5 cursor-pointer active:bg-[#f1fbf7] active:text-primary hover:[#f1fbf7] hover:text-quaternary"
            key={link.title}
          >
            <span className="menu-icon">{link.icon}</span>
            <span className="menu-text">{link.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SideBar;
