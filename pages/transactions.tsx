import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiOutlineInfoCircle, AiOutlineQrcode } from "react-icons/ai";
import { IoIosCopy } from "react-icons/io";
import { useQuery } from "react-query";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import BottomTab from "../components/BottomTab";
import Modal from "../components/Modal";
import QRCode from "react-qr-code";
import { useAuth } from "../zustand/auth.store";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { TransactionService } from "../services/Transaction.service";
import { PaginationNav1 } from "../components/Pagination";
import Loader2 from "../components/Loader2";
import { fToNow, toDateTime } from "../utils/formatTime";

const assets = [
  "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
  "0x0000000000000000000000000000000000001010",
  "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
];

function transactions() {
  const [receiveModal, setIsReceiveModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [main, setMain] = useState<any>([]);
  let t = new Date(1970, 0, 1);

  const router = useRouter();

  const profile = useAuth.getState().profile;

  const { data, isFetching } = useQuery(
    "transactions",
    async () => {
      return await TransactionService.wallet(profile.walletAddress);
      // return await TransactionService.wallet("0x6429b8bAA710472e69C226cfE3b913124dD37028")
    },
    {
      onSuccess: (res) => {
        const result = res.data.result.filter(
          (items: any) =>
            items.contractAddress ===
              "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063" ||
            items.contractAddress ===
              "0x0000000000000000000000000000000000001010" ||
            items.contractAddress ===
              "0xc2132d05d31c914a87c6611c10748aeb04b58e8f" ||
            items.contractAddress ===
              "0x2791bca1f2de4661ed88a30c99a7a9449aa84174" ||
            items.contractAddress ===
              "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
        );
        setMain(result);
      },
    }
  );

  useEffect(() => {
    if (useAuth.getState().loggedIn === false) {
      router.push("/login");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [useAuth.getState().loggedIn]);

  const closeModal = () => {
    setIsReceiveModal(false);
  };

  return (
    <>
      {loading && useAuth.getState().loggedIn === false ? (
        <Loader />
      ) : (
        <div className="h-screen bg-gray-900 text-white sm:flex items-center">
          {isFetching && <Loader2 />}
          <Modal open={receiveModal} onClick={() => closeModal()}>
            <div className="w-56 md:w-96 py-4">
              <h3 className="text-center text-2xl font-bold text-black">
                Scan QR Code
              </h3>
              <h5 className="text-center font-semibold text-gray-500">
                to receive your wallet address
              </h5>
              <QRCode
                value={profile.walletAddress}
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
              <div className="flex gap-3 mt-2 items-center">
                <h2 className="font-bold text-2xl mt-0 md:text-4xl">
                  Transactions
                </h2>
                <AiOutlineInfoCircle title="all transactions" />
              </div>
            </div>

            <div className="overflow-x-auto min-h-screen bg-slate-800 md:mb-0 mb-20 relative">
              <div className="w-full rounded-t-md border-slate-600 border-b-2 bg-slate-700 ">
                <div className="flex w-full items-center px-4 py-6   gap-2">
                  <button className="px-4 py-2 font-semibold text-lg border-b-4 border-white flex items-center justify-center">
                    Wallet Transactions
                  </button>
                  <button className="px-4 py-2 font-semibold text-lg text-gray-400 flex items-center justify-center">
                    Card Transactions
                  </button>
                </div>
              </div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-500 bg-slate-700  ">
                  <tr>
                    <th scope="col" className="py-3 px-6 h-12">
                      Txn Hash
                    </th>
                    <th scope="col" className="py-3 px-6  h-12">
                      Age
                    </th>
                    <th scope="col" className="py-3 px-6  h-12">
                      from
                    </th>
                    <th scope="col" className="py-3 px-6  h-12"></th>
                    <th scope="col" className="py-3 px-6  h-12">
                      to
                    </th>
                    <th scope="col" className="py-3 px-6  h-12">
                      Token
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {main.length > 0 ? (
                    main
                      .slice(pageIndex * 10, pageIndex * 10 + 10)
                      .map((items: any, i: any) => (
                        <tr
                          key={i}
                          className=" border-slate-700 border-b bg-slate-800"
                        >
                          <th
                            scope="row"
                            className="py-4 break-all px-6 font-medium  text-white"
                          >
                            {items.hash}
                          </th>
                          <td className="py-4 px-6 whitespace-nowrap">
                            {toDateTime(items?.timeStamp)}
                          </td>
                          <td className="py-4 break-all  px-6">{items.from}</td>
                          <td className="py-4 break-all  px-6">
                            {items.to ==
                            "0x6429b8bAA710472e69C226cfE3b913124dD37028".toLocaleLowerCase() ? (
                              <span className="px-2 py-1 flex items-center rounded justify-center bg-green-200 whitespace-nowrap  text-green-900">
                                IN
                              </span>
                            ) : (
                              <span className="px-2 py-1 flex rounded items-center whitespace-nowrap justify-center bg-orange-200 text-orange-900">
                                OUT
                              </span>
                            )}
                          </td>
                          <td className="py-4 break-all  px-6">{items.to}</td>
                          <td className="py-4 text-white  px-6">
                            <div className="flex items-center gap-2">
                              {(
                                parseFloat(items.value) / 1e18
                              ).toLocaleString()}
                              {items.contractAddress ===
                                "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619" && (
                                <img src="/eth.svg" />
                              )}
                              {items.contractAddress ===
                                "0x2791bca1f2de4661ed88a30c99a7a9449aa84174" && (
                                <img src="/usdc.svg" />
                              )}
                              {items.contractAddress ===
                                "0x0000000000000000000000000000000000001010" && (
                                <img src="/matic.svg" />
                              )}
                              {items.contractAddress ===
                                "0xc2132d05d31c914a87c6611c10748aeb04b58e8f" && (
                                <img src="/usdt.svg" />
                              )}
                              {items.contractAddress ===
                                "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063" && (
                                <img src="/dai.svg" />
                              )}
                              <span>{items.tokenSymbol}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-40">
                      <div className="w-full flex items-center justify-center">
                      <div className=" w-full mx-auto text-center text-white flex flex-col items-center ">
                      <img src={"/no-data.svg"} className="h-8 w-auto" />
                      <p className="text-base text-gray-200 font-medium text-mid-night-80 mt-4">
                        {"Nothing to see yet"}
                      </p>
                      <p className="text-sm text-mid-night-40 mt-2">
                        {"Transactions will be listed here"}
                      </p>
                    </div>
                      </div>
                    
                      </td>
                      
                    </tr>
                   
                  )}
                </tbody>
              </table>
              <div className="ml-auto px-3 py-3">
                <PaginationNav1
                  gotoPage={setPageIndex}
                  canPreviousPage={pageIndex > 0}
                  canNextPage={pageIndex < data?.data?.result?.length - 1}
                  pageCount={main.length <= 0 ? 1 : Math.ceil(main.length / 10)}
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

export default transactions;
