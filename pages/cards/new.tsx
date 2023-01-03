import { useRouter } from "next/router";
import React, { useState } from "react";
import ThemePicker from "../../components/ThemePicker";
import {BsWallet2} from "react-icons/bs"

function newCard() {
  const router = useRouter();

  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

    const newLocal = <ThemePicker onChange={(val: any) => console.log(val)} />;
  return (
    <div className="h-screen bg-gray-900 relative text-white px-8 py-8 flex items-center justify-center">
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
              <h5 className="text-gray-300 text-sm">Select wallet to fund your card</h5>
              <div className="mx-auto mt-6 md:w-[400px] sm:w-[320px] w-full">
                <button className="h-14 flex items-center gap-4  px-4 rounded bg-slate-700 border border-gray-300 w-full">
                    <img src="/logo-light.svg" className="h-8 w-auto" />
                     <div>
                        <h3 className="text-left font-semibold">Gamma Wallet</h3>
                        <h5 className="text-left text-gray-300 text-[12px]">Fund with gammapay wallet</h5>
                     </div>
                </button>
                <button className="h-14 flex mt-6 items-center gap-4  px-4 rounded bg-slate-700 border border-gray-300 w-full">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/800px-Binance_Logo.svg.png" className="h-8 w-auto" />
                     <div>
                        <h3 className="text-left font-semibold">Binance Pay</h3>
                        <h5 className="text-left text-gray-300 text-[12px]">Fund with binance wallet</h5>
                     </div>
                </button>
              </div>
              
              
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default newCard;
