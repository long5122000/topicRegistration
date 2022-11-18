import React, { MutableRefObject, useRef, useState } from "react";
import LabelStatus from "../components/label/LabelStatus";
import { read, utils, writeFile } from "xlsx";
import { toast } from "react-toastify";
interface President {
  Name: string;
  Email: string;
}
type NewPresident = Partial<President>;
type useExcel = {
  file: null;
  renderUserStatus: (status: any) => JSX.Element | undefined;
  pres: Partial<President>[];
  data1: Partial<President>[];
  data2: Partial<President>[];
  fileName: string;
  renderUserRole: (status: any) => JSX.Element | undefined;
  handleFile: (e: any) => Promise<void>;
  handleRemoveFile: () => void;
  fileRef: React.MutableRefObject<HTMLInputElement>;
};
export default function useExcel(): useExcel {
  const [file, setFile] = useState(null);
  const [pres, setPres] = useState<NewPresident[]>([]);
  const [data1, setData1] = useState<NewPresident[]>([]);
  const [data2, setData2] = useState<NewPresident[]>([]);
  const [fileName, setFileName] = useState("");
  const acceptableFileName = ["xlsx", "xls"];
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>;

  const renderUserStatus = (status: any) => {
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
  const renderUserRole = (status: any) => {
    switch (status) {
      case 1:
        return (
          <LabelStatus className="" type="success">
            Quản trị
          </LabelStatus>
        );
      case 2:
        return (
          <LabelStatus className="" type="warning">
            Giảng viên
          </LabelStatus>
        );
      case 3:
        return (
          <LabelStatus className="" type="danger">
            Sinh viên
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
    console.log(wb);

    const data1 = utils.sheet_to_json<NewPresident>(
      wb.Sheets[wb.SheetNames[0]]
    );
    const data2 = utils.sheet_to_json<NewPresident>(
      wb.Sheets[wb.SheetNames[1]]
    );

    setData1(data1);
    setData2(data2);
    setPres([...data1, ...data2]);
    setFile(myFile);
    setFileName(myFile.name);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setPres([]);
    fileRef.current.value = "";
  };

  return {
    data1,
    data2,
    file,
    pres,
    fileName,
    renderUserStatus,
    renderUserRole,
    handleFile,
    handleRemoveFile,
    fileRef,
  };
}
