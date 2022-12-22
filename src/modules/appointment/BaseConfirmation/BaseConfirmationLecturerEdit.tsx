import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import ReactQuill from "react-quill";
import Button from "../../../components/button/Button";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Toggle from "../../../components/toggle/Toggle";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth-context";
import { db } from "../../../firebase-app/firebase-config";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import * as dayjs from "dayjs";
const BaseConfirmationLecturerEdit = () => {
  const { userInfo } = useAuth();

  const schema = yup.object({});
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
  const [params] = useSearchParams();
  console.log(params);
  const watchStatus = watch("status");
  const planId: any = params.get("id");
  const [startDate, setStartDate] = useState(new Date());
  const [s, setS] = useState(new Date());
  console.log(s);

  console.log(startDate);

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
  useEffect(() => {
    async function fetchData() {
      if (!planId) return;
      const colRef = doc(db, "BaseConfirmations", planId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
      setContent(docData.data().desc);
      setS(
        dayjs(docData.data().startDate.seconds * 1000).format(
          "ddd MMM D YYYY h:mm A"
        )
      );
      // setStartDate(docData.data().startDate);
      // setEndDate(docData.data().endDate);
    }
    fetchData();
  }, [planId, reset]);
  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(() => {})}>
        <div className="form-layout container pt-5">
          <Field>
            <Label>
              Tên cuộc hẹn :{" "}
              <h3 className="text-xl text-red-400">
                Nộp giấy xác nhận cơ sở thực tập
              </h3>
            </Label>
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

export default BaseConfirmationLecturerEdit;
