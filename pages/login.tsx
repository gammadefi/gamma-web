import { FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { object, string } from "yup";
import { toast } from "react-hot-toast";
import { AuthService } from "../services/auth.service";
import { AuthActions } from "../zustand/auth.store";
import Verify from "../section/Verify";

const login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [verify, setVerify] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    verificationCode:""
  });

  const validationSchema = object({
    email: string()
      .email()
      .matches(/^(?!.*@[^,]*,)/)
      .label("email"),
    password: string().required().min(8),
  });

  const submitEmail = async (value: any) => {
    if (verify) {
        setIsLoading(true)
        const body = {
            email: value.email,
            verificationCode: value.verificationCode
        }
        try {

          const response =  await AuthService.verify(body)
          AuthActions.setToken(response.data.data.accessToken)
          AuthActions.setProfile(response.data.data.user)
          setIsLoading(false)
          requestAnimationFrame(() => {
            router.push("/")
          })
        } catch (error) {
            
        }
      
    } else {
        setIsLoading(true);
      try {
        const body = {
            email: value.email,
            password: value.password
        }
       const response = await AuthService.login(body);
       AuthActions.setToken(response.data.data.accessToken)
          AuthActions.setProfile(response.data.data.user)
          setIsLoading(false)
          requestAnimationFrame(() => {
            router.push("/")
          })
      } catch (error :any) {
        setIsLoading(false);
        // console.log(error);
        
        if (error.response.data.message === "Unauthenticated device") {
            setVerify(true)
        }

      }
    }
  };

  const form = useFormik({
    initialValues: data,
    onSubmit: (values, actiom) => {
      submitEmail(values);
      console.log(values);
    },
  });

  return (
    <div
      style={{
        backgroundImage: "url(/Element2.svg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen bg-gray-900 text-white px-8 py-8 flex items-center justify-center"
    >
      <div className="max-w-2xl">
        <div className="flex items-center justify-center gap-3">
          <img src="/logod.svg" className="h-8 w-auto mx-auto" alt="G" />
        </div>
        <h3 className="text-center font-semibold text-sm md:text-base text-gray-200 mt-1">
          Spend crypto easily{" "}
        </h3>

        <div className="mt-6 w-full">
          <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit}>
              {verify === false && <div className="mx-auto md:w-[400px] w-[320px]">
                <div>
                  <label className="text-white font-semibold text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...form.getFieldProps("email")}
                    placeholder="Enter Email Address"
                    className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                  />
                </div>
                <div className="mt-3">
                  <label className="text-white font-semibold text-sm">
                    Password
                  </label>
                  <input
                    type="password"
                    {...form.getFieldProps("password")}
                    placeholder="Enter Password"
                    className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                  />
                </div>
              </div>}

              {
                verify && <Verify {...form.getFieldProps("verificationCode")} />
              }

              <button
                disabled={isLoading}
                className="w-full relative h-12 disabled:bg-slate-600 rounded mt-6 bg-[#2563EB] font-bold text-white"
              >
                {isLoading ? (
                  <svg className="spinner mx-auto" viewBox="0 0 50 50">
                    <circle
                      className="path"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      strokeWidth="5"
                    ></circle>
                  </svg>
                ) : (
                  "Next"
                )}
              </button>
            </form>
          </FormikProvider>
          <h4 className="text-center font-semibold mt-3 text-sm">
            By signing in you agree to the{" "}
          </h4>
          <h4 className="text-center font-semibold text-sm">
            <a className="text-blue-300">Terms of Service</a> &{" "}
            <a className="text-blue-300">Privacy Policy</a>{" "}
          </h4>

          <div className="mt-8 flex items-center justify-center gap-2">
            <h4 className="text-center font-semibold text-sm">
              Don't have an account
            </h4>
            <Link href="/sign-up" className="text-sm text-blue-300 font-bold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
