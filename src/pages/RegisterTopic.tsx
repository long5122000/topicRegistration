import React, { useEffect, useMemo, useState } from "react";
import { Control, FieldValues, useForm, useWatch } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import Radio from "../components/radio/radio";
import Textarea from "../components/textarea/Textarea";
import Heading from "../layout/Heading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../firebase-app/firebase-config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";
import { Dropdown } from "../components/dropdown";
import Select from "../components/dropdown/Select";
import List from "../components/dropdown/List";
import Option from "../components/dropdown/Option";
const RegisterTopic = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);

  const [selectPlan, setSelectPlan] = useState("");
  const [planList, setPlanList] = useState<any>([]);
  console.log(planList);

  const [content, setContent] = React.useState("");
  const schema = yup
    .object({
      name: yup.string().required("Vui lòng nhập tên đề tài"),
      quantity: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable()
        .required("Vui lòng nhập số lượng sinh viên")
        .when("category", (category, schema) => {
          return category === "1"
            ? schema
                .min(1, "Số lượng sinh viên không được nhỏ hơn 1")
                .max(1, "Số lượng sinh viên không được lớn hơn 1")
            : schema
                .min(1, "Số lượng sinh viên không được nhỏ hơn 1")
                .max(3, "Số lượng sinh viên không được lớn hơn 3");
        }),
      category: yup.string().required(),
    })
    .required();
  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: 1,
      name: "",
      desc: "",
      category: "1",
      plan: {},
      status: "1",
      auth: {},
      authName: "",
      createdAt: new Date(),
    },
  });

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Plans");
      const q = query(colRef, where("IdPlan", "==", userInfo.PlanId));
      const querySnapshot = await getDocs(q);

      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPlanList(result);
    }
    getData();
  }, [userInfo]);
  console.log(planList);

  const handleClickOptionPlan = async (item) => {
    const colRef = doc(db, "Plans", item.id);
    const docData = await getDoc(colRef);
    setValue("plan", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectPlan(item);
  };
  console.log(selectPlan);

  const handleAddNew = async (values: {}) => {
    if (!isValid) return;

    const colRef = collection(db, "Topics");
    try {
      await addDoc(colRef, {
        name: values.name,
        status: values.status,
        plan: selectPlan.name,
        planId: selectPlan.id,
        category: values.category,
        quantity: values.quantity,
        desc: content,
        auth: userInfo.uid,
        authName: userInfo.fullname,
        authEmail: userInfo.email,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new topic successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      reset({
        quantity: 1,
        name: "",
        plan: "",
        desc: "",
        category: "1",
        status: "1",
        authName: "",
        auth: {},
        createdAt: new Date(),
      });
    }
  };
  const watchStatus = watch("category");
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
    <div className="pb-10 bg-white">
      <Heading>Đăng ký đề tài</Heading>
      <div className="container py-3">
        <span className="text-[#de3131] text-sm flex justify-end">
          *Chú ý: Số lượng tối đa đề tài đối với TTCN là 3, KLTN là 1
        </span>
      </div>
      <form onSubmit={handleSubmit(handleAddNew)}>
        <div className="form-layout container mt-5">
          <Field>
            {" "}
            <Label>Tên đề tài</Label>
            <Input name="name" control={control}></Input>{" "}
            <p className="text-[#de3131] text-sm">{errors.name?.message}</p>
          </Field>
          <Field>
            <Label>Kế hoạch</Label>
            <Dropdown>
              <Select placeholder="Chọn năm kế hoạch"></Select>
              <List>
                {planList.length > 0 &&
                  planList.map((item) => (
                    <Option
                      key={item.id}
                      onClick={() => handleClickOptionPlan(item)}
                    >
                      {item.name}
                    </Option>
                  ))}
              </List>
            </Dropdown>
            {selectPlan?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectPlan?.name}
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
            {" "}
            <Label>Số lượng sinh viên</Label>
            <Input
              type="number"
              name="quantity"
              min={1}
              control={control}
            ></Input>{" "}
            <p className="text-[#de3131] text-sm">{errors.quantity?.message}</p>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Thêm đề tài
        </Button>
      </form>
    </div>
  );
};

export default RegisterTopic;
