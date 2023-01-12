import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { db } from "../../../firebase-app/firebase-config";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import { toast } from "react-toastify";
import Button from "../../../components/button/Button";
import ImageUpload from "../../../components/image/ImageUpload";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Input from "../../../components/input/Input";
import Radio from "../../../components/radio/radio";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-date-picker";

import dayjs from "dayjs";
// import { Document, Page } from "react-pdf/dist/esm/entry.vite";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import { pdfjs } from "react-pdf";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// const options = {
//   cMapUrl: "cmaps/",
//   cMapPacked: true,
//   standardFontDataUrl: "standard_fonts/",
// };
const StudentUpdate = () => {
  const [startDate, setStartDate] = useState(new Date());
  function formatDateVN(dateString) {
    var subDateStr = dateString.split("/");
    return new Date(+subDateStr[2], subDateStr[1] - 1, +subDateStr[0]);
  }

  const schema = yup.object({
    fullname: yup.string().required("Vui lòng nhập họ và tên"),
    email: yup
      .string()
      .email("Thông tin đăng nhập phải là dạng Email")
      .required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    class: yup.string().required("Vui lòng nhập họ và tên"),
    // date: yup.date().typeError("Date is required"),
  });
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [params] = useSearchParams();
  const [data, setData] = useState({});
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const userId: any = params.get("id");

  const watchStatus = watch("status");
  const watchGender = watch("gender");
  const imageUrl = getValues("avatar");

  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName: any = imageRegex?.length > 0 ? imageRegex[1] : "";
  // const [file, setFile] = useState("");
  // if (imageName.length > 0) {
  //   getDownloadURL(
  //     ref(getStorage(), "CV-NguyenChiDang-Fresher ReactJs.pdf")
  //   ).then((url) => {
  //     setFile(url);
  //   });
  // }

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  // function changePage(offset) {
  //   setPageNumber((prevPageNumber) => prevPageNumber + offset);
  // }

  // function previousPage() {
  //   changePage(-1);
  // }

  // function nextPage() {
  //   changePage(1);
  // }
  interface values {
    email?: string;
    password?: string;
    fullname?: string;
    class?: string;
    date?: string;
    gender?: string;
    status?: string;
    role?: string;
    avatar?: string;
  }
  const handleUpdateUser = async (values: values): Promise<void> => {
    console.log("je");

    if (!isValid) {
      console.log("cc");
      return;
    }
    try {
      const colRef = doc(db, "Users", userId);
      await updateDoc(colRef, {
        ...values,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        class: values.class,
        gender: values.gender,

        date: new Date(startDate).toLocaleDateString(),
        avatar: image,
        status: values.status,
        role: "1",
        createdAt: serverTimestamp(),
      });
      toast.success("Chỉnh sửa người dùng thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Chỉnh sửa người dùng thất bại!");
      console.log(error);
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "Users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const colRef = doc(db, "Users", userId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
      setStartDate(formatDateVN(docData.data().date));
    }
    fetchData();
  }, [userId, reset]);

  return (
    <div className="pb-10 bg-white rounded-2xl">
      <div className="container flex justify-end">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10 mt-5">
            <ImageUpload
              name=""
              className="!rounded-full h-full"
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Họ và tên</Label>
              <Input
                name="fullname"
                placeholder="Enter your fullname"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                control={control}
                type="email"
              ></Input>
              {/* <p className="text-[#de3131] text-sm">{errors.email?.message}</p> */}
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Mật khẩu</Label>
              <Input
                name="password"
                placeholder="Enter your password"
                control={control}
                type="password"
              ></Input>
              {/* <p className="text-[#de3131] text-sm">
                {errors.password?.message}
              </p> */}
            </Field>
            <Field>
              <Label>Giới tính</Label>
              <div className="flex flex-wrap gap-x-5">
                <Radio
                  name="gender"
                  control={control}
                  checked={watchGender === "1"}
                  value={"1"}
                >
                  Nam
                </Radio>
                <Radio
                  name="gender"
                  control={control}
                  checked={watchGender === "2"}
                  value={"2"}
                >
                  Nữ
                </Radio>
              </div>
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Trạng thái</Label>
              <div className="flex flex-wrap gap-x-5">
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "1"}
                  value={"1"}
                >
                  Hoạt động
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "2"}
                  value={"2"}
                >
                  Chưa giải quyết
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "3"}
                  value={"3"}
                >
                  Bị cấm
                </Radio>
              </div>
            </Field>
            <Field>
              <Label>Lớp</Label>
              <Input
                name="class"
                placeholder="Enter your class"
                control={control}
              ></Input>
              {/* <p className="text-[#de3131] text-sm">{errors.class?.message}</p> */}
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Ngày sinh</Label>
              {/* <Input
                name="date"
                ref={inputRef}
                control={control}
                type="date"
              ></Input> */}
              <DatePicker
                onChange={setStartDate}
                value={startDate}
                format="dd-MM-yyyy"
              />
              {/* <p className="text-[#de3131] text-sm">{errors.class?.message}</p> */}
            </Field>
          </div>
          <Button
            kind="primary"
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sửa sinh viên
          </Button>
        </form>
        {/* <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default StudentUpdate;
