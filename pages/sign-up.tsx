import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-hot-toast";
import { BsArrowBarLeft } from "react-icons/bs";
import { AuthActions, useAuth } from "../zustand/auth.store";
import { object, string, date } from "yup";
import { AuthService } from "../services/auth.service";
import Verify from "../section/Verify";
import { protectEmail } from "../utils";

const signUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState(0);
  const [verify, setVerify] = useState(false)
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    title: "Mr",
    gender: "M",
    password:"",  
    verificationCode:""
  });

  const validationSchema = object({
    email: string()
      .email()
      .matches(/^(?!.*@[^,]*,)/)
      .label("email"),
    firstName: string().required().label("firstName"),
    lastName: string().required().label("lastName"),
    dob: date().required().label("dob"),
    title: string().required().label("title"),
    gender: string().required().label("Gender"),
    password: string().required().min(8),
    verificationCode: string()
  });
  const router = useRouter();

  const submitEmail = async (value : any) => {
    if (step === 0 && verify === false) {
      setStep((prev) => prev + 1);
    } else if (step === 1 && verify === false){
      setIsLoading(true);
      setData({...data, email:value.email})


      AuthActions.setInitial(value)
      try {
        await AuthService.init({
          email : value.email
        })
        setIsLoading(false);
       setVerify(true)
        
      } catch (error) {
        setIsLoading(false)
      }
      
      
    }else {
      setIsLoading(true)
      try {
       const response = await AuthService.register(value)
        toast.success("Account created successfully");
        setIsLoading(false)
        AuthActions.setProfile(response.data.data);
        requestAnimationFrame(() => {
          router.push("/");
        })
        
      } catch (error) {
        setIsLoading(false)
      }
    
      // setTimeout(() => {
      //   setIsLoading(false);
      //   toast.success("login successfully");
      //   router.replace("/");
      // }, 5000);
      
    }
  };

  const form = useFormik({
    initialValues: data,
    onSubmit : (values, actiom) => {
        submitEmail(values)
        console.log(values);
        
    }
  });

  return (
    <div
      style={{
        backgroundImage: "url(/Element2.svg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen bg-gray-900 text-white px-8 py-8 flex items-center justify-center"
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
                     {step === 0 && verify === false &&(
                        <div className="mx-auto md:w-[400px] w-[320px]">
                        <div>
                            <label className="text-white font-semibold text-sm">
                            FirstName
                            </label>
                            <input
                            placeholder="Enter FirstName"
                            {...form.getFieldProps("firstName")}
                            className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                            />
                        </div>

                        <div className="mt-3">
                            <label className="text-white font-semibold text-sm">
                            LastName
                            </label>
                            <input
                            {...form.getFieldProps("lastName")}
                            // value={data.lastName}
                            placeholder="Enter LastName"
                            className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                            />
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <div className="w-full">
                            <label className="text-white font-semibold text-sm">
                                Title
                            </label>
                            <select
                                {...form.getFieldProps("title")}
                                className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                            >
                                <option>Mr</option>
                                <option>Miss</option>
                                <option>Mrs</option>
                                <option>Dr</option>
                                <option>Prof</option>
                            </select>
                            </div>
                            <div className="w-full">
                            <label className="text-white font-semibold text-sm">
                                Gender
                            </label>
                            <select
                               
                                {...form.getFieldProps("gender")}

                                className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                            >
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="text-white font-semibold text-sm">
                            Date of Birth
                            </label>
                            <input
                            {...form.getFieldProps("dob")}
                            type="date"
                            className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                            />
                        </div>
                        </div>
                    )}
                    {step === 1 && verify === false && (
                        <div className="mx-auto md:w-[400px] w-[320px]">
                        <div>
                            <button
                            className="text-white font-bold rounded px-3 py-2 flex items-center justify-center"
                            onClick={() => setStep((prev) => prev - 1)}
                            >
                            <BsArrowBarLeft size={20} /> Back
                            </button>
                        </div>
                        <div className="mt-3">
                            <label className="text-white font-semibold text-sm">
                            Email Address
                            </label>
                            <input
                            {...form.getFieldProps("email")}
                            type="email"
                            placeholder="Enter Email Address"
                            className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-white font-semibold text-sm">
                            Password
                            </label>
                            <input
                            {...form.getFieldProps("password")}
                            type="password"
                            placeholder="Enter Password"
                            className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-white font-semibold text-sm">
                            Confirm Password
                            </label>
                            <input
                            type="password"
                            placeholder="Enter Confirm Password"
                            className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
                            />
                        </div>
                        </div>
                    )}

                    {verify && (
                      <>
                        <h3 className="text-white font-semibold text-lg text-center ">Security Verification</h3>
                        <h4  className="text-white text-sm text-center mb-3">Please enter 6 digit pin code we sent to {protectEmail(data.email)}</h4>
                        <Verify {...form.getFieldProps("verificationCode")} />
                      </>
                     
                    )}
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
              Already have an account
            </h4>
            <Link href="/login" className="text-sm text-blue-300 font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signUp;
