import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Table from "../components/table/Table";
import Heading from "../layout/Heading";

const Infolecturers = () => {
  return (
    <div>
      <Heading>Thông tin giảng viên</Heading>
      <div className="container  h-screen">
        <Table>
          <thead>
            <tr>
              <th>Stt</th>
              <th>Họ tên</th>
              <th>Chức danh</th>
              <th>Chức vụ</th>
              <th>Bộ môn</th>
              <th>email***</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Link to={"/detailTopic"}>Nguyen Minh Linh</Link>
              </td>
              <td>Thạc sĩ</td>
              <td>Phó trưởng BM</td>

              <td>KHOA HỌC MÁY TÍNH</td>
              <td>nvhoang</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Infolecturers;
