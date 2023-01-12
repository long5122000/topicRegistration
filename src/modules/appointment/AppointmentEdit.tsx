import { yupResolver } from "@hookform/resolvers/yup";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase-app/firebase-config";
import * as yup from "yup";
import Heading from "../../layout/Heading";
const AppointmentEdit = () => {
  const schema = yup.object({
    name: yup.string().required("Vui lòng nhập tên"),
  });
  const [content, setContent] = React.useState("");
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
    defaultValues: {
      name: "",
      status: false,
      desc: "",
      createdAt: new Date(),
    },
  });
  const [params] = useSearchParams();
  console.log(params);
  const watchStatus = watch("status");
  const planId: any = params.get("id");
  interface values {
    name?: string;
    status?: boolean;
    desc?: string;
  }
  const handleUpdatePlan = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "Appointments", planId);
      await updateDoc(colRef, {
        ...values,
        name: values.name,
        desc: content,
        status: values.status,
        createdAt: serverTimestamp(),
      });
      toast.success("Cập nhập cuộc hẹn thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhập cuộc hẹn thất bại!");
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      if (!planId) return;
      const colRef = doc(db, "Appointments", planId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
      setContent(docData.data().desc);
    }
    fetchData();
  }, [planId, reset]);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    }),
    []
  );
  return (
    <div>
      <div className="bg-white">
        <form onSubmit={handleSubmit(handleUpdatePlan)}>
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
          <div className="form-layout container mt-5">
            <Field>
              <Label>Mô tả</Label>
              {/* <Textarea
              control={control}
              placeholder="Enter your desc"
              name="desc"
            ></Textarea> */}
              <ReactQuill
                placeholder="Write your story......"
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </Field>
          </div>
          <Button
            kind="primary"
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Thêm cuộc hẹn
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentEdit;
