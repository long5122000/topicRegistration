import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TopicPage from "./pages/TopicPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import MyTopicsPage from "./pages/MyTopicsPage";
import Infolecturers from "./pages/Infolecturers";
import RegisterTopic from "./pages/RegisterTopic";
import { AuthProvider } from "./context/auth-context";
import SignInPage from "./pages/SignInPage";

import DashBoardLayout from "./modules/dashboard/DashBoardLayout";
import DashBoardPage from "./pages/DashBoardPage";

import PlanAddNew from "./modules/plan/PlanAddNew";
import UserStudentList from "./modules/user/student/UserStudentList";
import StudentAddNewExcel from "./modules/user/student/StudentAddNewExcel";
import StudentAddNew from "./modules/user/student/StudentAddNew";
import StudentUpdate from "./modules/user/student/StudentUpdate";
import UserManage from "./modules/user/UserManage";
import LecturerList from "./modules/user/lecturers/LecturerList";
import LecturersAddNewExcel from "./modules/user/lecturers/LecturersAddNewExcel";
import LecturersAddNew from "./modules/user/lecturers/LecturersAddNew";
import LecturersUpdate from "./modules/user/lecturers/LecturersUpdate";
import AdminList from "./modules/user/admin/AdminList";
import AdminAddNewExcel from "./modules/user/admin/AdminAddNewExcel";
import AdminAddNew from "./modules/user/admin/AdminAddNew";
import AdminUpdate from "./modules/user/admin/AdminUpdate";
import PlanList from "./modules/plan/PlanList";
import PlanUpdate from "./modules/plan/PlanUpdate";
import TopicList from "./modules/topic/TopicList";
import TopicView from "./modules/topic/TopicView";
import TopicUpdate from "./modules/topic/TopicUpdate";
import ProposedTopic from "./pages/ProposedTopic";
import ProposedTopicView from "./modules/topic/ProposedTopicView";
import ProposedTopicUpdate from "./modules/topic/ProposedTopicUpdate";
import Sample from "./Sample";
import MyInfoPage from "./pages/MyInfoPage";
import BrowserTopicPage from "./pages/BrowserTopicPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route element={<Header></Header>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/topic" element={<TopicPage></TopicPage>}></Route>
            <Route
              path="/detailTopic"
              element={<TopicDetailPage></TopicDetailPage>}
            ></Route>
            <Route
              path="/MyTopic"
              element={<MyTopicsPage></MyTopicsPage>}
            ></Route>
            <Route
              path="/ListLecturers"
              element={<Infolecturers></Infolecturers>}
            ></Route>
            <Route
              path="/RegisterTopic"
              element={<RegisterTopic></RegisterTopic>}
            ></Route>
            <Route path="/SignIn" element={<SignInPage></SignInPage>}></Route>
            <Route
              path="/ProposedTopic"
              element={<ProposedTopic></ProposedTopic>}
            ></Route>
            <Route
              path="/ProposedTopicView"
              element={<ProposedTopicView></ProposedTopicView>}
            ></Route>
            <Route
              path="/ProposedTopicUpdate"
              element={<ProposedTopicUpdate></ProposedTopicUpdate>}
            ></Route>
            <Route path="/myInfo" element={<MyInfoPage></MyInfoPage>}></Route>
            <Route
              path="/BrowseTopics"
              element={<BrowserTopicPage></BrowserTopicPage>}
            ></Route>
          </Route>
          <Route element={<DashBoardLayout></DashBoardLayout>}>
            <Route
              path="/dashboard"
              element={<DashBoardPage></DashBoardPage>}
            ></Route>

            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/ListStudent"
              element={<UserStudentList></UserStudentList>}
            ></Route>
            <Route
              path="/manage/StudentAddNewExcel"
              element={<StudentAddNewExcel></StudentAddNewExcel>}
            ></Route>
            <Route
              path="/manage/StudentAddNew"
              element={<StudentAddNew></StudentAddNew>}
            ></Route>
            <Route
              path="/manage/StudentUpdate"
              element={<StudentUpdate></StudentUpdate>}
            ></Route>

            <Route
              path="/manage/ListLecturer"
              element={<LecturerList></LecturerList>}
            ></Route>
            <Route
              path="/manage/LecturersAddNewExcel"
              element={<LecturersAddNewExcel></LecturersAddNewExcel>}
            ></Route>
            <Route
              path="/manage/LecturersAddNew"
              element={<LecturersAddNew></LecturersAddNew>}
            ></Route>
            <Route
              path="/manage/LecturersUpdate"
              element={<LecturersUpdate></LecturersUpdate>}
            ></Route>
            <Route
              path="/manage/ListAdmin"
              element={<AdminList></AdminList>}
            ></Route>
            <Route
              path="/manage/AdminAddNewExcel"
              element={<AdminAddNewExcel></AdminAddNewExcel>}
            ></Route>
            <Route
              path="/manage/AdminAddNew"
              element={<AdminAddNew></AdminAddNew>}
            ></Route>
            <Route
              path="/manage/AdminUpdate"
              element={<AdminUpdate></AdminUpdate>}
            ></Route>
            <Route
              path="/manage/AddNewPlan"
              element={<PlanAddNew></PlanAddNew>}
            ></Route>
            <Route
              path="/manage/ListPlans"
              element={<PlanList></PlanList>}
            ></Route>
            <Route
              path="/manage/PlanUpdate"
              element={<PlanUpdate></PlanUpdate>}
            ></Route>
            <Route
              path="/manage/TopicList"
              element={<TopicList></TopicList>}
            ></Route>
            <Route
              path="/manage/TopicView"
              element={<TopicView></TopicView>}
            ></Route>
            <Route
              path="/manage/TopicUpdate"
              element={<TopicUpdate></TopicUpdate>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
