import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineSwapVert } from "react-icons/md";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import BottomTab from "../../components/BottomTab";
import { CgArrowLeft } from "react-icons/cg";
import { BiPaste } from "react-icons/bi";
import { useRouter } from "next/router";
import { useAuth } from "../../zustand/auth.store";
import Loader from "../../components/Loader";
import { FaPaste } from "react-icons/fa";
import { WalletService } from "../../services/wallet.service";
import { FormikProvider, useFormik } from "formik";
import TransactionModal from "../../components/TransactionModal";
import { toast } from "react-hot-toast";


function send() {
  const router = useRouter();
  const query = router.query;

  console.log(query);

  const profile = useAuth.getState().profile;
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [receiptData, setRecieptData] = useState<any>({})

  useEffect(() => {
    if (useAuth.getState().loggedIn === false) {
      router.push("/login");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [useAuth.getState().loggedIn]);

  const handleSend = async (value: any) => {
    setIsSubmitting(true);
    try {
      const resp = await WalletService.transfer(value);
      console.log(resp.data);
      setIsSubmitting(false);
      setRecieptData(resp.data)
      setReceipt(true)
      
    } catch (error:any) {
      setIsSubmitting(false);
      toast.error(error.response.data.message)
      console.log(error);
    }
  };

  const form = useFormik({
    initialValues: {
      amount: "0",
      to: "",
      tokenAddress: "",
    },
    onSubmit: (values: any) => {
        values.tokenAddress = query.tokenAddress
       handleSend(values);
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen bg-gray-900 text-white sm:flex items-center">
          <TransactionModal open={receipt} onClick={() => setReceipt(false)} status={receiptData?.status} details={receiptData?.data}  />
          <Sidebar />
          <BottomTab />
          <div className="overflow-y-auto h-full w-full">
            <div className="w-full h-full justify-center items-center flex py-8">
              <div className="md:w-[420px] mb-8 md:mb-0 sm:w-80 w-72 border border-slate-500  px-3 rounded-lg py-3">
                <div className="flex py-2 items-center justify-between">
                  <button onClick={() => router.back()}>
                    <CgArrowLeft size={24} />
                  </button>
                  <h4 className="text-lg font-bold">Send</h4>
                  <button>
                    <AiOutlineSetting size={24} />
                  </button>
                </div>
                <FormikProvider value={form}>
                  <form onSubmit={form.handleSubmit}>
                    <div className="bg-slate-800 rounded-lg px-2 my-3 w-full relative">
                      <input
                        {...form.getFieldProps("to")}
                        placeholder="Enter Recipient Address"
                        className="h-14 w-full pr-6  focus:outline-none px-3 bg-transparent"
                      />
                      
                        <BiPaste onClick={() =>{ console.log(navigator.clipboard.read())}} className="absolute right-2 bottom-4" size={20} />
                    </div>

                    <div className="bg-slate-800 rounded-lg my-3 pt-4 w-full">
                      <div className="flex justify-between items-center px-3 py-2 border-b border-slate-600">
                        <button className="flex whitespace-nowrap items-center gap-2">
                          {query.tokenAddress ===
                            "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619" && (
                            <img src="/eth.svg" />
                          )}
                          {query.tokenAddress ===
                            "0x2791bca1f2de4661ed88a30c99a7a9449aa84174" && (
                            <img src="/usdc.svg" />
                          )}
                          {query.tokenAddress ===
                            "0x0000000000000000000000000000000000001010" && (
                            <img src="/matic.svg" />
                          )}
                          {query.tokenAddress ===
                            "0xc2132d05d31c914a87c6611c10748aeb04b58e8f" && (
                            <img src="/usdt.svg" />
                          )}
                          {query.tokenAddress ===
                            "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063" && (
                            <img src="/dai.svg" />
                          )}{" "}
                          {query.name}
                        </button>
                        <input
                          {...form.getFieldProps("amount")}
                          className="bg-transparent w-full text-right py-3 px-3 focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-between items-center py-3 px-3">
                        <h4 className="text-gray-500">
                          Balance :{" "}
                          <span className="text-white">
                            {useAuth.getState().balance.balance} Matic
                          </span>
                        </h4>
                        <h4>~${useAuth.getState().balance.value}</h4>
                      </div>
                    </div>
                    <button
                      disabled={isSubmitting}
                      className="w-full  h-12 rounded-lg disabled:bg-slate-600 bg-gray-200 text-gray-800"
                    >
                      {isSubmitting ? (
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
                  "Send"
                )}
                    </button>
                  </form>
                </FormikProvider>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default send;
