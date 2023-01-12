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
const AdminUpdate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const schema = yup.object({
    fullname: yup.string().required("Vui lòng nhập họ và tên"),
    email: yup
      .string()
      .email("Thông tin đăng nhập phải là dạng Email")
      .required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
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

  const userId: any = params.get("id");
  console.log(userId);
  const watchStatus = watch("status");
  const imageUrl = getValues("avatar");
  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName: any = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName);
  interface values {
    email?: string;
    password?: string;
    fullname?: string;

    status?: string;
    role?: string;
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
        status: values.status,
        role: "3",
        createdAt: serverTimestamp(),
      });
      toast.success("Chỉnh sửa người dùng thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Chỉnh sửa người dùng thất bại!");
      console.log(error);
    }
  };

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
      <div className="container  ">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
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
                  Bị cấm
                </Radio>
              </div>
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

export default AdminUpdate;
