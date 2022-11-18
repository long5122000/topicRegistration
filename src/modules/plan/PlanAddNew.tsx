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
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import Button from "../../components/button/Button";
const PlanAddNew = () => {
  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState();
  const [userList, setUserList] = useState<any>([]);
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
      data.forEach(async (item: any) => {
        const colRef = collection(db, "Users");
        const q = query(colRef, where("email", "==", item.Email));
        const querySnapshot = await getDocs(q);

        let result: any = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList((userList: any) => [...userList, ...result]);
      });
    }
    getData();
  }, [data]);
  console.log(userList);

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

  const handleAddNewPlan = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      userList.forEach(async (item: any) => {
        const docRef = doc(db, "Users", item.id);
        await updateDoc(docRef, {
          PlanId: PlanId,
        });
      });
      await addDoc(collection(db, "Plans"), {
        IdPlan: PlanId,
        name: values.name,
        status: values.status,
        users: userList,
        createdAt: serverTimestamp(),
      });

      toast.success(`Create new plan with name: ${values.name} successfully!`);
      // reset({
      //   name: "",
      //   status: true,
      //   createdAt: new Date(),
      // });
    } catch (error: any) {
      console.log(error);

      toast.error("Can not create new plan");
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
            <Label>Trạng thái </Label>
            <Toggle
              on={watchStatus === true}
              onClick={() => setValue("status", !watchStatus)}
            ></Toggle>
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
        </div>
        <div className="form-layout container">
          <Field>
            <Label>Giảng viên</Label>
            <Table>
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Bộ môn</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data1 &&
                  data1.map((pres) => (
                    <tr>
                      <td>{pres.Name}</td>
                      <td>{pres?.Section}</td>
                      <td>{pres?.Email}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Field>
        </div>
        <div className="form-layout container">
          <Field>
            <Label>Sinh viên</Label>
            <Table>
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Mã Sv</th>
                  <th>Lớp</th>
                </tr>
              </thead>
              <tbody>
                {data2 &&
                  data2.map((pres) => (
                    <tr>
                      <td>{pres.Name}</td>
                      <td>{pres?.Email}</td>
                      <td>{pres?.Classes}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Field>
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
