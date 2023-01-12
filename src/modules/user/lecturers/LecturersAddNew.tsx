import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../../firebase-app/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../../../components/button/Button";
import ImageUpload from "../../../components/image/ImageUpload";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Input from "../../../components/input/Input";
import Radio from "../../../components/radio/radio";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
const LecturersAddNew = () => {
  const [startDate, setStartDate] = useState(new Date());
  const schema = yup.object({
    fullname: yup.string().required("Vui lòng nhập họ và tên"),
    email: yup
      .string()
      .email("Thông tin đăng nhập phải là dạng Email")
      .required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    mgv: yup.string().required("Vui lòng nhập mã giảng viên"),
    section: yup.string().required("Vui lòng nhập bộ môn"),
    phone: yup.number().required("Vui lòng nhập số điện thoại"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isValid, isSubmitting, errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      avatar: "",
      section: "",
      mgv: "",
      phone: "",
      status: "1",
      gender: "1",
      role: "2",
      createdAt: new Date(),
    },
  });
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  interface values {
    mgv: string;
    email?: string;
    password?: string;
    fullname?: string;
    section?: string;
    phone: string;
    gender: string;
    status?: string;
    role?: string;
    avatar?: string;
  }

  const handleCreateUser = async (values: values): Promise<void> => {
    console.log(values);

    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(
        auth,
        values?.email ?? "",
        values?.password ?? ""
      );
      await addDoc(collection(db, "Users"), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        section: values.section,
        gender: values.gender,
        mgv: values.mgv,
        phone: "0" + String(values.phone),
        avatar: image,
        status: values.status,
        role: "2",
        createdAt: serverTimestamp(),
      });
      toast.success(`Tạo mới người dùng: ${values.email} thành công!`);
      reset({
        fullname: "",
        mgv: "",
        email: "",
        password: "",
        avatar: "",
        status: "1",
        role: "2",
        section: "",
        gender: "1",
        phone: "",
        createdAt: new Date(),
      });
      handleResetUpload();
    } catch (error: any) {
      if (error.code == "auth/email-already-in-use") {
        toast.error("Địa chỉ email này đã được sử dụng");
      } else {
        toast.error("Không thể tạo mới người dùng");
      }
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };
  const watchStatus = watch("status");
  const watchGender = watch("gender");
  return (
    <div className="pb-10 bg-white rounded-2xl">
      <div className="container flex justify-end">
        <Button
          kind="quaternary"
          href="/manage/AddNewUserExcel"
          className=" min-h-[56px]  my-3"
        >
          Nhập bằng Excel
        </Button>
      </div>

      <form onSubmit={handleSubmit(handleCreateUser)}>
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
            <Label>Mã giảng viên</Label>
            <Input
              name="mgv"
              placeholder="Nhập mã giảng viên"
              control={control}
            ></Input>
            <p className="text-[#de3131] text-sm">{errors.mgv?.message}</p>
          </Field>
          <Field>
            <Label>Họ và tên</Label>
            <Input
              name="fullname"
              placeholder="Nhập họ và tên"
              control={control}
            ></Input>
            <p className="text-[#de3131] text-sm">{errors.fullname?.message}</p>
          </Field>
        </div>
        <div className="form-layout container">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Nhập email"
              control={control}
              type="email"
            ></Input>
            <p className="text-[#de3131] text-sm">{errors.email?.message}</p>
          </Field>
          <Field>
            <Label>Mật khẩu</Label>
            <Input
              name="password"
              placeholder="Nhập mật khẩu"
              control={control}
              type="password"
            ></Input>
            <p className="text-[#de3131] text-sm">{errors.password?.message}</p>
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
                Không hoạt động
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Bộ môn</Label>
            <Input
              name="section"
              placeholder="Nhập số bộ môn"
              control={control}
            ></Input>
            <p className="text-[#de3131] text-sm">{errors.section?.message}</p>
          </Field>
        </div>
        <div className="form-layout container">
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
          <Field>
            <Label>Điện thoại</Label>
            <Input
              name="phone"
              placeholder="Nhập số điện thoại"
              control={control}
            ></Input>
            <p className="text-[#de3131] text-sm">{errors.phone?.message}</p>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default LecturersAddNew;
