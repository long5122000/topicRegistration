import { yupResolver } from "@hookform/resolvers/yup";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/button/Button";
import ExcelUpload from "../../components/excel/ExcelUpload";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Table from "../../components/table/Table";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase-app/firebase-config";
import * as yup from "yup";
import { toast } from "react-toastify";
const PlanUpdate = () => {
  const schema = yup.object({
    name: yup.string().required("Vui lòng nhập họ và tên"),
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
    defaultValues: {
      name: "",
      status: false,
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
  }
  const handleUpdatePlan = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "Plans", planId);
      await updateDoc(colRef, {
        ...values,
        name: values.name,
        status: values.status,
        createdAt: serverTimestamp(),
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      if (!planId) return;
      const colRef = doc(db, "Plans", planId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [planId, reset]);
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
          {/* <div className="form-layout container">
            <Field>
              <Label>Nhập file</Label>
              <div className="w-[350px] h-[200px] mx-auto rounded-full mb-10 mt-5 ">
                <ExcelUpload
                  name=""
                  file={fileName}
                  className={fileName ? "border-green-500" : "border-red-500"}
                  onChange={(e) => handleFile(e)}
                  handleRemoveFile={handleRemoveFile}
                  ref={fileRef}
                ></ExcelUpload>
              </div>
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Giảng viên</Label>
              <Table>
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Bộ môn</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data1 &&
                    data1.map((pres) => (
                      <tr>
                        <td>{pres.Name}</td>
                        <td>{pres?.Section}</td>
                        <td>{pres?.Email}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Sinh viên</Label>
              <Table>
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Mã Sv</th>
                    <th>Lớp</th>
                  </tr>
                </thead>
                <tbody>
                  {data2 &&
                    data2.map((pres) => (
                      <tr>
                        <td>{pres.Name}</td>
                        <td>{pres?.Email}</td>
                        <td>{pres?.Classes}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Field>
          </div> */}
          <Button
            kind="primary"
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update plan
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PlanUpdate;
