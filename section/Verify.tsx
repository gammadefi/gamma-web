import React from "react";

const Verify = (props: any) => {
  return (
    <div className="mx-auto md:w-[400px] w-[320px]">
      <div>
        <input
          placeholder="Verification code"
          {...props}
          className="h-12 w-full mx-auto border bg-slate-800 mt-2 rounded px-4"
        />
      </div>
    </div>
  );
};

export default Verify;
