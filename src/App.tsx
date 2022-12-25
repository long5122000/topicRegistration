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
import BrowserTopicView from "./modules/topic/BrowserTopicView";

import ProgressReportsPage from "./pages/ProgressReportsPage";
import AppointmentAddNew from "./modules/appointment/AppointmentAddNew";
import AppointmentDetailPage from "./pages/AppointmentDetailPage";
import AppointmentListLecturer from "./modules/appointment/AppointmentListLecturer";
import AppointmentView from "./modules/appointment/AppointmentView";
import AppointmentListLecturerView from "./modules/appointment/AppointmentListLecturerView";
import AppointmentManage from "./modules/appointment/AppointmentManage";
import BaseConfirmationList from "./modules/appointment/BaseConfirmation/BaseConfirmationList";
import BaseConfirmationAddNew from "./modules/appointment/BaseConfirmation/BaseConfirmationAddNew";
import AppointmentList from "./modules/appointment/AppointmentList";
import BaseConfirmationDetail from "./modules/appointment/BaseConfirmation/BaseConfirmationDetail";
import BaseConfirmationLecturerView from "./modules/appointment/BaseConfirmation/BaseConfirmationLecturerView";
import BaseConfirmationLecturerEdit from "./modules/appointment/BaseConfirmation/BaseConfirmationLecturerEdit";
import InternshipAssessmentAddNew from "./modules/appointment/InternshipAssessment/InternshipAssessmentAddNew";
import InternshipAssessmentList from "./modules/appointment/InternshipAssessment/InternshipAssessmentList";
import InternshipAssessmentDetail from "./modules/appointment/InternshipAssessment/InternshipAssessmentDetail";
import InternshipAssessmentLecturerView from "./modules/appointment/InternshipAssessment/InternshipAssessmentLecturerView";
import InternshipBaseOpinionAddNew from "./modules/appointment/InternshipBaseOpinion/InternshipBaseOpinionAddNew";
import InternshipBaseOpinionList from "./modules/appointment/InternshipBaseOpinion/InternshipBaseOpinionList";
import InternshipBaseOpinionDetail from "./modules/appointment/InternshipBaseOpinion/InternshipBaseOpinionDetail";
import InternshipBaseOpinionLecturerView from "./modules/appointment/InternshipBaseOpinion/InternshipBaseOpinionLecturerView";
import InternshipOutlineAddNew from "./modules/appointment/InternshipOutline/InternshipOutlineAddNew";
import InternshipOutlineList from "./modules/appointment/InternshipOutline/InternshipOutlineList";
import InternshipOutlineDetail from "./modules/appointment/InternshipOutline/InternshipOutlineDetail";
import InternshipOutlineLecturerView from "./modules/appointment/InternshipOutline/InternshipOutlineLecturerView";
import InternshipReportAddNew from "./modules/appointment/InternshipReport/InternshipReportAddNew";
import InternshipReportList from "./modules/appointment/InternshipReport/InternshipReportList";
import InternshipReportDetail from "./modules/appointment/InternshipReport/InternshipReportDetail";
import InternshipReportLecturerView from "./modules/appointment/InternshipReport/InternshipReportLecturerView";
import BrowserTopicEdit from "./modules/topic/BrowserTopicEdit";
import DetailList from "./modules/dashboard/DetailList";

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
            <Route
              path="/BrowserTopicView"
              element={<BrowserTopicView></BrowserTopicView>}
            ></Route>
            <Route
              path="/BrowserTopicEdit"
              element={<BrowserTopicEdit></BrowserTopicEdit>}
            ></Route>
            <Route
              path="/ProgressReports"
              element={<ProgressReportsPage></ProgressReportsPage>}
            ></Route>
            <Route
              path="/AppointmentAddNew"
              element={<AppointmentAddNew></AppointmentAddNew>}
            ></Route>
            <Route
              path="/AppointmentManage"
              element={<AppointmentManage></AppointmentManage>}
            ></Route>
            <Route
              path="/AppointmentList"
              element={<AppointmentList></AppointmentList>}
            ></Route>
            <Route
              path="/AppointmentListLecturer"
              element={<AppointmentListLecturer></AppointmentListLecturer>}
            ></Route>
            <Route
              path="/AppointmentListLecturerView"
              element={
                <AppointmentListLecturerView></AppointmentListLecturerView>
              }
            ></Route>
            <Route
              path="/AppointmentDetail"
              element={<AppointmentDetailPage></AppointmentDetailPage>}
            ></Route>
            <Route
              path="/AppointmentView"
              element={<AppointmentView></AppointmentView>}
            ></Route>
            <Route
              path="/BaseConfirmationList"
              element={<BaseConfirmationList></BaseConfirmationList>}
            ></Route>
            <Route
              path="/BaseConfirmationDetail"
              element={<BaseConfirmationDetail></BaseConfirmationDetail>}
            ></Route>
            <Route
              path="/BaseConfirmationLecturerView"
              element={
                <BaseConfirmationLecturerView></BaseConfirmationLecturerView>
              }
            ></Route>
            <Route
              path="/BaseConfirmationLecturerEdit"
              element={
                <BaseConfirmationLecturerEdit></BaseConfirmationLecturerEdit>
              }
            ></Route>
            <Route
              path="/BaseConfirmationAddNew"
              element={<BaseConfirmationAddNew></BaseConfirmationAddNew>}
            ></Route>
            <Route
              path="/InternshipAssessmentAddNew"
              element={
                <InternshipAssessmentAddNew></InternshipAssessmentAddNew>
              }
            ></Route>
            <Route
              path="/InternshipAssessmentList"
              element={<InternshipAssessmentList></InternshipAssessmentList>}
            ></Route>
            <Route
              path="/InternshipAssessmentDetail"
              element={
                <InternshipAssessmentDetail></InternshipAssessmentDetail>
              }
            ></Route>
            <Route
              path="/InternshipAssessmentLecturerView"
              element={
                <InternshipAssessmentLecturerView></InternshipAssessmentLecturerView>
              }
            ></Route>
            <Route
              path="/InternshipBaseOpinionAddNew"
              element={
                <InternshipBaseOpinionAddNew></InternshipBaseOpinionAddNew>
              }
            ></Route>
            <Route
              path="/InternshipBaseOpinionList"
              element={<InternshipBaseOpinionList></InternshipBaseOpinionList>}
            ></Route>
            <Route
              path="/InternshipBaseOpinitonDetail"
              element={
                <InternshipBaseOpinionDetail></InternshipBaseOpinionDetail>
              }
            ></Route>
            <Route
              path="/InternshipBaseOpinionLecturerView"
              element={
                <InternshipBaseOpinionLecturerView></InternshipBaseOpinionLecturerView>
              }
            ></Route>
            <Route
              path="/InternshipOutlineAddNew"
              element={<InternshipOutlineAddNew></InternshipOutlineAddNew>}
            ></Route>
            <Route
              path="/InternshipOutList"
              element={<InternshipOutlineList></InternshipOutlineList>}
            ></Route>
            <Route
              path="/InternshipOutlineDetail"
              element={<InternshipOutlineDetail></InternshipOutlineDetail>}
            ></Route>
            <Route
              path="/InternshipOutlineLecturerView"
              element={
                <InternshipOutlineLecturerView></InternshipOutlineLecturerView>
              }
            ></Route>
            <Route
              path="/InternshipReportAddNew"
              element={<InternshipReportAddNew></InternshipReportAddNew>}
            ></Route>
            <Route
              path="/InternshipReportList"
              element={<InternshipReportList></InternshipReportList>}
            ></Route>
            <Route
              path="/InternshipReportDetail"
              element={<InternshipReportDetail></InternshipReportDetail>}
            ></Route>
            <Route
              path="/InternshipReportLecturerView"
              element={
                <InternshipReportLecturerView></InternshipReportLecturerView>
              }
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
              path="/manage/DetailList"
              element={<DetailList></DetailList>}
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
