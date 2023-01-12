import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { set, useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import ExcelUpload from "../../components/excel/ExcelUpload";
import { read, utils, writeFile } from "xlsx";
import Toggle from "../../components/toggle/Toggle";
import Table from "../../components/table/Table";
import LabelStatus from "../../components/label/LabelStatus";
import useExcel from "../../hooks/useExcel";
import { uid } from "uid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase-app/firebase-config";
import Button from "../../components/button/Button";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
const PlanAddNew = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // function formatDateVN(dateString) {
  //   var subDateStr = dateString.split("/");
  //   return new Date(+subDateStr[2], subDateStr[1] - 1, +subDateStr[0]);
  // }
  // console.log(formatDateVN(startDate));
  console.log(dayjs(startDate).format("YYYY"));

  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState();
  const [userList, setUserList] = useState<any>([]);

  const [topicList, setTopicList] = useState<any>([]);
  const [planList, setPlanList] = useState<any>([]);
  const PlanId = uid();
  const [data, setData] = useState<any>([]);
  const schema = yup.object({
    name: yup.string().required("Vui lòng nhập họ và tên"),
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      status: false,
      createdAt: new Date(),
    },
  });
  const {
    file,
    fileName,
    pres,
    renderUserStatus,
    renderUserRole,
    handleFile,
    handleRemoveFile,
    fileRef,
    data1,
    data2,
  } = useExcel();
  useEffect(() => {
    setData(pres);
  }, [pres]);
  console.log("data", data);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Users");
      const q = query(
        colRef,
        where("role", "==", "2"),
        where("status", "==", "1")
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
      setUserList(result);
    }
    getData();
  }, []);
  console.log(userList);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Users");
      const q = query(colRef, where("role", "==", "1"));
      const querySnapshot = await getDocs(q);

      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setStudents(result);
    }
    getData();
  }, []);
  console.log("st", students);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Topics");
      const q = query(colRef, where("planId", "!=", PlanId));
      const querySnapshot = await getDocs(q);

      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTopicList(result);
    }
    getData();
  }, []);
  console.log("t", topicList);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Plans");
      const q = query(colRef, where("status", "==", true));
      const querySnapshot = await getDocs(q);

      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPlanList(result);
    }
    getData();
  }, []);

  const watchStatus = watch("status");
  const tData: any = [...data1, ...data2];

  interface values {
    id?: string;
    name?: string;
    status?: boolean;
    users?: {};
  }

  // useEffect(() => {

  // }, [pres]);
  const renderStudentCategory = (status: any) => {
    switch (status) {
      case 1:
        return (
          <LabelStatus className="" type="success">
            Khóa luận tốt nghiệp
          </LabelStatus>
        );
      case 2:
        return (
          <LabelStatus className="" type="warning">
            Thực tập chuyên ngành
          </LabelStatus>
        );
      default:
        break;
    }
  };
  const handleAddNewPlan = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      students.forEach(async (item) => {
        await deleteDoc(doc(db, "Users", item.id));
      });
      data.forEach(async (item) => {
        await addDoc(collection(db, "Users"), {
          fullname: item.Name,
          email: item.Email,
          password: item.Password,
          class: item.Classes,
          gender: String(item.Gender),
          date: item.Date,
          PlanId: PlanId,
          status: String(item.Status),
          role: "1",
          createdAt: serverTimestamp(),
          avatar: "",
          category: String(item.Category),
          msv: item.Msv,
        });
        await createUserWithEmailAndPassword(
          auth,
          item?.Email ?? "",
          item?.Password ?? ""
        );
      });

      await addDoc(collection(db, "Plans"), {
        IdPlan: PlanId,
        name:
          values.name +
          " " +
          dayjs(startDate).format("YYYY") +
          " " +
          dayjs(endDate).format("YYYY"),
        status: values.status,
        users: data,
        createdAt: serverTimestamp(),
      });
      userList.forEach(async (item: any) => {
        const docRef = doc(db, "Users", item.id);
        await updateDoc(docRef, {
          PlanId: PlanId,
        });
      });
      topicList.forEach(async (item) => {
        const docRef = doc(db, "Topics", item.id);
        await updateDoc(docRef, {
          status: "1",
        });
      });
      planList.forEach(async (item) => {
        const docRef = doc(db, "Plans", item.id);
        await updateDoc(docRef, {
          status: false,
        });
      });

      toast.success(`Tạo mới kế hoạch: ${values.name} thành công!`);
      // reset({
      //   name: "",
      //   status: true,
      //   createdAt: new Date(),
      // });
    } catch (error: any) {
      console.log(error);

      toast.error("Không thể tạo mới kế hoạch");
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(handleAddNewPlan)}>
        <div className="form-layout container">
          <Field>
            <Label>Tên kế hoạch</Label>
            <Input
              name="name"
              placeholder="Nhập tên kế hoạch"
              control={control}
            ></Input>
            <p className="text-[#de3131] text-sm">{errors.name?.message}</p>
          </Field>
          <Field>
            <Label>Năm học</Label>
            <div className="flex gap-x-5">
              {" "}
              <DatePicker
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={startDate}
                value={startDate}
                showYearPicker
                dateFormat="yyyy"
                minDate={startDate}
              />
              _
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                value={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={endDate.setFullYear(startDate.getFullYear() + 1)}
                showYearPicker
                dateFormat="yyyy"
              />
            </div>
          </Field>
        </div>
        <div className="form-layout container">
          <Field>
            <Label>Nhập file</Label>
            <div className="w-[350px] h-[200px] mx-auto rounded-full mb-10 mt-5 ">
              <ExcelUpload
                name=""
                file={fileName}
                className={fileName ? "border-green-500" : "border-red-500"}
                onChange={(e) => handleFile(e)}
                handleRemoveFile={handleRemoveFile}
                ref={fileRef}
              ></ExcelUpload>
            </div>
          </Field>
          <Field>
            <Label>Trạng thái </Label>
            <Toggle
              on={watchStatus === true}
              onClick={() => setValue("status", !watchStatus)}
            ></Toggle>
          </Field>
        </div>
        <div className=" container">
          <Label>Sinh viên</Label>
          <Table>
            <thead>
              <tr>
                <th>Mã Sv</th>
                <th>Họ tên</th>
                <th>Lớp</th>
                <th>Thể loại đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {data1 &&
                data1.map((pres) => (
                  <tr>
                    <td>{pres?.Msv}</td>
                    <td>{pres.Name}</td>
                    <td>{pres?.Classes}</td>
                    <td>{renderStudentCategory(pres?.Category)}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new plan
        </Button>
      </form>
    </div>
  );
};

export default PlanAddNew;
