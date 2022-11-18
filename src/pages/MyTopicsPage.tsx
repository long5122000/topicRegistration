import React from "react";
import { Link } from "react-router-dom";
import ActionDelete from "../components/actions/ActionDelete";
import ActionEdit from "../components/actions/ActionEdit";
import ActionView from "../components/actions/ActionView";
import Footer from "../components/footer/Footer";
import Table from "../components/table/Table";
import Heading from "../layout/Heading";

const MyTopicsPage = () => {
  return (
    <div className="">
      <Heading>Đề tài của tôi</Heading>
      <div className="container  h-screen">
        <Table>
          <thead>
            <tr>
              <th>Stt</th>
              <th>Tên đề tài</th>
              <th>Gv Hướng dẫn</th>
              <th>Ngày đăng ký</th>
              <th>Loại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Link to={"/detailTopic"}>Xay dung website</Link>
              </td>
              <td>Nguyen Minh Linh</td>
              <td>30/11/2000</td>
              <td>KLTN</td>
              <td className="">
                <div className="flex gap-x-5 items-center text-gray-500">
                  <ActionView></ActionView>
                  <ActionEdit></ActionEdit>
                  <ActionDelete></ActionDelete>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyTopicsPage;
