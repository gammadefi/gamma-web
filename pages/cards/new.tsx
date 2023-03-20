import { useRouter } from "next/router";
import React, { useState , useRef} from "react";
import ThemePicker from "../../components/ThemePicker";
import { BsArrowDown, BsWallet2 } from "react-icons/bs";
import { MdArrowBack, MdArrowBackIos } from "react-icons/md";
import { IoIosArrowDown, IoIosSwap } from "react-icons/io";
import { BiCaretDown } from "react-icons/bi";
import useOnClickOutside from "../../hooks/useClickOutside";

type PWT = "gammaWallet" | "binancePay" | "";

const assets = [
  {
    name: "Dai",
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    icon: "/dai.svg",
  },
  {
    name: "USDT",
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    icon: "/usdt.svg",
  },
  {
    name: "USDC",
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    icon: "/usdc.svg",
  },
];


function newCard() {
  const router = useRouter();

  const [step, setStep] = useState<number>(0);
  const [payWith, setPayWith] = useState<PWT>("");
  const [showSelect, setShowSelect] = useState<boolean>(false)
  const [amount, setAmount] = useState("0.00")
  const [payCun, setPayCon] = useState({
    name: "USDC",
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    icon: "/usdc.svg",
  });

  const closeref = useRef<any>();

	useOnClickOutside(closeref, () => {
		setShowSelect(false);
	});

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const handlePayWith = (value: PWT) => {
    setPayWith(value);
    nextStep();
  };

  const newLocal = <ThemePicker onChange={(val: any) => console.log(val)} />;
  return (
    <div  className="h-screen bg-gray-900 relative text-white px-8 py-8 flex items-center justify-center">
      <button
        onClick={() => handleBack()}
        className="absolute top-4 left-4 font-semibold"
      >
        <MdArrowBack size={24} />
      </button>
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 font-semibold"
      >
        Cancel
      </button>
      <div className="max-w-2xl">
        <div className="mt-6 w-full px-3">
          {step === 0 && (
            <>
              <h3 className="font-semibold md:text-xl mb-4 text-lg text-gray-200 mt-1">
                Create a new card
              </h3>
              <div className="mx-auto md:w-[400px] sm:w-[320px] w-full">
                <label className="font-semibold text-gray-200">
                  Pick a theme
                </label>
                {newLocal}
              </div>
              <div className="mx-auto mt-5 md:w-[400px] sm:w-[320px] w-full">
                <label className="font-semibold text-gray-200">
                  Name on card
                </label>
                <input
                  maxLength={50}
                  placeholder="eg. John Doe"
                  className="h-12 w-full mx-auto border bg-transparent mt-2 rounded px-4"
                />
              </div>
              <button
                onClick={() => nextStep()}
                className="bg-blue-300 font-medium text-slate-800 mt-5 ml-auto block px-4 py-2 rounded-full"
              >
                Next
              </button>
            </>
          )}

          {step === 1 && (
            <>
              <h3 className="font-semibold md:text-xl mb-4 text-lg text-gray-200 mt-1">
                Fund your card
              </h3>
              <h5 className="text-gray-300 text-sm">
                Select wallet to fund your card
              </h5>
              <div className="mx-auto mt-6 md:w-[400px] sm:w-[320px] w-full">
                <button
                  onClick={() => handlePayWith("gammaWallet")}
                  className="h-16 focus:border-4 focus:border-white flex items-center gap-4  px-4 rounded bg-slate-700 border border-gray-300 w-full"
                >
                  <img src="/loader.svg" className="h-8 w-auto" />
                  <div>
                    <h3 className="text-left font-semibold">Gamma Wallet</h3>
                    <h5 className="text-left text-gray-300 text-[12px]">
                      Fund with gammapay wallet
                    </h5>
                  </div>
                </button>
                <button
                  onClick={() => handlePayWith("binancePay")}
                  className="h-16 focus:border-4 focus:border-white flex mt-6 items-center gap-4  px-4 rounded bg-slate-700 border border-gray-300 w-full"
                >
                  <img src="/Binance_Logo.png" className="h-8 w-auto" />
                  <div>
                    <h3 className="text-left font-semibold">Binance Pay</h3>
                    <h5 className="text-left text-gray-300 text-[12px]">
                      Fund with binance wallet
                    </h5>
                  </div>
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <div ref={closeref}>
              <h3 className="text-xl font-semibold">Fund Your Card</h3>
              <div className="mx-auto md:w-[400px] sm:w-[320px] w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <small className="text-gray-300 font-semibold mt-3">
                      Payment method
                    </small>
                    {payWith === "gammaWallet" ? (
                      <div className="flex items-center gap-2 mt-1">
                        {" "}
                        <img src="/loader.svg" className="h-8 w-auto" />{" "}
                        <h3 className="text-lg font-bold">Gammapay</h3>{" "}
                      </div>
                    ) : (
                      <img src="" />
                    )}
                  </div>
                  <button
                    onClick={() => handleBack()}
                    className="px-3 mt-2 py-1 flex items-center justify-center bg-gray-500 bg-opacity-25 rounded-full"
                  >
                    <IoIosSwap title="change payment method" size={24} />
                  </button>
                </div>
                <div>
                  <div className="flex mt-3 items-center justify-between">
                    <div>
                      <label className="font-bold">Amount</label>
                    </div>
                    <div className="flex text-gray-300 items-center gap-2">
                      <div>
                        <small className="font-san font-semibold">limit</small>
                        <h3 className="font-san font-semibold">$5,000</h3>
                      </div>
                      <button
                        onClick={() => setAmount("5000")}
                        className="px-3 font-san font-semibold mt-2 py-1 flex items-center justify-center bg-gray-500 bg-opacity-25 rounded-full"
                      >
                        Max
                      </button>
                    </div>
                  </div>
                  <div>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="h-14 border-gray-300 border rounded mt-2 w-full pr-6  focus:outline-none px-3 bg-transparent"
                    />
                    <div>
                      <h3 className="font-semibold mt-3">You Pay</h3>
                      <div className="flex items-center relative mt-2 gap-2">
                        <img src={payCun.icon} /> <h3>{0.0}</h3> <h3 className="font-semibold">{payCun.name}</h3>
                        <button onClick={() => setShowSelect(!showSelect)} className="px-3 py-1 flex items-center justify-center bg-gray-500 bg-opacity-25 rounded-full">
                          <IoIosArrowDown size={10} title="change currency" />
                        </button>

                        {showSelect &&<div className="w-[240px] bg-gray-700 px-3 py-3 border border-white rounded top-7 z-50 absolute">
                          {assets.map((items, i) => (
                            <div onClick={() => {setPayCon(items); setShowSelect(false)}} className="flex cursor-pointer mb-3 items-center gap-2 ">
                              <img src={items.icon} />
                              <h3 className="font-semibold">{items.name}</h3>

                            </div>
                          ))}

                        </div>}
                      </div>
                    </div>
                    <button
                      className="w-full mt-6  h-12 rounded-lg disabled:bg-slate-600 bg-gray-200 text-gray-800"
                    >
                     Add Funds

                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default newCard;
