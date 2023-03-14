import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiOutlineInfoCircle, AiOutlineQrcode } from "react-icons/ai";
import { IoIosCopy } from "react-icons/io";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import BottomTab from "../components/BottomTab";
import Modal from "../components/Modal";
import QRCode from "react-qr-code";
import { useAuth } from "../zustand/auth.store";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { WalletService } from "../services/wallet.service";
import { PaginationNav1 } from "../components/Pagination";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import Loader2 from "../components/Loader2";

function wallet() {
  const [receiveModal, setIsReceiveModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [walletBalance, setWalletBalance] = useState("")
  const pageCount = 10;

  const router = useRouter();

  const profile = useAuth.getState().profile;

 
  useEffect(() => {
    if (useAuth.getState().loggedIn === false) {
      router.push("/login");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [useAuth.getState().loggedIn]);



  const {data : data, isFetching} = useQuery( profile?.walletAddress,
  async () => {
    return  await WalletService.getTestBalance(profile?.walletAddress);
  },
  {
    enabled: true,
    onSuccess: (res) => {
      const assets = Object.keys(res?.data.result);

      const total = assets.map((items, i) => parseFloat(res?.data.result[items].value))
      setWalletBalance(total.reduce((a, b) => a + b, 0).toFixed(2));

      
    },
    onError: (err: any) => {
      console.log("Error Occured:", err.response);
    },

  })

  
  




  const closeModal = () => {
    setIsReceiveModal(false);
  };

  return (
    <>
      {loading && useAuth.getState().loggedIn === false ? (
        <Loader />
      ) : (
        <div className="h-screen bg-gray-900 text-white sm:flex items-center">
          {isFetching && (<Loader2 />)}
          <Modal open={receiveModal} onClick={() => closeModal()}>
            <div className="w-56 md:w-96 py-4">
              <h3 className="text-center text-2xl font-bold text-black">
                Scan QR Code
              </h3>
              <h5 className="text-center font-semibold text-gray-500">
                to receive your wallet address
              </h5>
              <QRCode
                value="0xebb07a5787650ba385ba7111fc4d3a994b6dbaa6"
                className="mx-auto w-36 h-auto mt-3"
              />
              <h5 className="text-center font-semibold text-gray-800 mt-4">
                wallet address
              </h5>
              <h5 className="text-center break-words text-sm font-semibold text-gray-500 mt-3">
                {profile.walletAddress}
              </h5>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(profile.walletAddress);
                  toast.success("copied")
                }}
                style={{ padding: "10px 20px", width: "120px" }}
                className="bg-slate-800 mx-auto mt-3 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
              >
                <IoIosCopy /> Copy
              </button>
            </div>
          </Modal>
          <Sidebar />
          <BottomTab />
          <div className="overflow-y-auto h-full w-full">
            <div className="w-full py-8 px-4 md:px-12 md:py-12">
              <h4 className="text-sm md:text-base font-semibold">
                POLYGON MAINNET
              </h4>
              <div className="flex gap-3 mt-2 items-center">
                <h2 className="font-bold text-2xl mt-0 md:text-4xl">${walletBalance ? walletBalance : "0.00"}</h2>
                <AiOutlineInfoCircle />
              </div>

              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={() => setIsReceiveModal(true)}
                  style={{ padding: "10px 20px", width: "120px" }}
                  className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                >
                  <AiOutlineQrcode /> Receive
                </button>

                <button
                  style={{ padding: "10px 20px", width: "120px" }}
                  className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                >
                  <FiSend /> send
                </button>
              </div>
              <a
                target="_blank"
                className="flex items-center gap-3 mt-3 text-gray-300"
                href={`https://polygonscan.com/address/${profile.walletAddress}`}
              >
                View all transactions <BsBoxArrowInUpRight />
              </a>
            </div>

            <div className="overflow-x-auto md:mb-0 mb-20 bg-slate-800 relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-500 bg-slate-700  ">
                  <tr>
                    <th scope="col" className="py-3 px-6 h-12">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6 h-12">
                      Balance
                    </th>
                    <th scope="col" className="py-3  px-6 h-12">
                      Actions
                    </th>
                    <th scope="col" className="py-3 px-6  h-12">
                      Buy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" border-slate-700 border-b bg-slate-800">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap text-white"
                    >
                      <div className="flex items-center gap-2">
                        <img src="/eth.svg" />
                        <span>
                          ETH • 
                          <span className="text-gray-400">Ether - PoS</span>
                        </span>
                      </div>
                    </th>
                    <td className="py-4 px-6">
                      0.00 • <span className="text-gray-400">$0.00</span>
                    </td>
                    <td className="py-4  px-6">
                      <div className="flex  items-center gap-3">
                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <AiOutlineQrcode /> Receive
                        </button>

                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <FiSend /> send
                        </button>
                      </div>
                    </td>
                    <td className="py-4  px-6">
                      <button
                        style={{ padding: "10px 20px", width: "120px" }}
                        className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                      >
                        <FiSend /> Buy
                      </button>
                    </td>
                  </tr>
                  <tr className=" border-slate-700 border-b bg-slate-800">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap text-white"
                    >
                      <div className="flex items-center gap-2">
                        <img src="/usdc.svg" />
                        <span>
                          USDC • 
                          <span className="text-gray-400">USD coin </span>
                        </span>
                      </div>
                    </th>
                    <td className="py-4 px-6">
                      0.00 • <span className="text-gray-400">$0.00</span>
                    </td>
                    <td className="py-4 px-6 ">
                      <div className="flex items-center gap-3">
                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <AiOutlineQrcode /> Receive
                        </button>

                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <FiSend /> send
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 ">
                      <button
                        style={{ padding: "10px 20px", width: "120px" }}
                        className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                      >
                        <FiSend /> Buy
                      </button>
                    </td>
                  </tr>
                  <tr className=" border-slate-700 border-b bg-slate-800">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap text-white"
                    >
                      <div className="flex items-center gap-2">
                        <img src="/matic.svg" />
                        <span>
                          MATIC • 
                          <span className="text-gray-400">Matic - Token </span>
                        </span>
                      </div>
                    </th>
                    <td className="py-4 px-6">
                      <span className="text-white font-bold">{data?.data.result['0x0000000000000000000000000000000000001010'] ? (parseFloat(data?.data.result["0x0000000000000000000000000000000000001010"].balance) / 1e18).toFixed(2) : "0.00"}</span> • <span className="text-gray-400">${data?.data.result['0x0000000000000000000000000000000000001010'] ? (parseFloat(data?.data.result["0x0000000000000000000000000000000000001010"].value)).toFixed(2) : "0.00"}</span>
                    </td>
                    <td className="py-4 px-6 ">
                      <div className="flex items-center gap-3">
                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <AiOutlineQrcode /> Receive
                        </button>

                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <FiSend /> send
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 ">
                      <button
                        style={{ padding: "10px 20px", width: "120px" }}
                        className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                      >
                        <FiSend /> Buy
                      </button>
                    </td>
                  </tr>
                  <tr className=" border-slate-700 border-b bg-slate-800">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap text-white"
                    >
                      <div className="flex items-center gap-2">
                        <img src="/usdt.svg" />
                        <span>
                          USDT • 
                          <span className="text-gray-400">Tether - USD </span>
                        </span>
                      </div>
                    </th>
                    <td className="py-4 px-6">
                      0.00 • <span className="text-gray-400">$0.00</span>
                    </td>
                    <td className="py-4 px-6 ">
                      <div className="flex items-center gap-3">
                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <AiOutlineQrcode /> Receive
                        </button>

                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <FiSend /> send
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 ">
                      <button
                        style={{ padding: "10px 20px", width: "120px" }}
                        className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                      >
                        <FiSend /> Buy
                      </button>
                    </td>
                  </tr>
                  <tr className=" border-slate-700 border-b bg-slate-800">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap text-white"
                    >
                      <div className="flex items-center gap-2">
                        <img src="/dai.svg" />
                        <span>
                          {" "}
                          DAI • 
                          <span className="text-gray-400">Dai - PoS </span>
                        </span>
                      </div>
                    </th>
                    <td className="py-4 px-6">
                      0.00 • <span className="text-gray-400">$0.00</span>
                    </td>
                    <td className="py-4 px-6 ">
                      <div className="flex items-center gap-3">
                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <AiOutlineQrcode /> Receive
                        </button>

                        <button
                          style={{ padding: "10px 20px", width: "120px" }}
                          className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                        >
                          <FiSend /> send
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 ">
                      <button
                        style={{ padding: "10px 20px", width: "120px" }}
                        className="bg-slate-800 flex items-center justify-center gap-2 border font-bold border-slate-500 rounded-lg"
                      >
                        <FiSend /> Buy
                      </button>
                    </td>
                  </tr>
                </tbody>
                
              </table>
              <div className="ml-auto px-3 py-3">
              <PaginationNav1
                gotoPage={setPageIndex}
                canPreviousPage={pageIndex > 0}
                canNextPage={pageIndex < pageCount - 1}
                pageCount={1}
                pageIndex={pageIndex}
              />
              </div>
              
           
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default wallet;
