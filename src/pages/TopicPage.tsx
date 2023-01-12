import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Table from "../components/table/Table";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import Dropdown from "../components/dropdown/Dropdown";
import Select from "../components/dropdown/Select";
import List from "../components/dropdown/List";
import Option from "../components/dropdown/Option";
import Heading from "../layout/Heading";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

const TopicPage = () => {
  const [topicListKL, setTopicListKL] = useState([]);
  const [topicListTT, setTopicListTT] = useState([]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Topics");
      const q = query(
        colRef,
        where("category", "==", "1"),
        where("status", "==", "2")
      );
      const querySnapshot = await getDocs(q);
      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTopicListKL(result);
    }
    getData();
  }, []);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Topics");
      const q = query(
        colRef,
        where("category", "==", "2"),
        where("status", "==", "2")
      );
      const querySnapshot = await getDocs(q);
      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTopicListTT(result);
    }
    getData();
  }, []);

  return (
    <div>
      <Heading>Danh sách đề tài</Heading>

      <div className="container flex gap-x-5 justify-center pt-5 min-h-[1000px]">
        <Tabs className="w-full">
          <TabList className="flex justify-center">
            <Tab>
              {" "}
              <Button
                href="/topic"
                type="button"
                className="w-[250px] text-white bg-thirdary"
                kind="secondary"
              >
                Khóa luận tốt nghiệp{" "}
              </Button>
            </Tab>
            <Tab>
              {" "}
              <Button
                type="button"
                className="w-[250px] text-white bg-quaternary"
                kind="secondary"
              >
                Thực tập chuyên ngành{" "}
              </Button>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="container">
              <div className="container flex justify-between">
                <p>Khóa luận tốt nghiệp</p>
                {/* <Dropdown> */}
                {/* <Select placeholder="Lọc theo giảng viên"></Select> */}
                {/* <List>
                    {brands.length > 0 &&
                      brands.map((item) => (
                        <Option
                          key={item.id}
                          // onClick={() => handleClickOptionBrand(item)}
                        >
                          {item.name}
                        </Option>
                      ))}
                  </List> */}
                {/* </Dropdown> */}
              </div>

              <Table>
                <thead>
                  <tr>
                    <th>Stt</th>
                    <th>Tên đề tài</th>
                    <th>Gv Hướng dẫn</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {topicListKL.length > 0 &&
                    topicListKL.map((topic, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/detailTopic?id=${topic.id}`}>
                            {topic.name}
                          </Link>
                        </td>

                        <td>{topic.authName}</td>
                        <td>{topic.totalQuantity}</td>
                        {topic.totalQuantity <= 0 ? (
                          <td>Đã hết</td>
                        ) : (
                          <td>Hiện còn</td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="container">
              <div className="container flex justify-between">
                <p>Thực tập chuyên ngành</p>
                {/* <Dropdown>
                  <Select placeholder="Lọc theo giảng viên"></Select> */}
                {/* <List>
                    {brands.length > 0 &&
                      brands.map((item) => (
                        <Option
                          key={item.id}
                          // onClick={() => handleClickOptionBrand(item)}
                        >
                          {item.name}
                        </Option>
                      ))}
                  </List> */}
                {/* </Dropdown> */}
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>Stt</th>
                    <th>Tên đề tài</th>
                    <th>Gv Hướng dẫn</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {topicListTT.length > 0 &&
                    topicListTT.map((topic, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/detailTopic?id=${topic.id}`}>
                            {topic.name}
                          </Link>
                        </td>

                        <td>{topic.authName}</td>
                        <td>{topic.totalQuantity}</td>
                        {topic.totalQuantity <= 0 ? (
                          <td>Đã hết</td>
                        ) : (
                          <td>Hiện còn</td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default TopicPage;
