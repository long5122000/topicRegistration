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
const LecturersUpdate = () => {
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
  console.log(params);
  const [data, setData] = useState({});
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const userId: any = params.get("id");
  console.log(userId);
  const watchStatus = watch("status");
  const watchGender = watch("gender");
  const imageUrl = getValues("avatar");
  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName: any = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
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
  const handleUpdateUser = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "Users", userId);
      await updateDoc(colRef, {
        ...values,
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
    }
    fetchData();
  }, [userId, reset]);

  return (
    <div className="pb-10 bg-white rounded-2xl">
      <div className="container ">
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
              <p className="text-[#de3131] text-sm">
                {errors.fullname?.message}
              </p>
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
              <p className="text-[#de3131] text-sm">
                {errors.password?.message}
              </p>
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
              <p className="text-[#de3131] text-sm">
                {errors.section?.message}
              </p>
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
            Sửa giảng viên
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LecturersUpdate;
