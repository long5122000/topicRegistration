import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { collection, doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase-app/firebase-config";
import Field from "../../components/field/Field";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Radio from "../../components/radio/radio";
import ReactQuill from "react-quill";
import Button from "../../components/button/Button";
import parse from "html-react-parser";
import Heading from "../../layout/Heading";
const ProposedTopicView = () => {
  const [params] = useSearchParams();
  const topicId: any = params.get("id");
  const [data, setData] = useState<any>([]);
  console.log(data);

  const {
    control,
    reset,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const watchStatus = watch("status");
  useEffect(() => {
    async function fetchData() {
      if (!topicId) return;
      const colRef = doc(db, "Topics", topicId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
      setData(docData.data());
    }
    fetchData();
  }, [topicId, reset]);

  return (
    <div className="pb-10 bg-white">
      <Heading>Xem đề tài</Heading>
      <form>
        <div className="form-layout container mt-5">
          <Field>
            {" "}
            <Label>Tên đề tài</Label>
            <Input name="name" disabled control={control}></Input>{" "}
          </Field>
          <Field>
            <Label>Kế hoạch</Label>

            {data?.plan && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {data?.plan}
              </span>
            )}
          </Field>
        </div>
        <div className="form-layout container mt-5">
          <Field>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="category"
                checked={watchStatus === "1"}
                control={control}
                value={"1"}
              >
                KLTN
              </Radio>
              <Radio
                name="category"
                checked={watchStatus === "2"}
                control={control}
                value={"2"}
              >
                TTCN
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Ngày tạo</Label>
            <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
              {new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
                "vi-VI"
              )}
            </span>
          </Field>
        </div>
        <div className="form-layout container  mt-5">
          <Field className="overflow-auto border border-gray-300">
            <Label>Mô tả</Label>

            <p className=" p-3">{parse(data?.desc || "")}</p>
          </Field>

          <Field>
            {" "}
            <Label>Số lượng sinh viên</Label>
            <Input
              disabled
              type="number"
              name="quantity"
              min={1}
              control={control}
            ></Input>{" "}
          </Field>
        </div>
      </form>
    </div>
  );
};

export default ProposedTopicView;
