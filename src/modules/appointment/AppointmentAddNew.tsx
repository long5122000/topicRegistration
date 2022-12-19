import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import * as yup from "yup";
import Button from "../../components/button/Button";
import ReactQuill from "react-quill";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import Toggle from "../../components/toggle/Toggle";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth-context";
const AppointmentAddNew = () => {
  const { userInfo } = useAuth();
  const schema = yup.object({
    name: yup.string().required("Vui lòng nhập tên cuộc hẹn"),
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
      desc: "",
      status: false,
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [content, setContent] = React.useState("");
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
  const watchStatus = watch("status");
  interface values {
    name?: string;
    desc?: string;
    startDate: Date;
    endDate: Date;
    status: boolean;
  }
  const handleCreateAppointment = async (values: values): Promise<void> => {
    console.log(values);

    if (!isValid) return;
    const colRef = collection(db, "Appointments");
    try {
      await addDoc(colRef, {
        name: values.name,
        desc: content,
        startDate: startDate,
        endDate: endDate,
        status: values.status,
        emailLectured: userInfo.email,
        createdAt: new Date(),
      });
      toast.success(`Tạo cuộc hẹn mới thành công`);
      reset({
        name: "",
        desc: "",
        status: false,
        startDate: new Date(),
        endDate: new Date(),
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(handleCreateAppointment)}>
        <div className="form-layout container">
          <Field>
            <Label>Tên cuộc hẹn</Label>
            <Input
              name="name"
              placeholder="Nhập tên cuộc hẹn"
              control={control}
            ></Input>
            <p className="text-[#de3131] text-sm">{errors.name?.message}</p>
          </Field>
          <Field>
            <Label>Thời gian</Label>
            <div className="flex gap-x-5">
              {" "}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
              />
              _
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
              />
            </div>
          </Field>
        </div>
        <div className="form-layout container mt-5">
          <Field>
            <Label>Desc</Label>
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
          <Field>
            <Label>Trạng thái </Label>
            <Toggle
              on={watchStatus === true}
              onClick={() => setValue("status", !watchStatus)}
            ></Toggle>
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
  );
};

export default AppointmentAddNew;
