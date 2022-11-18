import React, {
  DetailedHTMLProps,
  MutableRefObject,
  TdHTMLAttributes,
  useRef,
  useState,
} from "react";
import LabelStatus from "../../../components/label/LabelStatus";
import { toast } from "react-toastify";
import { read, utils } from "xlsx";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase-app/firebase-config";
import Button from "../../../components/button/Button";
import ExcelUpload from "../../../components/excel/ExcelUpload";
import Table from "../../../components/table/Table";
import { createUserWithEmailAndPassword } from "firebase/auth";
const LecturersAddNewExcel = () => {
  interface President {
    Name: string;
    Email: string;
    Password: string;
    Section: string;
    Gender: number;
    Date: string;
    Status: string;
  }
  const [file, setFile] = useState(null);
  const [pres, setPres] = useState<President[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const acceptableFileName = ["xlsx", "xls"];
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>;

  const renderStudentStatus = (status: any) => {
    switch (status) {
      case 1:
        return (
          <LabelStatus className="" type="success">
            Hoạt động
          </LabelStatus>
        );
      case 2:
        return (
          <LabelStatus className="" type="warning">
            Chưa giải quyết
          </LabelStatus>
        );
      case 3:
        return (
          <LabelStatus className="" type="danger">
            Bị cấm
          </LabelStatus>
        );

      default:
        break;
    }
  };
  const renderStudentGender = (status: any) => {
    switch (status) {
      case 1:
        return (
          <LabelStatus className="" type="success">
            Nam
          </LabelStatus>
        );
      case 2:
        return (
          <LabelStatus className="" type="warning">
            Nữ
          </LabelStatus>
        );
      default:
        break;
    }
  };
  const checkFileName = (name: any) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };
  const handleFile = async (e: any) => {
    const myFile = e.target.files[0];
    console.log(myFile);

    if (!myFile) return;
    if (!checkFileName(myFile.name)) {
      toast.error("Invalid File Type");
      return;
    }
    const f = await myFile.arrayBuffer();
    const wb = read(f);
    const data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);
    setPres(data);
    setFile(myFile);
    setFileName(myFile.name);
  };
  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setPres([]);
    fileRef.current.value = "";
  };
  interface values {
    email?: string;
    password?: string;
    fullname?: string;
    status?: string;
    role?: string;
  }
  const handleCreateUser = () => {
    if (!pres) return;
    pres.forEach(async (pres) => {
      try {
        await addDoc(collection(db, "Users"), {
          fullname: pres.Name,
          email: pres.Email,
          password: pres.Password,
          section: pres.Section,
          gender: String(pres.Gender),
          date: pres.Date,
          status: String(pres.Status),
          role: "2",
          createdAt: serverTimestamp(),
          avatar: "",
        });
        await createUserWithEmailAndPassword(
          auth,
          pres?.Email ?? "",
          pres?.Password ?? ""
        );
        toast.success(
          `Create new user with email: ${pres.Email} successfully!`
        );
        console.log(pres.Name);
      } catch (error: any) {
        if (error.code == "auth/email-already-in-use") {
          toast.error(`Địa chỉ email:  ${pres.Email} đã được sử dụng`);
        } else {
          toast.error("Can not create new user");
        }
      }
    });
  };
  console.log(pres);

  return (
    <div className="bg-white">
      <div className="container flex justify-end">
        <Button
          kind="quaternary"
          href="/manage/LecturersAddNew"
          className=" min-h-[56px]  my-3"
        >
          Nhập Thủ Công
        </Button>
      </div>
      <div className="w-[350px] h-[200px] mx-auto rounded-full mb-10 mt-5">
        <ExcelUpload
          name=""
          file={fileName}
          className={fileName ? "border-green-500" : "border-red-500"}
          onChange={(e) => handleFile(e)}
          handleRemoveFile={handleRemoveFile}
          ref={fileRef}
        ></ExcelUpload>
      </div>
      <div className="container">
        <Button className="" kind="primary" onClick={handleCreateUser}>
          {" "}
          AddNewUsers
        </Button>
        <Table>
          <thead>
            <tr>
              <th>Tên </th>
              <th>Email </th>
              <th>Mật khẩu</th>
              <th>Bộ môn</th>
              <th>Giới tính</th>
              <th>Sinh nhật</th>
              <th>Trạng thái </th>
            </tr>
          </thead>
          <tbody>
            {pres &&
              pres.map((pres) => (
                <tr>
                  <td>{pres.Name}</td>
                  <td>{pres.Email}</td>
                  <td>{pres.Password}</td>
                  <td>{pres.Section}</td>
                  <td>{renderStudentGender(pres?.Gender)}</td>
                  <td>{pres?.Date}</td>
                  <td>{renderStudentStatus(pres?.Status)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default LecturersAddNewExcel;
