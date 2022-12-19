import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
const SignInPage = () => {
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Thông tin đăng nhập phải là dạng Email")
        .required("Vui lòng nhập email"),
      password: yup.string().required("Vui lòng nhập mật khẩu"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
  }, [userInfo]);
  interface values {
    email?: string | undefined;
    password?: string;
  }
  const handleSignIn = async (values: values) => {
    try {
      if (!isValid) return;
      await signInWithEmailAndPassword(
        auth,
        values?.email ?? "",
        values?.password ?? ""
      );

      navigate("/");
    } catch (error) {
      toast.error("Thông tin đăng nhập không chính xác ");
    }
  };
  // useEffect(() => {
  //   const arrErrors = Object.values(errors);
  //   console.log(Object);
  //   if (arrErrors.length > 0) {
  //     toast.error(arrErrors[0]?.message, {
  //       pauseOnHover: false,
  //       delay: 0,
  //     });
  //   }
  // }, [errors]);
  return (
    <>
      <div className="container ">
        <h2 className="font-medium text-center text-4xl my-5">Đăng nhập</h2>
        <div className="flex  p-10 gap-10">
          <div className="bg-white mx-auto min-w-[500px]">
            <div className="p-14 border borer-grayse ">
              <form
                className="form"
                autoComplete="off"
                onSubmit={handleSubmit(handleSignIn)}
              >
                <Field>
                  <Label htmlFor="email">Email </Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Vui lòng nhập email"
                    control={control}
                  ></Input>
                  <p className="text-[#de3131] text-sm">
                    {errors.email?.message}
                  </p>
                </Field>
                <Field>
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Vui lòng nhập mật khẩu"
                    control={control}
                  ></Input>
                  <p className="text-[#de3131] text-sm">
                    {errors.password?.message}
                  </p>
                </Field>

                <Button
                  kind="primary"
                  type="submit"
                  className="mx-auto w-[250px]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default SignInPage;
