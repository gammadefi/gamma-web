import React, { Children, FunctionComponent, useRef } from "react";
import QRCode from "react-qr-code";
import useOnClickOutside from "../hooks/useClickOutside";
import Barcode from "react-barcode"

interface ModalPropsInterface {
  onClick?: () => void;
  open: boolean;
  status?: string;
  details?: any;
}

const TransactionModal: FunctionComponent<ModalPropsInterface> = ({
  onClick = () => {},
  open,
  status,
  details,
}) => {
  const modalRef = useRef<any>();

  useOnClickOutside(modalRef, () => {
    onClick();
  });

  console.log(details);

  return (
    <>
      {open && (
        <div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 z-50">
          <div className="flex items-center justify-around min-w-44 h-screen">
            <div
              ref={modalRef}
              className="modal  max-w-2xl relative bg-white rounded"
            >
              <div className="modal-head absolute right-2 top-1 px-1 py-1 ">
                <a
                  onClick={onClick}
                  href="#"
                  role="button"
                  className="focus:outline-none text-black ml-auto focus:ring-0  focus:ring-opacity-75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </a>
              </div>
              <div className="modal-body p-3">
                <div className="w-56 md:w-96 py-4">
                 
                 
                   {status === "success" ? (
                    <img
                      src="/success.svg"
                      className="h-12 block mx-auto w-auto"
                    />
                  ) : (
                    <img
                      className="h-12 block mx-auto w-auto"
                      src="/error.svg"
                    />
                  )}
                  
                  <div className="border-b my-6" />
                  <div className="w-full px-4 py-2 text-black">
                    <div className="flex mt-2 justify-between items-center">
                      <h3>To</h3>
                      <h3 className="text-sm break-words ">{details?.to}</h3>
                    </div>
                    <div className="flex mt-2 justify-between ">
                      <h3 className="whitespace-nowrap mr-5">
                        Transaction hash
                      </h3>
                      <h3 className="text-sm text-right break-all ">
                        {details?.transactionHash}
                      </h3>
                    </div>
                    <div className="flex mt-2 justify-between items-center">
                      <h3>Gas fee</h3>
                      <h3 className="text-sm">
                        {details?.effectiveGasPrice && (parseFloat(details?.effectiveGasPrice) / 1e18).toFixed(8)}
                      </h3>
                    </div>
                  </div>
                  <Barcode value={details?.transactionHash} displayValue={false} width={0.5} height={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionModal;
